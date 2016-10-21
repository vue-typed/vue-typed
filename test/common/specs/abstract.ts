import { Component, Data, Prop } from '../../../index'

export abstract class AbstractClass {

	@Data()
	baseData = 'hello'

	@Prop({
		default: 'hi'
	})
	baseProp

}

@Component()
export abstract class AbstractComponent {

	@Data()
	baseData = 'hello'

	@Prop({
		default: 'hi'
	})
	baseProp

}

