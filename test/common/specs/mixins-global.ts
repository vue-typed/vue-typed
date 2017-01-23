import { Component, Prop, GlobalMixin, Virtual } from '../../../index'
import { expect } from 'chai'
import * as Vue from 'vue'


describe('global mixins', () => {


	it('should be ok', () => {

		let globalMixinCreated = false
		let globalMethodInvoked = false

		interface IGlobal {
			globalMethod()
		}

		@GlobalMixin()
		class Global implements IGlobal {

			created() {
				globalMixinCreated = true
			}

			globalMethod() {
				globalMethodInvoked = true
			}

			globalData = 'global data'

			@Prop()
			globalProp = 'global prop'
		}

		@Component()
		class MyComp extends Virtual<Global>() {
			created() {
				this.globalMethod()
			}
		}

		const c = new MyComp()

		expect(globalMixinCreated).eq(true)
		expect(globalMethodInvoked).eq(true)
		expect(c['$options']['data']()).to.have.property('globalData').that.equals('global data')
		expect(c['$options']['props']).to.have.property('globalProp').have.property('default').that.equals('global prop')

	})

})