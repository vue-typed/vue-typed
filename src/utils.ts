import { VirtualClass } from '../'
import * as Vue from 'vue'

var vueInternalPropNames = Object.getOwnPropertyNames(new Vue());
var vueInternalHooks = [
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

export function BuildOptions(Component: Function, options?: any): <Function>(target: any) => Function | void {



	if (!options) {
		options = {}
	}
	options.name = options.name || Component.name


	// class prototype.
	var proto = Component.prototype

	// avoid parent component initialization while building component
	if (Object.getPrototypeOf(proto) instanceof Vue)
		Object.setPrototypeOf(proto.constructor, function () { })

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

		if (!options.props) {
			options.props = {}
		}

		for (let p in props) {
			options.props[p] = props[p]
		}

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

		return options;

}

export function Virtual<T>(): VirtualClass<T> {
	return function () { } as any;
}