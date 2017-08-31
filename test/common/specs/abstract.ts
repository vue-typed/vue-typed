import { Component, Prop } from '../../../dist/index'

export abstract class AbstractClass {

	baseData = 'hello'

	@Prop({
		default: 'hi'
	})
	baseProp: string

}

@Component()
export abstract class AbstractComponent {

	baseData = 'hello'

	@Prop({
		default: 'hi'
	})
	baseProp: string

}

