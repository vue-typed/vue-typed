import { expect } from 'chai'
import Vue from 'vue'
import { Component } from '../../../dist/index'

describe('methods and computed', () => {
  it('should take normal methods and getter setter', done => {
    @Component({
      template:
        '<div><div id="text">now: <span id="now">{{val}}</span>, next: <span id="next">{{next}}</span></div><button id="btn" v-on:click="inc">Inc</button></div>'
    })
    class Foo {
      val: number

      constructor() {
        this.val = 1
      }

      inc() {
        this.val += 1
      }

      get next() {
        return this.val + 1
      }
    }

    const vm = new Foo()['$mount']()

    // initial state
    expect(
      vm['$el'].querySelector('#now').textContent,
      'now 1st state'
    ).to.contain('1')
    expect(
      vm['$el'].querySelector('#next').textContent,
      'next 1st state'
    ).to.contain('2')

    // click
    vm['$el'].querySelector('#btn').click()

    Vue.nextTick(() => {
      // clicked
      expect(
        vm['$el'].querySelector('#now').textContent,
        'now 2nd state'
      ).to.contain('2')
      expect(
        vm['$el'].querySelector('#next').textContent,
        'next 2nd state'
      ).to.contain('3')

      done()
    })
  })
})
