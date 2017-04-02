/**
 * Vue Mixins
 */

import Vue from 'vue'
import { VirtualClass } from '../'

export function Mixin<T>(component: { new () : T; }): VirtualClass<T> {
	return Vue.extend({
		mixins: [component]
	}) as any;
}

export function Mixins<T>(...components: { new (); }[]): VirtualClass<T> {
	return Vue.extend({
		mixins: components
	}) as any
}