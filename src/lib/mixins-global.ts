import Vue, { ComponentOptions } from 'vue'
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
		Vue.mixin(BuildOptions(Component, options) as any)
	}

	return function (Component) {
		return factory(Component, options)
	}

}