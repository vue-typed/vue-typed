# Vue Typed

[![Build status](https://ci.appveyor.com/api/projects/status/mdilb673cxwl903q/branch/master?svg=true)](https://ci.appveyor.com/project/budiadiono/vue-typed/branch/master) [![Build Status](https://travis-ci.org/budiadiono/vue-typed.svg?branch=master)](https://travis-ci.org/budiadiono/vue-typed)

**The [vue-class-component](https://github.com/vuejs/vue-class-component) in typescript favor**

Fingers crossed, this module will help you to write vue-js application in typescript heavenly!

## Usage
## Component and Data Decorator

```
import { Component, Data } from 'vue-typed'

@Component({
  template: '<div id="foo"><div class="text">{{text}}</div></div>'
})
class Foo {
  
  @Data()
  text: string
  
  constructor() {
    this.text = 'foo'
  }
}

```

All properties marked with `@Data()` decorator will become part of `data()` attributes. So, in javascript traditional vue component, code above equals to:

```
var Foo = Vue.extend({
  template: '<div id="foo"><div class="text">{{text}}</div></div>',
  data: function () {
    return { text: 'foo' }
  }
})

``` 

### Vuex Supports (Getter and Action Decorator)

In the same manner, you can use `Getter` and `Action` decorator as vuex attribute.

```
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

## License

[MIT](https://github.com/budiadiono/vue-typed/blob/master/LICENSE)
