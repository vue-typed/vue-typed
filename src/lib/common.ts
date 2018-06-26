/**
 * Common helpers.
 */

import Vue from 'vue';

/**
 * Vue object declarations from "T".
 */
export type VirtualClass<T> = { new(): T } & Pick<typeof Vue, keyof typeof Vue>

/**
 * Resulting an empty constructor with Vue object declarations from "T".
 * Useful to create a fake inheritance.
 * 
 * @export
 * @template T 
 * @returns {VirtualClass<T>} 
 */
export function Virtual<T>(): VirtualClass<T> {
	return function () { } as any;
}