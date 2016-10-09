/**
 * Vuex Getters
 */


export function Getter(getter: Function): PropertyDecorator {

	return function (target: Object, key: string) {
		if (!target['vuex']) {
			target['vuex'] = {}
		}

		if (!target['vuex']['getters']) {
			target['vuex']['getters'] = {}
		}

		if (!target['vuex']['getters'][key]) {
			target['vuex']['getters'][key] = getter
		}
	}
}