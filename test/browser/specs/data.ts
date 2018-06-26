import { expect } from 'chai'
import { Component } from '../../../dist/index'

describe('data decorator', () => {
  it('it should be able to do simple binding', () => {
    @Component({
      template: '<div id="foo"><div class="text">{{text}}</div></div>'
    })
    class Foo {
      text: string

      constructor() {
        this.text = 'foo'
      }
    }

    const vm = new Foo()['$mount']()
    const node = vm['$el'].querySelector('.text')

    expect(node && node.textContent).to.contain('foo')
  })
})
