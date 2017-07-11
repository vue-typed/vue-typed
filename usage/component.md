# Component

Is a decorator that converts your `class` into **Vue** instance constructor.

```typescript
@Component({ 
  template: '<span>{{ message }}</span>'
  /* ... other vue component options ... */
})
class Foo {
  message: string = 'hello'
}
```

is equivalent to

```javascript
var Foo = Vue.extend({
    template: '<span>{{ message }}</span>',
    data: {
      message: 'hello'
    } 
    /* ... other vue component options ... */ 
  })
```

> Note: This decorator is to create a Vue instance constructor. To use it, you have to manually register it as a Vue component or use `new` keyword to make it as Vue instance.

## Global Registration

```typescript
Vue.component('my-foo', Foo);

new Vue({
  el: '#app'
})
```

## Local Registration

```typescript
new Vue({
  el: '#app',
  components: {
    'my-foo': Foo
  }
})
```

## As Main Vue Instance
```typescript
new Foo().$mount('#your-main-element-id') 
```
