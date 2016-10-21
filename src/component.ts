/**
 * Vue Component
 */


import * as Vue from 'vue'

export function Component(options?): ClassDecorator {

  var internalHooks = [

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

    var dataAttrs = proto['$_vt_data'];
    delete proto['$_vt_data'];
    if (dataAttrs) {
      
      // get data property names
      var data_keys = Object.getOwnPropertyNames(dataAttrs)

      // create data() fn in options
      options['data'] = () => {

        // define new data object
        var data_obj = {}

        // assign data default values initialized from constructor
        for (var i = 0; i < data_keys.length; i++) {
          var prop = data_keys[i]
          data_obj[prop] = constructor[prop]
        }
        return data_obj
      }
      
    }

    var propAttrs = proto['$_vt_props'];
    delete proto['$_vt_props'];
    if (propAttrs) {
      var key = 'props';
      var props = {}

      var prop_keys = Object.getOwnPropertyNames(propAttrs);
      for (var i = 0; i < prop_keys.length; i++) {
        var prop = prop_keys[i];
        var propVal;
        var descriptor = Object.getOwnPropertyDescriptor(propAttrs, prop)
        var constructorDefault = constructor[prop]; 

        if (typeof(descriptor.value) === 'object') {

          // prop options defined
          propVal = descriptor.value

          // try to assign default value
          if (!propVal.default)
            propVal.default= constructorDefault;

        } else if (constructorDefault) {

          // create prop object with default value from constructor
          propVal = {
            default: constructorDefault
          }
        }

        // just define empty prop
        if (typeof(propVal) === 'undefined') {
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
      if (internalHooks.indexOf(key) > -1) {
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