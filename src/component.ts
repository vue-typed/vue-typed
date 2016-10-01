/**
 * Vue Component
 */


import * as Vue from 'vue'

var internalHooks = [
  'data',
  'el',
  'init',
  'created',
  'ready',
  'beforeCompile',
  'compiled',
  'beforeDestroy',
  'destroyed',
  'attached',
  'detached',
  'activate',
  'vuex'
]

var componentFactory = function (Component: Function, options?: any): <Function>(target: any) => Function | void {

  if (!options) {
    options = {}
  }
  options.name = options.name || Component.name


  // prototype props.
  var proto = Component.prototype
  var constructor = new proto.constructor();


  /// has vue?
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


  Object.getOwnPropertyNames(proto).forEach(function (key) {

    // skip constructor     
    if (key === 'constructor') {
      return
    }


    // hooks
    if (internalHooks.indexOf(key) > -1) {

      // this came from @Data() decorator
      if (!(proto[key] instanceof Function) && key == 'data') {

        if (constructor) {

          // assign data default values initialized from constructor
          Object.getOwnPropertyNames(proto[key]).forEach(function (prop) {
            proto[key][prop] = constructor[prop]
          })
          
        }

        // create data() fn in options
        options[key] = () => {
          return proto[key];
        }


      } else {

        options[key] = proto[key]
        
      }

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



  // Build vue component
  var superProto = Object.getPrototypeOf(Component.prototype)
  var Super = superProto instanceof Vue
    ? superProto.constructor
    : Vue
  return Super.extend(options)

}


var decorator = function (options?): ClassDecorator {

  if (options instanceof Function) {
    return componentFactory(<Function>options)
  }

  return function (Component) {
    return componentFactory(Component, options)
  }

}


export = decorator;