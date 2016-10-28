# Watch
Vue allows you to observe the data changes through [$watch](http://vuejs.org/api/#watch). To do it in VueTyped you just simply need to add function in your class decorated with **`Watch`** decorator like this:

```typescript
import { Component, Watch } from 'vue-typed'

@Component({
  template: `
  <div>
    <div>Total clicks: {{info.msg.length}}</div>
    <div>Counter: {{counter}}</div>
    <button v-on:click="addCounter">Add</button>
    <ul>
      <li v-for="i in info.msg">{{i}}</li>
    </ul>
  </div>
	`
})
export class App {  
  counter:number = 1;
    
  info = {
    clicks: 0,
    msg: []
  }
  
  addCounter() {
    console.log('click')
    this.counter += 1;
  }
  
  @Watch('counter')
  onCounterChange(newValue:number, oldValue:number) {
    this.info.msg.push( oldValue + ' -> ' + newValue );
  }

  // deep watch
  @Watch('info', true)
  onInfoChange(newValue, oldValue) {
    console.log('info changed: ', newValue, oldValue);
  }
}
```