/**
 * Internal utilities.
 */

import * as Vue from 'vue'
import { ComponentOptions } from "vue";

let vueInternalPropNames = Object.getOwnPropertyNames(new Vue());
let vueInternalHooks = [
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
export function BuildOptions(Component: Function & ComponentOptions<Vue>, options?: any): <Function>(target: any) => Function | void {

	// evaluate component name
	if (!options) {
		options = {}
	}
	options.name = options.name || Component.name


	// class prototype.
	let proto = Component.prototype

	// avoid parent component initialization while building component
	if (Object.getPrototypeOf(proto) instanceof Vue)
		Object.setPrototypeOf(proto.constructor, function () { })

	let constructor = new proto.constructor();



	//
	// Extract props / build options.props
	//
	let propAttrs = proto[PROP_KEY];
	let propNames = undefined;
	delete proto[PROP_KEY];
	if (propAttrs) {
		let props = {}

		propNames = Object.getOwnPropertyNames(propAttrs);
		for (let i = 0; i < propNames.length; i++) {
			let prop = propNames[i];
			let propVal = undefined;
			let descriptor = Object.getOwnPropertyDescriptor(propAttrs, prop)
			let constructorDefault = constructor[prop];

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



	//
	// build internal hooks, methods and computed properties
	//
	Object.getOwnPropertyNames(proto).forEach(function (key) {

		// skip constructor     
		if (key === 'constructor') {
			return
		}


		// internal hooks
		if (vueInternalHooks.indexOf(key) > -1) {
			options[key] = proto[key]
			return
		}


		let descriptor = Object.getOwnPropertyDescriptor(proto, key)
		if (typeof descriptor.value === 'function') {

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


	//
	// Build options.data
	//
	let dataNames: string[] = []
	let restrictedNames = vueInternalPropNames;
	if (propNames) restrictedNames = restrictedNames.concat(propNames);

	// gather data from constructor
	Object.getOwnPropertyNames(constructor).forEach(function (key) {
		if (restrictedNames.indexOf(key) === -1)
			dataNames.push(key);
	});


	if (dataNames.length > 0) {

		// evaluate parent data
		let parentData: any = undefined
		let parentDataType = typeof options.data;
		if (parentDataType === 'function') {
			parentData = options.data();
		} else if (parentDataType === 'object') {
			parentData = options.data;
		}

		options.data = () => {

			// define new data object
			let data_obj = parentData || {}

			// set data default values initialized from constructor
			dataNames.forEach(function (prop) {
				let descriptor = Object.getOwnPropertyDescriptor(constructor, prop)
				if (!descriptor.get && !descriptor.set && typeof descriptor.value !== 'function') {
					data_obj[prop] = constructor[prop]
				}
			})

			return data_obj
		}
	}

	return options;

}