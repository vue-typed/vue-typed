define("action", ["require", "exports"], function (require, exports) {
    "use strict";
    var vuexActionsFactory = function (target, key, descriptor, action) {
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
    var decorator = function (action) {
        return function (target, key, descriptor) {
            return vuexActionsFactory(target, key, descriptor, action);
        };
    };
    return decorator;
});
define("data", ["require", "exports"], function (require, exports) {
    "use strict";
    var dataFactory = function (target, key) {
        if (target['data'] && target['data'] instanceof Function) {
            throw "vue-typed error: [" + target.constructor.name + "]: You can't use @data attribute while you have already data() function in your class.";
        }
        if (!target['data']) {
            target['data'] = {};
        }
        if (!target['data'][key]) {
            target['data'][key] = key;
        }
    };
    var decorator = function () {
        return function (target, key) {
            return dataFactory(target, key);
        };
    };
    return decorator;
});
define("getter", ["require", "exports"], function (require, exports) {
    "use strict";
    var vuexGettersFactory = function (target, key, getter) {
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
    var decorator = function (getter) {
        return function (target, key) {
            return vuexGettersFactory(target, key, getter);
        };
    };
    return decorator;
});
define("component", ["require", "exports", 'vue'], function (require, exports, Vue) {
    "use strict";
    const internalHooks = [
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
    ];
    var componentFactory = function (Component, options) {
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
        Object.getOwnPropertyNames(proto).forEach(function (key) {
            if (key === 'constructor') {
                return;
            }
            if (internalHooks.indexOf(key) > -1) {
                if (!(proto[key] instanceof Function) && key == 'data') {
                    if (constructor) {
                        Object.getOwnPropertyNames(proto[key]).forEach(function (prop) {
                            proto[key][prop] = constructor[prop];
                        });
                    }
                    options[key] = () => {
                        return proto[key];
                    };
                }
                else {
                    options[key] = proto[key];
                }
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
        var superProto = Object.getPrototypeOf(Component.prototype);
        var Super = superProto instanceof Vue
            ? superProto.constructor
            : Vue;
        return Super.extend(options);
    };
    var decorator = function (options) {
        if (options instanceof Function) {
            return componentFactory(options);
        }
        return function (Component) {
            return componentFactory(Component, options);
        };
    };
    return decorator;
});
define("index", ["require", "exports", "action", "data", "getter", "component"], function (require, exports, Action, Data, Getter, Component) {
    "use strict";
    exports.Action = Action;
    exports.Data = Data;
    exports.Getter = Getter;
    exports.Component = Component;
});
