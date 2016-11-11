import { Component, Getter, Action } from '../../../index'
import { expect } from 'chai'
import * as Vue from 'vue'
import * as Vuex from 'vuex'

describe('vuex (ts)', () => {

	it('getter', () => {

		Vue.use(Vuex);

		const state = {
			count: 99
		}

		const actions = {
			getCount: (state) => {
				return state.count;
			}
		}

		const store = new Vuex.Store({
			state
		})


		@Component({
			template: '<div id="foo"><div class="text">{{count}}</div></div>',
			store: store
		})
		class Foo {
			
			@Getter(actions.getCount)
			count: number

		}
		
		var vm = (new Foo())['$mount']();
		expect(vm['$el'].querySelector('.text').textContent).to.contain('99');

	});
	
	
	it('action', (done) => {

		Vue.use(Vuex);

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
			addCount: ({dispatch, state}, num) =>{
				dispatch('INCREMENT', num)
			}
		}

		const store = new Vuex.Store({
			state,
			mutations
		})


		@Component({
			template: '<div id="foo"><div class="text">{{count}}</div><button @click="add()" class="btn">test</button></div>',
			store: store
		})
		class Foo {
			
			@Getter(actions.getCount)
			count: number
			
			@Action(actions.addCount)
			increment(num) {}
			
			add() {
				this.increment(5);
			}

		}
		
		var vm = (new Foo())['$mount']();
		
		vm['$el'].querySelector('.btn').click();
		
		Vue.nextTick(() => {
			expect(vm['$el'].querySelector('.text').textContent).to.contain('5');
			done();
		});
		
		

	});

});