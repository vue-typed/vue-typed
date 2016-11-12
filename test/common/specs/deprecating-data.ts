import { Component, Prop, Watch, Action, Getter } from '../../../index'
import { expect } from 'chai'
import * as Vue from 'vue'
import { getDataOptionsValue } from '../utils';

describe('deprecating data test', () => {


	it('simple data', () => {

		@Component()
		class App extends Vue {
			msg: string = 'hello'
		}

		var app = new App();
		expect(getDataOptionsValue(app)).to.have.property('msg').that.equals('hello')

	})

	it('should not conflit with methods', () => {

		@Component()
		class App extends Vue {

			msg() {
				console.log('bar');
			}

			data1: string = 'hi'
		}

		var app = new App();

		expect(getDataOptionsValue(app)).to.have.property('data1').that.equals('hi')
		expect(getDataOptionsValue(app)).to.not.have.property('msg')

	})

	it('should not conflit with props', () => {

		@Component()
		class App extends Vue {

			@Prop()
			msg: string = 'hello'

			data1: string = 'hi'
		}

		var app = new App();

		expect(getDataOptionsValue(app)).to.have.property('data1').that.equals('hi')
		expect(getDataOptionsValue(app)).to.not.have.property('msg')

	})

	it('should not conflit with watch', () => {

		@Component()
		class App extends Vue {

			@Prop()
			msg: string = 'hello'

			data1: string = 'hi'

			@Watch('data1')
			data_wacther() {
				console.log('bar');
			}
		}

		var app = new App();

		expect(getDataOptionsValue(app)).to.have.property('data1').that.equals('hi')
		expect(getDataOptionsValue(app)).to.not.have.property('msg')
		expect(getDataOptionsValue(app)).to.not.have.property('data_wacther')

	})

	it('should not conflit with getter setter property', () => {

		@Component()
		class App extends Vue {
			
			get msg() {
				return this.data1;
			}

			set msg(val) {
				this.data1 = val;
			}

			data1: string = 'hi'
			
		}

		var app = new App();

		expect(getDataOptionsValue(app)).to.have.property('data1').that.equals('hi')
		expect(getDataOptionsValue(app)).to.not.have.property('msg')

	})

	it('should not conflit with getter and action', () => {

		// Vuex ------------------------------------------------------

		const state = {
			count: 0
		}

		const mutations = {
			INCREMENT(state, num) {
				state.count += num
			}
		}

		const actions = {
			getCount: (state) => {
				return state.count;
			},
			addCount: ({dispatch, state}, num) => {
				dispatch('INCREMENT', num)
			}
		}

		// Component -------------------------------------------------

		@Component({
			template: '<div id="foo"><div class="text">{{count}}</div><button @click="add()" class="btn">test</button></div>'
		})
		class App {

			data1: string = 'hi'

			@Getter(actions.getCount)
			count: number = 1

			// declare empty function with appropriate parameter(s) to hook vuex action
			@Action(actions.addCount)
			increment(num) { }

			add() {
				this.increment(5);
			}

		}

		var app = new App();

		expect(getDataOptionsValue(app)).to.have.property('data1').that.equals('hi')
		expect(getDataOptionsValue(app)).to.not.have.property('count')
		expect(getDataOptionsValue(app)).to.not.have.property('increment')
		expect(getDataOptionsValue(app)).to.not.have.property('add')

	})



});