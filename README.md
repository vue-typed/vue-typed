# VueTyped

[![vue-typed](https://vue-typed.github.io/vue-typed/images/logo.png)](http://vue-typed.github.io/vue-typed/)


 > **VueTyped** contains sets of [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) / [Typescript](typescriptlang.org) [decorators](https://github.com/wycats/javascript-decorators/blob/master/README.md) that helps you write **[Vue](vuejs.org)** component easily.


[![npm version](https://badge.fury.io/js/vue-typed.svg)](https://badge.fury.io/js/vue-typed)
[![Build status](https://ci.appveyor.com/api/projects/status/mdilb673cxwl903q/branch/master?svg=true)](https://ci.appveyor.com/project/vue-typed/vue-typed/branch/master)
[![Build Status](https://travis-ci.org/vue-typed/vue-typed.svg?branch=master)](https://travis-ci.org/vue-typed/vue-typed)
[![GitHub issues](https://img.shields.io/github/issues/vue-typed/vue-typed.svg)](https://github.com/vue-typed/vue-typed/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/vue-typed/vue-typed/master/LICENSE) 


## What is this for?

Normaly you wrote **[Vue](vuejs.org)** application like this: 

```javascript
new Vue({
  template: 
  `<div>
    <input type="text" v-model="message">
    <button v-on:click="clear">Clear</button>
    <div>{{status}}</div>
  </div>`,
  data: function() {
    return {
      message: 'Hello!'
    }
  },
  computed: {
    status: function() {
      return this.message.length < 15 ? 'Too short... type some more...' : 'Alright, stop typing now..'
    }
  },
  methods: {
    clear: function() {
      this.message = ''
    }
  }
}).$mount('#app')
```

> See live demo [here](https://jsfiddle.net/budiadiono/57vdh9vf/)

It could be mess if you bring the code above in **[Typescript](typescriptlang.org)** world. The usage of keyword `this` could lead unexpected error.
**VueTyped** makes you possible to write **Vue** with **Typescript** or **ES6** with no hassle. **VueTyped** insipired by **[vue-class-component](https://github.com/vuejs/vue-class-component)**.

With **VueTyped** you'll write code above in **Typescript** like this:

```typescript
import * as Vue from 'vue'
import { Component } from 'vue-typed'

@Component({
  template: `
  <div>
    <input type="text" v-model="message">
    <button v-on:click="clear">Clear</button>
    <div>{{status}}</div>
  </div>`,
}) 
class App extends Vue {
  message:string = 'Hello!'
  
  get status() {
    return this.message.length < 15 ? 'Too short... type some more...' : 'Alright, stop typing now..'
  }
  
  clear() {
    this.message = ''
  }
}

new App().$mount('#app')
```

> See live demo [here](https://plnkr.co/edit/Ld0Rpu)


## Installation  

## NPM
```bash
$ npm install vue-typed
```

## Bower
```bash
$ bower install vue-typed
```

## CLI
If you are start with a new project, then it's good to use [vue-typed-boilerplate](https://github.com/budiadiono/vue-typed-boilerplate) to scaffold your new project.
This boilerplate setup [typescript](typescriptlang.org) project using [webpack](http://webpack.github.io/) as the module bundler.

```bash
$ npm install -g vue-cli
$ vue init vue-typed/vue-typed-boilerplate my-project
$ cd my-project
$ npm install
$ npm start
```


## Compatibility

**Vue 2.0** or above

> For older Vue supports please refer to [VueTyped 2.0.1](https://github.com/vue-typed/vue-typed/tree/v2.0.1).

**Typescript 2.2.2** or above



## License

[MIT](https://github.com/vue-typed/vue-typed/blob/master/LICENSE)