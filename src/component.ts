/**
 * Vue Component
 */


import * as Vue from 'vue'

export function Component(options?): ClassDecorator {

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
    'vuex',
    'props',
    'watch'
  ]

  var factory = function (Component: Function, options?: any): <Function>(target: any) => Function | void {

    if (!options) {
      options = {}
    }
    options.name = options.name || Component.name


    // class prototype.
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

          // get data property names 
          var data_keys = Object.getOwnPropertyNames(proto[key]);

          // won't use that fake 'data' property in class prototype
          delete proto[key];

          // create data() fn in options
          options[key] = () => {

            // define new data object
            var data_obj = {}

            // assign data default values initialized from constructor
            for (var i = 0; i < data_keys.length; i++) {
              var prop = data_keys[i];
              data_obj[prop] = constructor[prop];
            }
            
            return data_obj
          }

        } else {

          if (key == 'props' && constructor) {
            
            // assign props default values initialized from constructor
            Object.getOwnPropertyNames(proto[key]).forEach(function (prop) {              
              var val = constructor[prop];

              if (val) {
                
                if (typeof proto[key][prop] == 'string') {
                  // no options defined in Props decorator

                  proto[key][prop] = {
                    default: val
                  }
                } else if (typeof proto[key][prop] == 'object') {

                  // when options defined in Props decorator
                  if (!proto[key][prop]['default']) {
                    proto[key][prop]['default'] = val;
                  } else {
                    console.error('[Vue-typed warn]: You have defined default value for Props both in options and constructor. (found in component: <' + Component.name + '>, props: <'+prop+'>)');
                  }
                  
                }
              }
              
            })
          }

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
    var superProto = Object.getPrototypeOf(proto)
    var Super = superProto instanceof Vue
      ? superProto.constructor
      : Vue
    return Super.extend(options)

  }

  if (options instanceof Function) {
    return factory(<Function>options)
  }

  return function (Component) {
    return factory(Component, options)
  }

}