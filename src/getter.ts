/**
 * Vuex Getters
 */


var vuexGettersFactory = function (target: Object, key: string, getter: Function)  {
		
		if (!target['vuex']) {			
			target['vuex'] = {}
		}
		
		if (!target['vuex']['getters']) {			
			target['vuex']['getters'] = {}
		}
		
		if (!target['vuex']['getters'][key]){
			target['vuex']['getters'][key] = getter
		}
		
}

var decorator = function (getter: Function) : PropertyDecorator {
	return function(target: Object, key: string) {
		return vuexGettersFactory(target, key, getter);
	}
	
}

export = decorator;