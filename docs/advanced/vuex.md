# Vuex (Vue 1.0)

> Currently `vuex` supports is only works for `Vue 1.0` only.

In the same manner, you can use `Getter` and `Action` decorator as vuex attribute.

```typescript
import * as Vue from 'vue'
import * as Vuex from 'vuex'
import { Component, Getter, Action } from 'vue-typed'

Vue.use(Vuex);

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
  addCount: ({dispatch, state}, num) =>{
    dispatch('INCREMENT', num)
  }
}

const store = new Vuex.Store({
  state,
  mutations
})


// Component -------------------------------------------------

@Component({
  template: '<div id="foo"><div class="text">{{count}}</div><button @click="add()" class="btn">test</button></div>',
  store: store
})
class Foo {
  
  @Getter(actions.getCount)
  count: number
  
  // declare empty function with appropriate parameter(s) to hook vuex action
  @Action(actions.addCount)
  increment(num) {}
  
  add() {
    this.increment(5);
  }

}
```

See live demo [here](http://embed.plnkr.co/Ibp240/).