import { expect } from 'chai'
import Vue from 'vue'
import { Component, GlobalMixin, Prop, Virtual } from '../../../dist/index'

describe('global mixins', () => {
  it('should be ok', () => {
    let globalMixinCreated = false
    let globalMethodInvoked = false

    interface IGlobal {
      globalMethod(): void
    }

    @GlobalMixin()
    class Global extends Vue implements IGlobal {
      globalData = 'global data'
      @Prop() globalProp = 'global prop'

      created() {
        globalMixinCreated = true
      }

      globalMethod(): void {
        globalMethodInvoked = true
      }
    }

    @Component()
    class MyComp extends Virtual<Global>() {
      created() {
        this.globalMethod()
      }
    }

    const c: any = new MyComp()

    expect(globalMixinCreated).eq(true)
    expect(globalMethodInvoked).eq(true)
    expect(c['$options']['data']())
      .to.have.property('globalData')
      .that.equals('global data')
    expect(c['$options']['props'])
      .to.have.property('globalProp')
      .have.property('default')
      .that.equals('global prop')
  })
})
