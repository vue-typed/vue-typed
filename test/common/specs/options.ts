import { Prop, Options, Watch } from '../../../dist/index'
import { expect } from 'chai'

describe('options', () => {


	it('simple options', () => {


		@Options({
			props: {
				'prop-in-options': {
					default: 'Foo'
				}
			}
		})
		class Container {

			data1 = 'the data'

			@Prop()
			prop1 = 'the prop'

			created() {
			}

			method1() {
			}

			@Watch('data1')
			watcher(val: any) {

			}


			get identity() {
				return this.data1;
			}

			set identity(val) {
				this.data1 = val
			}

		}


		expect(Container['data'](), 'assert data').to.have.property('data1').eq('the data')
		expect(Container, 'assert props').to.have.property('props').to.have.property('prop1').to.have.property('default').eq('the prop')
		expect(Container, 'assert props in options').to.have.property('props').to.have.property('prop-in-options').to.have.property('default').eq('Foo')
		expect(Container, 'assert methods').to.have.property('methods').to.have.property('method1').to.be.a('Function')
		expect(Container, 'assert created').to.have.property('created').to.be.a('Function')
		expect(Container, 'assert watch').to.have.property('watch').to.have.property('data1').to.be.a('Function')
		expect(Container, 'assert computed').to.have.property('computed').to.have.property('identity').to.have.property('get').to.be.a('Function')
		expect(Container, 'assert computed').to.have.property('computed').to.have.property('identity').to.have.property('set').to.be.a('Function')


	})


	it('options inheritance', () => {

		class SuperParent {
			_identity = ''

			get identity() {
				return this._identity;
			}

			set identity(val) {
				this._identity = val
			}
		}


		class Parent extends SuperParent {
			dataParent = 'the parent data'

			@Prop()
			propParent = 'the parent prop'

			created() { }

			method2() { }
		}


		@Options({
			props: {
				'prop-in-options': {
					default: 'Foo'
				}
			}
		})
		class Container extends Parent {

			data1 = 'the data'

			@Prop()
			prop1 = 'the prop'

			method1() {
			}

			@Watch('data1')
			watcher(val: any) {

			}

		}




		expect(Container['data'](), 'assert data').to.have.property('data1').eq('the data')
		expect(Container['data'](), 'assert parent data').to.have.property('dataParent').eq('the parent data')
		expect(Container['data'](), 'assert super parent data').to.have.property('_identity').eq('')
		expect(Container, 'assert props').to.have.property('props').to.have.property('prop1').to.have.property('default').eq('the prop')
		expect(Container, 'assert props in options').to.have.property('props').to.have.property('prop-in-options').to.have.property('default').eq('Foo')
		expect(Container, 'assert parent props').to.have.property('props').to.have.property('propParent').to.have.property('default').eq('the parent prop')
		expect(Container, 'assert created').to.have.property('created').to.be.a('Function')
		expect(Container, 'assert methods').to.have.property('methods').to.have.property('method1').to.be.a('Function')
		expect(Container, 'assert parent methods').to.have.property('methods').to.have.property('method2').to.be.a('Function')
		expect(Container, 'assert watch').to.have.property('watch').to.have.property('data1').to.be.a('Function')
		expect(Container, 'assert computed').to.have.property('computed').to.have.property('identity').to.have.property('get').to.be.a('Function')
		expect(Container, 'assert computed').to.have.property('computed').to.have.property('identity').to.have.property('set').to.be.a('Function')

	})
})