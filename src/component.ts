/**
 * Vue Component
 */


import * as Vue from 'vue'

var vueInternalPropNames = Object.getOwnPropertyNames(new Vue());
var vueInternalHooks = [

  // vue 0.7 (deprecated in 1.0)
  'activate',

  // vue 1.0 (deprecated in 2.0)
  'init', // => beforeCreate
  'ready', // => mounted
  'beforeCompile', // => created
  'compiled', // => mounted
  'attached', // => mounted
  'detached', // => destroyed

  // vue 1.0/2.0
  'created',
  'beforeDestroy',
  'destroyed',
  'props',
  'watch',
  'data',

  // vue 2.0    
  'beforeCreate',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'activated',
  'deactivated',
  'render',

  // etc
  'el',
  'vuex',

]


export function Component(options?): ClassDecorator {

  var factory = function (Component: Function, options?: any): <Function>(target: any) => Function | void {

    if (!options) {
      options = {}
    }
    options.name = options.name || Component.name


    // class prototype.
    var proto = Component.prototype
    var constructor = new proto.constructor();


    // has vuex?
    var vueKeys = [];
    if (proto.vuex) {
      var protoVue = proto.vuex;
      if (protoVue['getters']) {
        Object.getOwnPropertyNames(protoVue['getters']).forEach((k) => {
          vueKeys.push(k);
        });
      }

      if (protoVue['actions']) {
        Object.getOwnPropertyNames(protoVue['actions']).forEach((k) => {
          vueKeys.push(k);
        });
      }
    }

    var propAttrs = proto['$_vt_props'];
    var propNames = undefined;

    delete proto['$_vt_props'];
    if (propAttrs) {
      var key = 'props';
      var props = {}

      propNames = Object.getOwnPropertyNames(propAttrs);
      for (var i = 0; i < propNames.length; i++) {
        var prop = propNames[i];
        var propVal = undefined;
        var descriptor = Object.getOwnPropertyDescriptor(propAttrs, prop)
        var constructorDefault = constructor[prop];

        if (typeof (descriptor.value) === 'object') {

          // prop options defined
          propVal = descriptor.value

          // try to assign default value
          if (!propVal.default)
            propVal.default = constructorDefault;

        } else if (constructorDefault) {

          // create prop object with default value from constructor
          propVal = {
            default: constructorDefault
          }
        }

        // just define empty prop
        if (typeof (propVal) === 'undefined') {
          propVal = true;
        }

        props[prop] = propVal;
      }


      options['props'] = props;
    }



    Object.getOwnPropertyNames(proto).forEach(function (key) {

      // skip constructor     
      if (key === 'constructor') {
        return
      }


      // hooks
      if (vueInternalHooks.indexOf(key) > -1) {
        options[key] = proto[key]
        return
      }


      var descriptor = Object.getOwnPropertyDescriptor(proto, key)
      if (typeof descriptor.value === 'function') {

        if (vueKeys.indexOf(key) > -1)
          return

        // methods
        (options.methods || (options.methods = {}))[key] = descriptor.value


      } else if (descriptor.get || descriptor.set) {
        // computed properties
        (options.computed || (options.computed = {}))[key] = {
          get: descriptor.get,
          set: descriptor.set
        }
      }
    })


    // Processing data attributes

    var dataNames = []
    var restrictedNames = vueInternalPropNames;
    if (propNames) restrictedNames = restrictedNames.concat(propNames);
    if (vueKeys && vueKeys.length) restrictedNames = restrictedNames.concat(vueKeys);

    Object.getOwnPropertyNames(constructor).forEach(function (key) {

      if (restrictedNames.indexOf(key) === -1) {
        dataNames.push(key);
      }

    });


    if (dataNames.length > 0) {

      // evaluate parent data
      var parentData = undefined
      var parentDataType = typeof options['data'];
      if (parentDataType === 'function') {
        parentData = options['data']();
      } else if (parentDataType === 'object') {
        parentData = options['data'];
      }

      options['data'] = () => {

        // define new data object
        var data_obj = parentData || {}

        // set data default values initialized from constructor
        dataNames.forEach(function (prop) {
          var descriptor = Object.getOwnPropertyDescriptor(constructor, prop)
          if (!descriptor.get && !descriptor.set && typeof descriptor.value !== 'function') {
            data_obj[prop] = constructor[prop]
          }
        })

        return data_obj
      }
    }



    // Build vue component
    var superProto = Object.getPrototypeOf(proto)
    var Super = superProto instanceof Vue
      ? superProto.constructor
      : Vue
    return Super['extend'](options)

  }

  if (options instanceof Function) {
    return factory(<Function>options)
  }

  return function (Component) {
    return factory(Component, options)
  }

}