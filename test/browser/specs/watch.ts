import { Component, Watch } from '../../../dist/index';
import { expect } from 'chai';
import * as Vue from 'vue';


describe('watch decorator', () => {


	it('it should be able to observe data changes', (done) => {


		@Component({
			template: `
				<div>
					<div>{{data1}}</div>
					<div>{{data2}}</div>
					<div id="result">{{info}}</div>
					
					<button id="btn1" v-on:click='changeData1'>Change Data 1</button>
					<button id="btn2" v-on:click='changeData2'>Change Data 2</button>
				</div>
				`
		})
		class Watcher {
			data1: string = 'Hello!';

			data2: number = 1;

			info: string|any = undefined;

			changeData1() {
				this.data1 = 'Hola!';
			}

			changeData2() {
				this.data2 += 1;
			}

			@Watch('data1')
			spyData1(newValue: string, oldValue: string) {
				this.info = oldValue + ' -> ' + newValue;
			}

			@Watch('data2')
			spyData2(newValue: number, oldValue: number) {
				this.info = oldValue + ' -> ' + newValue;
			}
		}
		
		var vm = (new Watcher())['$mount']();
		
		
		vm['$el'].querySelector('#btn1').click();
		Vue.nextTick(()=>{
			expect(vm['$el'].querySelector('#result').textContent, 'observe data 1').to.contain('Hello! -> Hola!');

			vm['$el'].querySelector('#btn2').click();
			Vue.nextTick(() => {
				expect(vm['$el'].querySelector('#result').textContent, 'observe data 2').to.contain('1 -> 2');

				done();
			});


		});

	});



	it('it should be able to observe deep data changes', (done) => {

		class Foo {
			constructor(title: string){
				this.title = title;
			}

			title: string | any = undefined
		}


		@Component({
			template: `
				<div>
					<div id="result">{{info}}</div>
					
					<button id="btn1" v-on:click='changeData1'>Add Data</button>
					<button id="btn2" v-on:click='changeData2'>Change Data</button>
				</div>
				`
		})
		class Watcher {
			data: Foo[] = [ new Foo('Hello!') ];

			info: string | any = undefined;

			changeData1() {
				this.data[0].title = 'Hi!';
			}

			changeData2() {
				this.data.push(new Foo('Hola!'));				
			}

			@Watch('data', true)
			spyData(newValue: Foo[]) {
				this.info = newValue[newValue.length - 1].title + ' - ' + newValue.length;
			}
		}
		
		var vm = (new Watcher())['$mount']();
		
		
		vm['$el'].querySelector('#btn1').click();
		Vue.nextTick(()=>{
			expect(vm['$el'].querySelector('#result').textContent, 'observe data 1').to.contain('Hi! - 1');

			vm['$el'].querySelector('#btn2').click();
			Vue.nextTick(() => {
				expect(vm['$el'].querySelector('#result').textContent, 'observe data 2').to.contain('Hola! - 2');

				done();
			});


		});

	});

	


});