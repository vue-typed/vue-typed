
/**
 * Make a function to be a watch observer.
 */

import { PropOption } from '../index.d.ts';

export function Watch(property: string): MethodDecorator {

	return function (target: Object, key: string) {
		
		if (!target['watch']) {
			target['watch'] = {};
		}
		
		if (!target['watch'][property]) {
			target['watch'][property] = target[key];
		}

	}
}