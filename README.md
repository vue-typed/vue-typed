# Vue Typed

**The [vue-class-component](https://github.com/vuejs/vue-class-component) in typescript favor**

[![Build status](https://ci.appveyor.com/api/projects/status/mdilb673cxwl903q/branch/master?svg=true)](https://ci.appveyor.com/project/budiadiono/vue-typed/branch/master) [![Build Status](https://travis-ci.org/budiadiono/vue-typed.svg?branch=master)](https://travis-ci.org/budiadiono/vue-typed) [![GitHub issues](https://img.shields.io/github/issues/budiadiono/vue-typed.svg)](https://github.com/budiadiono/vue-typed/issues) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/budiadiono/vue-typed/master/LICENSE) 

[![NPM](https://nodei.co/npm/vue-typed.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/vue-typed/)



Fingers crossed, this module will help you to write vue-js application in typescript heavenly!

## Basic Usage
### Component and Data Decorator

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

### Methods

All methods in `Component` class decorated will become part of `methods` attributes.

```
@Component({
  template: '<div><div id="text">{{text}}</div><button id="btn" v-on:click="greet">Greet</button></div>'
})
class Foo {
  
  @Data()
  text: string
  
  constructor() {
    this.text = 'foo'
  }

  greet() {
    this.text = 'hello foo!'
  }
}
```

Code above is equivalent to:

```
Vue.extend({
  template: '<div><div id="text">{{text}}</div><button id="btn" v-on:click="greet">Greet</button></div>',
  data: function () {
    return { text: 'foo' }
  },
  methods: {
    greet: function () {
      this.text = 'hello foo!'
    }
  }
})
```

### Props

You can use `Props` decorator to have props in your class. 

```
@Component()
class MyComp {

  // simple props
  @Props()
  message: string

  // props with options (you can put all official Vue props options here)
  @Props({
    default: 'meh',
    type: String
  })
  message2: any

  // props with default value assigned from constructor
  @Props()
  message3: string

  // props with default value assigned inline
  @Props()
  message4: string = 'yeah'

  // props with options and default value assigned inline
  @Props({				
    type: String
  })
  message5: any = 'foo'

  // props with default value assigned both inline/constructor and in options
  // you should avoid this way - however default value assigned in options will be use.
  // if you do this, then you'll see warning in the console.  
  @Props({				
    type: String,
    default: "I'm win"
  })
  message6: any = 'kick'

  constructor() {
    this.message3 = 'what'
  }

}
```



## Vuex
### Getter and Action Decorator

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
