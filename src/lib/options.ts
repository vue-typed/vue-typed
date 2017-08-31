import * as Vue from 'vue'
import { ComponentOptions } from 'vue/types/options';
import { BuildOptions } from './utils';

/**
 * Build Vue simple raw options object.
 * Inheritance is not supported, unless virtual inheritance.
 * 
 * @export
 * @param {ComponentOptions<Vue>} [options] 
 * @returns {ClassDecorator} 
 */
export function Options(options?: ComponentOptions<Vue>): ClassDecorator {

	return function (Component: any) {

		function chainUp(component: any) {
			var Super = Object.getPrototypeOf(component)

			if (Super instanceof Object && Super.prototype) {
				var keys = Object.getOwnPropertyNames(Super.prototype)
				for (var i = 0; i < keys.length; i++) {
					var key = keys[i]
					var descriptor = Object.getOwnPropertyDescriptor(Super.prototype, key);
					if (!Component.prototype.hasOwnProperty(key))
						Object.defineProperty(Component.prototype, key, descriptor)
				}
				chainUp(Super)
			}
		}

		// normalize object
		chainUp(Component)

		return BuildOptions(Component, options) as any
	}

}