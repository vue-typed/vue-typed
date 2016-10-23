/**
  * vue-typed 1.0.3
  * The vue-class-component in typescript favor
  * https://github.com/budiadiono/vue-typed
  
  * Copyright 2016, Budi Adiono
  * Released under the MIT license.
  '*/
define(['exports', 'vue'], function (exports, Vue) { 'use strict';

function Action(action) {
    return function (target, key, descriptor) {
        if (!target['vuex']) {
            target['vuex'] = {};
        }
        if (!target['vuex']['actions']) {
            target['vuex']['actions'] = {};
        }
        if (!target['vuex']['actions'][key]) {
            target['vuex']['actions'][key] = action;
        }
    };
}

function Data() {
    return function (target, key) {
        if (target['data'] && target['data'] instanceof Function) {
            throw "vue-typed error: [" + target.constructor.name + "]: You can't use @data attribute while you have already data() function in your class.";
        }
        var id = '$_vt_data';
        if (!target[id]) {
            target[id] = {};
        }
        if (!target[id][key]) {
            target[id][key] = key;
        }
    };
}

function Getter(getter) {
    return function (target, key) {
        if (!target['vuex']) {
            target['vuex'] = {};
        }
        if (!target['vuex']['getters']) {
            target['vuex']['getters'] = {};
        }
        if (!target['vuex']['getters'][key]) {
            target['vuex']['getters'][key] = getter;
        }
    };
}

function Component(options) {
    var internalHooks = [
        'activate',
        'init',
        'ready',
        'beforeCompile',
        'compiled',
        'attached',
        'detached',
        'created',
        'beforeDestroy',
        'destroyed',
        'props',
        'watch',
        'data',
        'beforeCreate',
        'beforeMount',
        'mounted',
        'beforeUpdate',
        'updated',
        'activated',
        'deactivated',
        'render',
        'el',
        'vuex',
    ];
    var factory = function (Component, options) {
        if (!options) {
            options = {};
        }
        options.name = options.name || Component.name;
        var proto = Component.prototype;
        var constructor = new proto.constructor();
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
            var data_keys = Object.getOwnPropertyNames(dataAttrs);
            options['data'] = () => {
                var data_obj = {};
                for (var i = 0; i < data_keys.length; i++) {
                    var prop = data_keys[i];
                    data_obj[prop] = constructor[prop];
                }
                return data_obj;
            };
        }
        var propAttrs = proto['$_vt_props'];
        delete proto['$_vt_props'];
        if (propAttrs) {
            var key = 'props';
            var props = {};
            var prop_keys = Object.getOwnPropertyNames(propAttrs);
            for (var i = 0; i < prop_keys.length; i++) {
                var prop = prop_keys[i];
                var propVal = undefined;
                var descriptor = Object.getOwnPropertyDescriptor(propAttrs, prop);
                var constructorDefault = constructor[prop];
                if (typeof (descriptor.value) === 'object') {
                    propVal = descriptor.value;
                    if (!propVal.default)
                        propVal.default = constructorDefault;
                }
                else if (constructorDefault) {
                    propVal = {
                        default: constructorDefault
                    };
                }
                if (typeof (propVal) === 'undefined') {
                    propVal = true;
                }
                props[prop] = propVal;
            }
            options['props'] = props;
        }
        Object.getOwnPropertyNames(proto).forEach(function (key) {
            if (key === 'constructor') {
                return;
            }
            if (internalHooks.indexOf(key) > -1) {
                options[key] = proto[key];
                return;
            }
            var descriptor = Object.getOwnPropertyDescriptor(proto, key);
            if (typeof descriptor.value === 'function') {
                if (vueKeys.indexOf(key) > -1)
                    return;
                (options.methods || (options.methods = {}))[key] = descriptor.value;
            }
            else if (descriptor.get || descriptor.set) {
                (options.computed || (options.computed = {}))[key] = {
                    get: descriptor.get,
                    set: descriptor.set
                };
            }
        });
        var superProto = Object.getPrototypeOf(proto);
        var Super = superProto instanceof Vue
            ? superProto.constructor
            : Vue;
        return Super.extend(options);
    };
    if (options instanceof Function) {
        return factory(options);
    }
    return function (Component) {
        return factory(Component, options);
    };
}

function Prop(options) {
    return function (target, key) {
        var id = '$_vt_props';
        if (!target[id]) {
            target[id] = {};
        }
        if (!target[id][key]) {
            if (options) {
                target[id][key] = options;
            }
            else {
                target[id][key] = true;
            }
        }
    };
}

function Watch(property, deep) {
    return function (target, key) {
        if (!target['watch']) {
            target['watch'] = {};
        }
        if (!target['watch'][property]) {
            var watcher;
            if (deep !== undefined) {
                watcher = {
                    handler: target[key],
                    deep: deep
                };
            }
            else {
                watcher = target[key];
            }
            target['watch'][property] = watcher;
        }
    };
}

exports.Action = Action;
exports.Data = Data;
exports.Getter = Getter;
exports.Component = Component;
exports.Prop = Prop;
exports.Watch = Watch;

Object.defineProperty(exports, '__esModule', { value: true });

});
