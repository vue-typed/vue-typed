import { Component, Prop } from '../../../index'

export abstract class AbstractClass {

	baseData = 'hello'

	@Prop({
		default: 'hi'
	})
	baseProp

}

@Component()
export abstract class AbstractComponent {

	baseData = 'hello'

	@Prop({
		default: 'hi'
	})
	baseProp

}

