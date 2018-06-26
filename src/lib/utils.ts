/**
 * Internal utilities.
 */

import Vue, { ComponentOptions, VueConstructor } from 'vue'

const vueInternalPropNames = Object.getOwnPropertyNames(new Vue())
const vueInternalHooks = [
  'data',
  'props',
  'watch',
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'activated',
  'deactivated',
  'beforeDestroy',
  'destroyed',
  'render'
]

/** @internal */
export const PROP_KEY = '$_vt_props'

/** @internal */
export function BuildOptions(
  Component: Function & ComponentOptions<Vue>,
  options?: any
): <Function>(target: any) => VueConstructor | void {
  // evaluate component name
  if (!options) {
    options = {}
  }
  options.name = options.name || Component.name

  // class prototype.
  const proto = Component.prototype

  // avoid parent component initialization while building component
  if (Object.getPrototypeOf(proto) instanceof Vue) {
    // tslint:disable-next-line:no-empty
    Object.setPrototypeOf(proto.constructor, function() {})
  }

  const constructor = new proto.constructor()

  //
  // Extract props / build options.props
  //
  const propAttrs = proto[PROP_KEY]
  let propNames
  delete proto[PROP_KEY]
  if (propAttrs) {
    const props = {}

    propNames = Object.getOwnPropertyNames(propAttrs)
    for (const prop of propNames) {
      let propVal
      const descriptor = Object.getOwnPropertyDescriptor(
        propAttrs,
        prop
      ) as PropertyDescriptor
      const constructorDefault = constructor[prop]

      if (typeof descriptor.value === 'object') {
        // prop options defined
        propVal = descriptor.value

        // try to assign default value
        if (!propVal.default) {
          propVal.default = constructorDefault
        }
      } else if (constructorDefault) {
        // create prop object with default value from constructor
        propVal = {
          default: constructorDefault
        }
      }

      // just define empty prop
      if (typeof propVal === 'undefined') {
        propVal = true
      }

      props[prop] = propVal
    }

    if (!options.props) {
      options.props = {}
    }

    for (const p in props) {
      if (props.hasOwnProperty(p)) {
        options.props[p] = props[p]
      }
    }
  }

  //
  // build internal hooks, methods and computed properties
  //
  Object.getOwnPropertyNames(proto).forEach(function(key) {
    // skip constructor
    if (key === 'constructor') {
      return
    }

    // internal hooks
    if (vueInternalHooks.indexOf(key) > -1) {
      options[key] = proto[key]
      return
    }

    const descriptor = Object.getOwnPropertyDescriptor(
      proto,
      key
    ) as PropertyDescriptor
    if (typeof descriptor.value === 'function') {
      // methods
      ;(options.methods || (options.methods = {}))[key] = descriptor.value
    } else if (descriptor.get || descriptor.set) {
      // computed properties
      ;(options.computed || (options.computed = {}))[key] = {
        get: descriptor.get,
        set: descriptor.set
      }
    }
  })

  //
  // Build options.data
  //
  const dataNames: string[] = []
  let restrictedNames = vueInternalPropNames
  if (propNames) {
    restrictedNames = restrictedNames.concat(propNames)
  }

  // gather data from constructor
  Object.getOwnPropertyNames(constructor).forEach(function(key) {
    if (restrictedNames.indexOf(key) === -1) {
      dataNames.push(key)
    }
  })

  if (dataNames.length > 0) {
    // evaluate parent data
    let parentData: any
    const parentDataType = typeof options.data
    if (parentDataType === 'function') {
      parentData = options.data()
    } else if (parentDataType === 'object') {
      parentData = options.data
    }

    options.data = () => {
      // define new data object
      const dataObj = parentData || {}

      // set data default values initialized from constructor
      dataNames.forEach(function(prop) {
        const descriptor = Object.getOwnPropertyDescriptor(
          constructor,
          prop
        ) as PropertyDescriptor
        if (
          !descriptor.get &&
          !descriptor.set &&
          typeof descriptor.value !== 'function'
        ) {
          dataObj[prop] = constructor[prop]
        }
      })

      return dataObj
    }
  }

  return options
}
