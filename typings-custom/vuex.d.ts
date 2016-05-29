declare namespace vuex {
	interface VuexStatic extends Function {
		Store:IStore;	
	}
	interface IStoreParameter {
		state?: Object
		mutations?: Object,
		modules?: Object
	}
	interface IStore {
		new(params:IStoreParameter):IStore
		dispatch(mutation:string, ...args: any[])
	}
}

declare var Vuex: vuex.VuexStatic;

declare module "vuex" {
	export = Vuex;	
}