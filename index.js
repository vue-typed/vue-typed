/**
  * vue-typed 2.1.1
  * Sets of ECMAScript / Typescript decorators that helps you write Vue component easily.
  * http://vue-typed.github.io/vue-typed/
  
  * Copyright 2016, Budi Adiono
  * Released under the MIT license.
  '*/
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (factory((global.VueTyped = global.VueTyped || {}),global.Vue));
}(this, (function (exports,Vue) { 'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var vueInternalPropNames = Object.getOwnPropertyNames(new Vue());
var vueInternalHooks = ['data', 'props', 'watch', 'beforeCreate', 'created', 'beforeMount', 'mounted', 'beforeUpdate', 'updated', 'activated', 'deactivated', 'beforeDestroy', 'destroyed', 'render'];
function BuildOptions(Component, options) {
    if (!options) {
        options = {};
    }
    options.name = options.name || Component.name;
    var proto = Component.prototype;
    if (Object.getPrototypeOf(proto) instanceof Vue) Object.setPrototypeOf(proto.constructor, function () {});
    var constructor = new proto.constructor();
    var vueKeys = [];
    if (proto.vuex) {
        var protoVue = proto.vuex;
        if (protoVue['getters']) {
            Object.getOwnPropertyNames(protoVue['getters']).forEach(function (k) {
                vueKeys.push(k);
            });
        }
        if (protoVue['actions']) {
            Object.getOwnPropertyNames(protoVue['actions']).forEach(function (k) {
                vueKeys.push(k);
            });
        }
    }
    var propAttrs = proto['$_vt_props'];
    var propNames = undefined;
    delete proto['$_vt_props'];
    if (propAttrs) {
        var key = 'props';
        var props = {};
        propNames = Object.getOwnPropertyNames(propAttrs);
        for (var i = 0; i < propNames.length; i++) {
            var prop = propNames[i];
            var propVal = undefined;
            var descriptor = Object.getOwnPropertyDescriptor(propAttrs, prop);
            var constructorDefault = constructor[prop];
            if (_typeof(descriptor.value) === 'object') {
                propVal = descriptor.value;
                if (!propVal.default) propVal.default = constructorDefault;
            } else if (constructorDefault) {
                propVal = {
                    default: constructorDefault
                };
            }
            if (typeof propVal === 'undefined') {
                propVal = true;
            }
            props[prop] = propVal;
        }
        if (!options.props) {
            options.props = {};
        }
        for (var p in props) {
            options.props[p] = props[p];
        }
    }
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        if (vueInternalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (typeof descriptor.value === 'function') {
            if (vueKeys.indexOf(key) > -1) return;
            (options.methods || (options.methods = {}))[key] = descriptor.value;
        } else if (descriptor.get || descriptor.set) {
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    var dataNames = [];
    var restrictedNames = vueInternalPropNames;
    if (propNames) restrictedNames = restrictedNames.concat(propNames);
    if (vueKeys && vueKeys.length) restrictedNames = restrictedNames.concat(vueKeys);
    Object.getOwnPropertyNames(constructor).forEach(function (key) {
        if (restrictedNames.indexOf(key) === -1) {
            dataNames.push(key);
        }
    });
    if (dataNames.length > 0) {
        var parentData = undefined;
        var parentDataType = _typeof(options['data']);
        if (parentDataType === 'function') {
            parentData = options['data']();
        } else if (parentDataType === 'object') {
            parentData = options['data'];
        }
        options['data'] = function () {
            var data_obj = parentData || {};
            dataNames.forEach(function (prop) {
                var descriptor = Object.getOwnPropertyDescriptor(constructor, prop);
                if (!descriptor.get && !descriptor.set && typeof descriptor.value !== 'function') {
                    data_obj[prop] = constructor[prop];
                }
            });
            return data_obj;
        };
    }
    return options;
}
function Virtual() {
    return function () {};
}

function Component(options) {
    var factory = function factory(Component, options) {
        var superProto = Object.getPrototypeOf(Component.prototype);
        var Super = superProto instanceof Vue ? superProto.constructor : Vue;
        return Super['extend'](BuildOptions(Component, options));
    };
    if (options instanceof Function) {
        return factory(options);
    }
    return function (Component) {
        return factory(Component, options);
    };
}

function Options(options) {
    return function (Component) {
        function chainUp(component) {
            var Super = Object.getPrototypeOf(component);
            if (Super instanceof Object && Super.prototype) {
                var keys = Object.getOwnPropertyNames(Super.prototype);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var descriptor = Object.getOwnPropertyDescriptor(Super.prototype, key);
                    if (!Component.prototype.hasOwnProperty(key)) Object.defineProperty(Component.prototype, key, descriptor);
                }
                chainUp(Super);
            }
        }
        chainUp(Component);
        return BuildOptions(Component, options);
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
            } else {
                target[id][key] = true;
            }
        }
    };
}

var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function Watch(property, deep) {
    return function (target, key) {
        if (_typeof$1(target['watch']) !== 'object') {
            target['watch'] = {};
        }
        if (!target['watch'][property]) {
            var watcher;
            if (deep !== undefined) {
                watcher = {
                    handler: target[key],
                    deep: deep
                };
            } else {
                watcher = target[key];
            }
            target['watch'][property] = watcher;
        }
    };
}

function Mixin(component) {
    return Vue.extend({
        mixins: [component]
    });
}
function Mixins() {
    for (var _len = arguments.length, components = Array(_len), _key = 0; _key < _len; _key++) {
        components[_key] = arguments[_key];
    }

    return Vue.extend({
        mixins: components
    });
}

function GlobalMixin(options) {
    var factory = function factory(Component, options) {
        Vue.mixin(BuildOptions(Component, options));
    };
    return function (Component) {
        return factory(Component, options);
    };
}

exports.Component = Component;
exports.Options = Options;
exports.Prop = Prop;
exports.Watch = Watch;
exports.Mixin = Mixin;
exports.Mixins = Mixins;
exports.GlobalMixin = GlobalMixin;
exports.Virtual = Virtual;

Object.defineProperty(exports, '__esModule', { value: true });

})));
