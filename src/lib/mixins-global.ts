import * as Vue from 'vue'
import { ComponentOptions } from 'vue/types/options';
import { BuildOptions } from './utils';

/**
 * Build Vue global mixin.
 * 
 * @export
 * @param {ComponentOptions<Vue>} [options] 
 * @returns {ClassDecorator} 
 */
export function GlobalMixin(options?: ComponentOptions<Vue>): ClassDecorator {
	
	var factory = function (Component: Function, options?: any): void {
		Vue.mixin(BuildOptions(Component, options))
	}

	return function (Component) {
		return factory(Component, options)
	}

}