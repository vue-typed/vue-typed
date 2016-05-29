/**
 * Vuex Actions
 */


var vuexActionsFactory = function (target: Object, key: string, descriptor: any, action: Function)  {
		
		if (!target['vuex']) {			
			target['vuex'] = {}
		}
		
		if (!target['vuex']['actions']) {			
			target['vuex']['actions'] = {}
		}
		
		if (!target['vuex']['actions'][key]){
			target['vuex']['actions'][key] = action  
		}
		
}

var decorator = function (action: Function) : MethodDecorator {
	return function (target: Object, key: string, descriptor: any) {
		return vuexActionsFactory(target, key, descriptor, action);
	}
	
}

export = decorator;