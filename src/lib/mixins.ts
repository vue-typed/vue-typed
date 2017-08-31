import * as Vue from 'vue'
import { VirtualClass } from "./common";

/**
 * Single mixin.
 * 
 * @export
 * @template T 
 * @param {{ new () : T; }} component 
 * @returns {VirtualClass<T>} 
 */
export function Mixin<T>(component: { new(): T; }): VirtualClass<T> {
	return Vue.extend({
		mixins: [component]
	}) as any
}

/**
 * Multiple mixins.
 * 
 * @export
 * @template T 
 * @param {...{ new () : any; }[]} components 
 * @returns {VirtualClass<T>} 
 */
export function Mixins<T>(...components: { new(): any; }[]): VirtualClass<T> {
	return Vue.extend({
		mixins: components
	}) as any
}