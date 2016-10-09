/**
 * Vuex Actions
 */

export function Action(action: Function): MethodDecorator {

	return function (target: Object, key: string, descriptor: any) {
		
		if (!target['vuex']) {
			target['vuex'] = {}
		}

		if (!target['vuex']['actions']) {
			target['vuex']['actions'] = {}
		}

		if (!target['vuex']['actions'][key]) {
			target['vuex']['actions'][key] = action
		}
		
	}
}