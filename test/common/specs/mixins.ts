import { Component, Prop, Mixin, Mixins, Options, Virtual } from '../../../dist/index'
import { expect } from 'chai'
import * as Vue from 'vue'


describe('mixins', () => {


	it('single mixin', () => {

		let mixinCreatedCalls = 0
		let mixinCreated = false
		let mixinMethodCalled = false

		@Component()
		class MyMixin extends Vue {

			mixinData = 'data from mixin'

			@Prop()
			mixinProp = 'prop from mixin'

			created() {
				mixinCreatedCalls++
				mixinCreated = true
			}
			mymix() {
				mixinMethodCalled = true
			}
		}

		@Component()
		class Container extends Mixin(MyMixin) {
			created() {
				this.mymix()
			}
		}

		var c: any = new Container()

		expect(mixinCreated).eq(true)
		expect(mixinMethodCalled).eq(true)
		expect(mixinCreatedCalls, 'mixin created method should be called once').eq(1)
		expect(c['$options']['data']()).to.have.property('mixinData').that.equals('data from mixin')
		expect(c['$options']['props']).to.have.property('mixinProp').have.property('default').that.equals('prop from mixin')


	})

	it('multiple mixins', () => {

		let mixinCreated1 = false
		let mixinMethodCalled1 = false
		let mixinCreated2 = false
		let mixinMethodCalled2 = false


		@Component()
		class MyMixin1 extends Vue {

			mixinData1 = 'data from mixin 1'

			@Prop()
			mixinProp1 = 'prop from mixin 1'

			created() {
				mixinCreated1 = true
			}

			mymix1() {
				mixinMethodCalled1 = true
			}
		}

		@Component()
		class MyMixin2 extends Vue {
			mixinData2 = 'data from mixin 2'

			@Prop()
			mixinProp2 = 'prop from mixin 2'

			created() {
				mixinCreated2 = true
			}

			mymix2() {
				mixinMethodCalled2 = true
			}
		}

		interface AllMyMixins extends MyMixin1, MyMixin2 { }

		@Component()
		class Container extends Mixins<AllMyMixins>(MyMixin1, MyMixin2) {
			created() {
				this.mymix1()
				this.mymix2()
			}
		}

		var c: any = new Container()

		expect(mixinCreated1).eq(true)
		expect(mixinMethodCalled1).eq(true)
		expect(mixinCreated2).eq(true)
		expect(mixinMethodCalled2).eq(true)
		expect(c['$options']['data']()).to.have.property('mixinData1').that.equals('data from mixin 1')
		expect(c['$options']['props']).to.have.property('mixinProp1').have.property('default').that.equals('prop from mixin 1')
		expect(c['$options']['data']()).to.have.property('mixinData2').that.equals('data from mixin 2')
		expect(c['$options']['props']).to.have.property('mixinProp2').have.property('default').that.equals('prop from mixin 2')

	})


	it('single mixin using @Options', () => {

		let mixinCreatedCalls = 0
		let mixinCreated = false
		let mixinMethodCalled = false

		@Options()
		class MyMixin extends Virtual<Vue>() {

			mixinData = 'data from mixin'

			@Prop()
			mixinProp = 'prop from mixin'

			created() {
				mixinCreatedCalls++
				mixinCreated = true
			}
			mymix() {
				mixinMethodCalled = true
			}
		}

		@Component()
		class Container extends Mixin(MyMixin) {
			created() {				
				this.mymix()
			}
		}

		var c: any = new Container()

		expect(mixinCreated).eq(true)
		expect(mixinMethodCalled).eq(true)
		expect(mixinCreatedCalls, 'mixin created method should be called once').eq(1)
		expect(c['$options']['data']()).to.have.property('mixinData').that.equals('data from mixin')
		expect(c['$options']['props']).to.have.property('mixinProp').have.property('default').that.equals('prop from mixin')


	})

	it('multiple mixins using @Options', () => {

		let mixinCreated1 = false
		let mixinMethodCalled1 = false
		let mixinCreated2 = false
		let mixinMethodCalled2 = false


		@Options()
		class MyMixin1 extends Vue {

			mixinData1 = 'data from mixin 1'

			@Prop()
			mixinProp1 = 'prop from mixin 1'

			created() {
				mixinCreated1 = true
			}

			mymix1() {
				mixinMethodCalled1 = true
			}
		}

		@Options()
		class MyMixin2 extends Vue {
			mixinData2 = 'data from mixin 2'

			@Prop()
			mixinProp2 = 'prop from mixin 2'

			created() {
				mixinCreated2 = true
			}

			mymix2() {
				mixinMethodCalled2 = true
			}
		}

		interface AllMyMixins extends MyMixin1, MyMixin2 { }

		@Component()
		class Container extends Mixins<AllMyMixins>(MyMixin1, MyMixin2) {
			created() {
				this.mymix1()
				this.mymix2()
			}
		}

		var c: any = new Container()

		expect(mixinCreated1).eq(true)
		expect(mixinMethodCalled1).eq(true)
		expect(mixinCreated2).eq(true)
		expect(mixinMethodCalled2).eq(true)
		expect(c['$options']['data']()).to.have.property('mixinData1').that.equals('data from mixin 1')
		expect(c['$options']['props']).to.have.property('mixinProp1').have.property('default').that.equals('prop from mixin 1')
		expect(c['$options']['data']()).to.have.property('mixinData2').that.equals('data from mixin 2')
		expect(c['$options']['props']).to.have.property('mixinProp2').have.property('default').that.equals('prop from mixin 2')

	})

})