import { expect } from 'chai'
import Vue from 'vue'
import { Component, Prop } from '../../../dist/index'

describe('props decorator', () => {
  it('it should be able to do simple binding', () => {
    @Component({
      template: '<div><div id="text">{{foo}}</div></div>'
    })
    class Foo extends Vue {
      @Prop() foo: string = 'meh'
    }

    const vm = new Vue({
      template: '<div><bar id="meh" foo="foo props is here"></bar></div>',
      components: {
        bar: Foo
      }
    }).$mount()

    const node = vm.$el.querySelector('#meh')
    expect(node && node.textContent).to.contain('foo props is here')
  })
})
