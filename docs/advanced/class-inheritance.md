# Class Inheritance

Inheritance in `Vue` is done by calling `Vue.extend()` method : 

```javascript
var Parent = Vue.extend({
  data: function() {
    return {
      foo: 'This is foo!'
    }
  }
})

var Child = Parent.extend({
  template: '<div>{{foo}} {{bar}}</div>',
  data: function() {
    return {
      bar: 'This is bar!'
    }
  }
})
```

With `VueTyped` you can extend component using common object-oriented patterns :

```typescript
@Component()
class Parent {
    foo: string = 'This is foo!'
} 

@Component({ template: '<div>{{foo}} {{bar}}</div>' })
class Child extends Parent {
    bar: string = 'This is bar!'
}
```  

See live demo [here](http://embed.plnkr.co/3o8enK/) or [here](http://embed.plnkr.co/S3XEbG/).