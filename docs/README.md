#<center>VueTyped</center>
<p align="center">
	<img src="images/logo.png" alt="vue-typed"/>
</p>

 **VueTyped** contains sets of [ECMAScript](https://en.wikipedia.org/wiki/ECMAScript) / [Typescript](http://www.typescriptlang.org) decorators that helps you write **[Vue](https://vuejs.org)** component easily. It would be something like this:


```typescript
import { Component } from 'vue-typed'

@Component({ 
	template: `
	<div>
		<input type="text" v-model="message">
		<button v-on:click="clear">Clear</button>
		<div>{{status}}</div>
	</div>`, 
}) 
class App {
	message:string = 'Hello!'

	get status() {
		return this.message.length < 15 ? 'Too short... type some more...' : 'Alright, stop typing now..'
	}

	clear() {
		this.message = ''
	}
}
```

> See live demo [here](http://embed.plnkr.co/QUh8YY/).

Thanks to **[vue-class-component](https://github.com/vuejs/vue-class-component)** for the inspiration! **Vue-Typed** adopted from this module.  