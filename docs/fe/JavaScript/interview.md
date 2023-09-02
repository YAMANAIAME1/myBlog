# 8 月面试汇总

## 目前最近的一个项目是做什么？

::: tip 答:

1. 最近是做一个 H5 的移动端的问诊平台开发 vue3 + ts

:::

## 在开发过程中有遇到什么难题？

::: tip 答:

1. 移动端适配问题，通过 vue 辅助 vue/use 插件 获取当前用户手机设备宽度 动态调整滑块宽度

:::

## vue 常见的哪些的东西？

## vue2 和 vue3 的逻辑复用

### `vue2 mixins`

在 vue2 中，我通常会使用 mixin 来复用代码，在多个组件里复用相同的逻辑，在组件中使用 mixin 时，mixin 对象中的所有选项都会混合到组件自己对应的选项里。当组件和 mixin 对象含有同名选项时，这些选项会合并。

```js
// 定义一个mixin对象
var mixin = {
  data: function () {
    return {
      message: 'hello',
      foo: 'abc'
    }
  }
}

// 定义一个使用mixin对象的组件
new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: 'goodbye',
      bar: 'def'
    }
  },
  created: function () {
    console.log(this.$data)
    // => { message: "goodbye", foo: "abc", bar: "def" }
  }
})
```

vue2 的 mixins 有很多让人诟病的地方，mixins 的深度合并非常隐式，这让代码逻辑更难理解和调试，具体表现为如下几点：

1. mixins 容易冲突：因为每个特性的属性都被合并到同一个组件中，组件内同名的属性或方法会把 mixins 里的覆盖掉。

2. 可重用性有限：不能向 mixins 传递任何参数来改变它的逻辑，这降低了它们在抽象逻辑方面的灵活性。

3. 数据来源不清晰：组件里所使用的 mixins 里的数据或方法在当前组件代码里搜索不到，易造成错误的解读，比如被当成错误代码或冗余代码而误删。

### `vue3 自定义 hooks`

vue3 的 Composition Api 中，有点像 react，可以用自定义 hooks 来实现逻辑复用，“以函数形式抽离一些可复用的方法像钩子一样挂着，随时可以引入和调用，实现高内聚低耦合的目标”，总结一下就是：

1. 将可复用功能抽离为外部 js 文件
2. 函数名/文件名以 use 开头，形如：useXXX
3. 引用时将响应式变量或者方法显式解构暴露出来如：const {nameRef，Fn} = useXX()

例子：

```js
// useCounter.js
import { ref, computed } from 'vue'

export default function () {
  const count = ref(0)
  const double = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  return {
    count,
    double,
    increment
  }
}

// App.vue
<template>
  <p>{{ count }}</p>
  <p>{{ double }}</p>
  <button @click="increment">increment</button>
</template>

<script>
import useCounter from './useCounter'

export default {
  setup() {
    const { count, double, increment} = useCounter()
    return {
      count,
      double,
      increment
    }
  },
}
</script>
```

## vuex 与 pinna 有什么区别

::: tip 答:

- pinia 它没有 mutation,他只有 state，getters，action【同步、异步】使用他来修改 state 数据
- pinia 他默认也是存入内存中，如果需要使用本地存储，在配置上比 vuex 麻烦一点
- pinia 语法上比 vuex 更容易理解和使用，灵活。
- pinia 没有 modules 配置，没一个独立的仓库都是 definStore 生成出来的
- pinia state 是一个对象返回一个对象和组件的 data 是一样的语法

:::

## Vuex 和 Pinia 的优缺点

::: tip 答:

**`Pinia 的优点`**

- 完整的 TypeScript 支持：与在 Vuex 中添加 TypeScript 相比，添加 TypeScript 更容易
- 极其轻巧(体积约 1KB)
- store 的 action 被调度为常规的函数调用，而不是使用 dispatch 方法或 MapAction 辅助函数，这在 - - Vuex 中很常见
- 支持多个 Store
- 支持 Vue devtools、SSR 和 webpack 代码拆分

**`Pinia 的缺点`**

- 不支持时间旅行和编辑等调试功能

**`vuex 的优点`**

- 支持调试功能，如时间旅行和编辑

- 适用于大型、高复杂度的 Vue.js 项目

**`vuex 的缺点`**

- 从 Vue 3 开始，getter 的结果不会像计算属性那样缓存

- Vuex 4 有一些与类型安全相关的问题

**`何时使用 Pinia，何时使用 Vuex`**

- 由于 Pinea 是轻量级的，体积很小，它适合于中小型应用。它也适用于低复杂度的 Vue.js 项目，因为一些调试功能，如时间旅行和编辑仍然不被支持。
- 将 Vuex 用于中小型 Vue.js 项目是过度的，因为它重量级的，对性能降低有很大影响。因此，Vuex 适用于大规模、高复杂度的 Vue.js 项目。

:::
::: tip
**pinia 和 vuex 在 vue2 和 vue3 都可以使用，一般来说 vue2 使用 vuex,vue3 使用 pinia。**
:::

## 什么是 promise?

::: tip

Promise 是 JavaScript 中用于处理异步操作的一种机制。它是一种表示异步操作最终完成或失败的对象，可以用来简化异步编程。
Promise 对象有三种状态：

1. Pending（进行中）：初始状态，表示异步操作正在进行中。

2. Fulfilled（已完成）：异步操作成功完成，返回了结果。

3. Rejected（已失败）：异步操作失败，返回了错误信息。
4. Promise 对象具有以下特点：

5. Promise 对象是不可变的，一旦状态从 Pending 转变为 Fulfilled 或 Rejected，就不能再改变。

6. Promise 对象可以通过调用 resolve()方法将状态从 Pending 转变为 Fulfilled，表示异步操作成功完成并返回结果。

7. Promise 对象可以通过调用 reject()方法将状态从 Pending 转变为 Rejected，表示异步操作失败并返回错误信息。

8. 可以通过调用 then()方法来处理异步操作的结果，根据 Promise 的状态执行相应的回调函数。

9. Promise 对象可以通过链式调用 then()方法来实现多个异步操作的顺序执行，每个 then()方法返回一个新的 Promise 对象。
   使用 Promise 可以更清晰地表达异步操作的流程，避免了回调地狱（callback hell）的问题。它提供了更灵活、可读性更高的异步编程方式，使代码更易于理解和维护。
   在现代的 JavaScript 开发中，Promise 被广泛应用于处理网络请求、文件读写、定时器等需要异步处理的场景，同时也是许多其他 JavaScript 异步库和框架的基础。
   :::

## 数组循环有哪些方法,他们的作用?

::: tip 参考文档

- [MDN-Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [ECMAScript6 入门-Array](https://es6.ruanyifeng.com/#docs/array)

:::

![](https://static.vue-js.com/5842e560-67b6-11eb-85f6-6fac77c0c9b3.png)

### 一、操作方法

数组基本操作可以归纳为 增、删、改、查，需要留意的是哪些方法会对原数组产生影响，哪些方法不会下面对数组常用的操作方法做一个归纳

#### 增

::: tip

下面前三种是对原数组产生影响的增添方法，第四种则不会对原数组产生影响

- push()
- unshift()
- splice()
- concat()

:::

##### push()

`push()`把一个或多个元素添加到数组的末尾，并返回新的数组长度

```js
let foods = ['西兰花', '花菜']
let length = foods.push('西红柿')
console.log(length)
// 输出:3
console.log(foods)
// 输出: ['西兰花','花菜','西红柿']
foods.push('西瓜', '南瓜', '北瓜', '冬瓜')
console.log(foods)
// 输出: ['西兰花', '花菜', '西红柿', '西瓜', '南瓜', '北瓜', '冬瓜']
```

##### unshift()

`unshift()`将一个或者多个元素添加到数组的开头，并返回数组的新长度

```js
let list = [] // 创建一个数组
let newList = list.unshift('red', 'green') // 推入两项
console.log(newList) // 2
```

##### splice()

传入三个参数，分别是开始位置、0（要删除的元素数量）、插入的元素，返回空数组

```js
let list = ['red', 'green', 'blue'] // 创建一个数组
let newList = list.splice(1, 0) // 从下标1开始，删除一个元素
console.log(newList) // []
```

##### concat()

首先会创建一个当前数组的副本，然后再把它的参数添加到副本末尾，最后返回这个新构建的数组，不会影响原始数组

```js
let list = ['red', 'green', 'blue']
let list1 = ['black', 'brown']
let newList = list.concat(list1)
console.log(newList) // ['red', 'green', 'blue','black', 'brown']
```

#### 删

::: tip

下面三种都会影响原数组，最后一项不影响原数组：

- pop()
- shift()
- splice()
- slice()

:::

##### pop()

`pop() `方法用于删除数组的最后一项，同时减少数组的 length 值，返回被删除的项

```js
let list = ['red', 'green', 'blue']
let item = list.pop()
console.log(list.length) // 2
console.log(item) // blue
```

##### shift()

`shift()`方法用于删除数组的第一项，同时减少数组的 length 值，返回被删除的项

```js
let list = ['red', 'green']
let item = list.shift()
console.log(list.length) // 1
console.log(item) // red
```

##### splice()

传入两个参数，分别是开始位置，删除元素的数量，返回包含删除元素的数组

```js
let list = ['red', 'green', 'blue']
let newList = list.splice(1, 1)
console.log(list) // ['red', 'blue']
console.log(newList) // ['green']
```

##### slice()

`slice()` 用于创建一个包含原有数组中一个或多个元素的新数组，不会影响原始数组

```js
let list = ['red', 'green', 'blue', 'yellow', 'black']
let newList = list.slice(2)
console.log(list) // ['red', 'green', 'blue', 'yellow', 'black']
console.log(newList) // ['blue', 'yellow', 'black']
```

#### 改

::: tip

即修改原来数组的内容，常用 splice

:::

##### splice()

传入三个参数，分别是开始位置，要删除元素的数量，要插入的任意多个元素，返回删除元素的数组，对原数组产生影响

```js
let list = ['red', 'green', 'blue']
let newList = list.splice(1, 1, 'yellow', 'black')
console.log(list) // ['red', 'blue','yellow', 'black']
console.log(newList) // ['green']
```

#### 查

::: tip
即查找元素，返回元素坐标或者元素值

- indexOf()
- includes()
- find()
- findIndex()
- lastIndexOf()

:::

##### indexOf()

返回在数组中可以找到的符合条件的第一个索引值，如果不存在，返回-1

```js
let list = ['red', 'green', 'blue']
let resultIndex = list.indexOf('yellow')
console.log(newList) // -1
```

##### includes()

返回数组中是否存在指定的值，如果存在返回 true，否则返回 false

```js
let list = ['red', 'green', 'blue']
let result = list.includes('blue')
console.log(newList) // true
```

##### find()

返回满足提供的回调函数校验的第一个元素的值，如果都不满足，返回 undefined 回调函数会接收三个参数，分别为

- `element`
  当前元素。
- `index`
  当前元素的索引。
- `array`
  调用 `find` 的数组。

```js
let foods = ['西兰花', '西瓜', '椒盐', '剁椒']
console.log(
  foods.find((v) => {
    return v.indexOf('椒') != -1
  })
)
// 输出: 椒盐
console.log(
  foods.find((v) => {
    return v.indexOf('花菜') != -1
  })
)
// 输出: undefined
```

##### findIndex()

返回数组中满足提供的回调函数校验的第一个元素的索引，否则返回-1 回调函数会接收三个参数，分别为

- `element`
  当前元素。
- `index`
  当前元素的索引。
- `array`
  调用 `findIndex` 的数组。

```js
let foods = [
  { name: '西兰花', color: '绿' },
  { name: '辣椒', color: '红' },
  { name: '花菜', color: '白' }
]
console.log(
  foods.findIndex((v) => {
    return v.color == '白'
  })
)
// 输出: 2
console.log(
  foods.findIndex((v) => {
    return v.color == '黄'
  })
)
// 输出: -1
```

##### lastIndexOf()

从后往前查找符合条件的元素，符合返回索引，如果不存在，返回-1

```js
let foods = ['西兰花', '西瓜', '西兰花']
console.log(foods.lastIndexOf('西兰花'))
// 输出: 2
console.log(foods.lastIndexOf('花菜'))
// 输出: -1
```

### 二、排序方法

::: tip
数组有两个方法可以用来对元素重新排序：

- reverse()
- sort()

:::

#### reverse()

将数组进行翻转，并返回该数组。注意：改变的是原始数组

```js
let foods = ['西兰花', '花菜']
foods.reverse()
console.log(foods)
// 输出: ['花菜','西兰花']
```

#### sort()

对数组的元素进行排序，并返回数组。默认比较的数组元素转为字符串的 utf-16 的顺序，也可以传入函数进行排序

```js
let numArr = [6, 2, 7, 1, 4, 9]
console.log(numArr.sort())
// 输出: [1,2,4,6,7,9]
let letterArr = ['e', 'c', 'z', 'd', 'f']
console.log(letterArr.sort())
// 输出 ['c','d','e','f','z']
let personArr = [
  { name: 'jack', age: 25 },
  { name: 'rose', age: 13 },
  { name: 'lucy', age: 20 }
]
console.log(
  // a 和 b 就是数组中比较的元素
  personArr.sort((a, b) => {
    // 返回的 小于 0 和等于0 a继续在b之前
    // 返回的 大于 0 a 和 b 的位置会调换
    return a.age - b.age
  })
)
// 按照 年龄 进行升序排列,如果希望倒序，可以调换位置
```

### 三、转换方法

常见的转换方法有：

#### join()

把数组转换为字符串，通过给定的字符进行连接，默认是,

```js
let foods = ['西瓜', '南瓜', '北瓜']

console.log(foods.join())
// 输出: "西瓜,南瓜,北瓜"

console.log(foods.join(''))
// 输出: "西瓜南瓜北瓜"

console.log(foods.join('-'))
// 输出: "西瓜-南瓜-北瓜"
```

### 四、迭代方法

::: tip
常用来迭代数组的方法（都不改变原数组）有如下：

- some()
- every()
- forEach()
- filter()
- map()

:::

#### some()

和 every 类似，只需要有任意一个元素满足回调函数的校验条件结果就是 true，都不满足就是 false 回调函数会接收三个参数，分别为

- `element`
  当前元素。
- `index`
  当前元素的索引。
- `array`
  调用 `some` 的数组。

```js
let numArr = [2, 5, 6, 7, 8, 9]
console.log(
  numArr.some((v) => {
    return v == 1
  })
)
// 输出: false
console.log(
  numArr.some((v) => {
    return v == 2
  })
)
// 输出: true
```

#### every()

检验数组中的每个值是否都满足回调函数的校验，都满足结果为 true，反之为 false 回调函数会接收三个参数，分别为

- `element`
  当前元素。
- `index`
  当前元素的索引。
- `array`
  调用 `every` 的数组。

```js
let numArr = [2, 5, 6, 7, 8, 9]
console.log(
  numArr.every((v) => {
    return v > 2
  })
)
// 输出: false
console.log(
  numArr.every((v) => {
    return v >= 2
  })
)
// 输出: true
```

#### forEach()

将数组的每一个元素，挨个的传递给传入的回调函数回调函数会接收三个参数，分别为

- `element`
  当前元素。
- `index`
  当前元素的索引。
- `array`
  调用 `forEach` 的数组。

```js
let foods = ['西兰花', '西瓜', '西兰花']
foods.forEach((v) => {
  console.log(v)
})
// 依次输出: 西兰花 西瓜 西兰花
```

#### filter()

返回一个新的数组，新数组的元素是数组中每个元素调用一个提供的函数，根据返回值的真假决定是否保留回调函数会接收三个参数，分别为

- `element`
  当前元素。
- `index`
  当前元素的索引。
- `array`
  调用 `filter` 的数组。

```js
let foods = ['西兰花', '西瓜', '花椒', '剁椒']
console.log(
  foods.filter((v) => {
    return v.indexOf('西') == 0
  })
)
// 输出: ['西兰花', '西瓜']
```

#### map()

返回一个新的数组，新数组的元素，是数组中每个元素调用一个提供的函数后返回的结果回调函数会接收三个参数，分别为

- `element`
  当前元素。
- `index`
  当前元素的索引。
- `array`
  调用 `map` 的数组。

```js
let foods = ['西兰花', '西瓜']
let newFoods = foods.map((v) => {
  return v + '好好吃'
})
console.log(foods)
// 输出: ['西兰花', '西瓜']
console.log(newFoods)
// 输出: ['西兰花好好吃', '西瓜好好吃']
```

## js 为什么是单线程?

JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。那么，为什么 JavaScript 不能有多个线程呢？这样能提高效率啊。

JavaScript 的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript 的主要用途是与用户互动，以及操作 DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定 JavaScript 同时有两个线程，一个线程在某个 DOM 节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？

所以，为了避免复杂性，从一诞生，JavaScript 就是单线程，这已经成了这门语言的核心特征，将来也不会改变。

为了利用多核 CPU 的计算能力，HTML5 提出 Web Worker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM。所以，这个新标准并没有改变 JavaScript 单线程的本质。

### `js 的异步`

JS 是一门单线程的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个。

而渲染主线程承担着诸多的工作，渲染页面、执行 JS 都在其中运行。

如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程白白的消耗时间，另一方面导致页面无法及时更新，给用户造成卡死现象。

所以浏览器采用异步的方式来避免。具体做法是当某些任务发生时，比如计时器、网络、事件监听，主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续代码。当其他线程完成时，将事先传递的回调函数包装成任务，加入到消息队列的末尾排队，等待主线程调度执行。

在这种异步模式下，浏览器永不阻塞，从而最大限度的保证了单线程的流畅运行。
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/21/15fdd88994142347~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)

### `事件循环`

事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。

在 Chrome 的源码中，它开启一个不会结束的 for 循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可。

过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。

根据 W3C 官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行。
![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2017/11/21/15fdcea13361a1ec~tplv-t2oaga2asx-zoom-in-crop-mark:1512:0:0:0.awebp)

## 深浅拷贝的理解?

### 一、数据类型存储

**JavaScript**中存在两大数据类型：

- 基本类型
- 引用类型

基本类型数据保存在栈内存中
引用类型数据保存在堆内存中，引用数据类型的变量是一个指向堆内存中实际对象的引用，存在栈中

### 二、 浅拷贝

浅拷贝，指的是创建新的数据，这个数据有着原始数据属性值的一份精准拷贝

如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址

即浅拷贝是拷贝一层，深层次的引用类型则是共享内存地址

看代码

```js
function shallowClone(obj) {
  const newObj = {}
  for (let prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      newObj[prop] = obj[prop]
    }
  }
  return newObj
}
```

在**JavaScript**中，存在浅拷贝的现象有：

- **Object.assign**
- **Array.prototype.slice()**, **Array.prototype.concat()**
- 使用拓展运算符实现的复制

#### `Object.assign`

```js
var obj = {
  age: 18,
  nature: ['smart', 'good'],
  names: {
    name1: 'fx',
    name2: 'xka'
  },
  love: function () {
    console.log('fx is a great girl')
  }
}
var newObj = Object.assign({}, fxObj)
```

#### `slice()`

```js
const fxArr = ['One', 'Two', 'Three']
const fxArrs = fxArr.slice(0)
fxArrs[1] = 'love'
console.log(fxArr) // ["One", "Two", "Three"]
console.log(fxArrs) // ["One", "love", "Three"]
```

#### `concat()`

```js
const fxArr = ['One', 'Two', 'Three']
const fxArrs = fxArr.concat()
fxArrs[1] = 'love'
console.log(fxArr) // ["One", "Two", "Three"]
console.log(fxArrs) // ["One", "love", "Three"]
```

#### `拓展运算符`

```js
const fxArr = ['One', 'Two', 'Three']
const fxArrs = [...fxArr]
fxArrs[1] = 'love'
console.log(fxArr) // ["One", "Two", "Three"]
console.log(fxArrs) // ["One", "love", "Three"]
```

### 三、深拷贝

深拷贝开辟一个新的栈，两个对象属完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

常见的深拷贝方式有：

- lodash.cloneDeep()

- jQuery.extend()

- JSON.stringify()

- 手写循环递归

- structuredClone

- MessageChannel

#### `lodash.cloneDeep()`

```js
const lodash = require('lodash')
const obj1 = {
  a: 1,
  b: { f: { g: 1 } },
  c: [1, 2, 3]
}
const obj2 = lodash.cloneDeep(obj1)
console.log(obj1.b.f === obj2.b.f) // false
```

#### `jQuery.extend()`

```js
const $ = require('jquery')
const obj1 = {
  a: 1,
  b: { f: { g: 1 } },
  c: [1, 2, 3]
}
const obj2 = $.extend(true, {}, obj1)
console.log(obj1.b.f === obj2.b.f) // false
```

#### `JSON.stringify()`

```js
const obj1 = {
  name: 'maomao',
  props: { a: 1 }
}

const obj2 = JSON.parse(JSON.stringify(obj1))
obj2.name = '茂茂'
obj2.props.a++

obj1 // { name: 'maomao', props: { a: 1 } }
obj2 // { name: '茂茂', props: { a: 2 } }
```

`JSON.parse(JSON.stringify())` 存在明显的弊端：

- 只能序列化对象的可枚举的自有属性
- `undefined`、`Symbol`、任意函数将被忽略
- `NaN`、`Infinity` 、`-Infinity` 将被当成 `null` 处理
- `RegExp`、`Error`、`Set`、`Map` 等特殊对象，仅会序列化可枚举的属性（一般情况下即为空对象）
- `Date` 类型，转换后会调用 `toJSON` 转为字符串类型
- 循环引用的对象将报错

```js
const map = new Map()
map.set(1, 2) // Map: 0: {1 => 2}
const obj1 = {
  a: undefined,
  b: null,
  c: Symbol(),
  d: NaN,
  e: Infinity,
  f: -Infinity,
  g: map,
  h: new Date(),
  i: () => {}
}
Object.defineProperty(obj1, 'j', {
  value: 'string'
})

const obj2 = JSON.parse(JSON.stringify(obj1))

/** 源对象 obj1
{
  a: undefined,
  b: null,
  c: Symbol(),
  d: NaN,
  e: Infinity,
  f: -Infinity,
  g: Map(1) {1 => 2}
  h: Fri Mar 10 2023 22:41:08 GMT+0800 (中国标准时间) {},
  i: () => {},

  j: 'string'
}
**/

/** 新对象 obj2
{
  b: null,
  d: null,
  e: null,
  f: null,
  g: {},
  h: '2023-03-10T14:41:08.110Z'
}
**/
```

#### `循环递归`

```js
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null) return obj // 如果是null或者undefined我就不进行拷贝操作
  if (obj instanceof Date) return new Date(obj)
  if (obj instanceof RegExp) return new RegExp(obj)
  // 可能是对象或者普通的值  如果是函数的话是不需要深拷贝
  if (typeof obj !== 'object') return obj
  // 是对象的话就要进行深拷贝
  if (hash.get(obj)) return hash.get(obj)
  let cloneObj = new obj.constructor()
  // 找到的是所属类原型上的constructor,而原型上的 constructor指向的是当前类本身
  hash.set(obj, cloneObj)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 实现一个递归拷贝
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}
```

#### `structuredClone`

> `HTML` 规范标准的 [Web API](https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone)

```js
const original = { name: 'MDN' }
original.itself = original

const clone = structuredClone(original)

console.assert(clone !== original) // the objects are not the same (not same identity)
console.assert(clone.name === 'MDN') // they do have the same values
console.assert(clone.itself === clone) // and the circular reference is preserved
```

`HTML` 规范的标准提案，使用结构化克隆算法将给定的值进行深拷贝，支持循环引用。还可以使用

`structuredClone(value, { transfer })` 调用方式使可转移对象仅被传递，不被克隆（直接移动源数据）

::: tip 注意点
尽管作为规范标准实现的 Web API，但目前兼容性还是个巨大的问题，同时仍有其他不足：

- 无法拷贝对象的原型链
- 无法拷贝函数
- 不支持 Error 数据类型

:::

#### `MessageChannel`

`vue.nextTick` 源码曾使用的 `Web API`，在了解这个 `API` 时发现可以用于深拷贝

```js
function cloneUsingChannel(obj) {
  return new Promise((resolve) => {
    const channel = new MessageChannel()
    channel.port1.onmessage = (e) => resolve(e.data)
    channel.port2.postMessage(obj)
  })
}
```

但该方法存在一个缺陷，当拷贝对象带有函数属性时，将抛出错误：

```js
const obj1 = {
  fn: function () {}
}
const obj2 = cloneUsingChannel(obj1)
// Uncaught (in promise) DOMException: Failed to execute 'postMessage' on 'MessagePort': function () {} could not be cloned.
```

### 四、区别

下面首先借助两张图，可以更加清晰看到浅拷贝与深拷贝的区别

![](https://static.vue-js.com/d9862c00-69b8-11eb-ab90-d9ae814b240d.png)

从上图发现，浅拷贝和深拷贝都创建出一个新的对象，但在复制对象属性的时候，行为就不一样

浅拷贝只复制属性指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存，修改对象属性会影响原对象

```js
// 浅拷贝
const obj1 = {
  name: 'init',
  arr: [1, [2, 3], 4]
}
const obj3 = shallowClone(obj1) // 一个浅拷贝方法
obj3.name = 'update'
obj3.arr[1] = [5, 6, 7] // 新旧对象还是共享同一块内存

console.log('obj1', obj1) // obj1 { name: 'init',  arr: [ 1, [ 5, 6, 7 ], 4 ] }
console.log('obj3', obj3) // obj3 { name: 'update', arr: [ 1, [ 5, 6, 7 ], 4 ] }
```

但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象

```js
// 深拷贝
const obj1 = {
  name: 'init',
  arr: [1, [2, 3], 4]
}
const obj4 = deepClone(obj1) // 一个深拷贝方法
obj4.name = 'update'
obj4.arr[1] = [5, 6, 7] // 新对象跟原对象不共享内存

console.log('obj1', obj1) // obj1 { name: 'init', arr: [ 1, [ 2, 3 ], 4 ] }
console.log('obj4', obj4) // obj4 { name: 'update', arr: [ 1, [ 5, 6, 7 ], 4 ] }
```

##### 小结

前提为拷贝类型为引用类型的情况下：

- 浅拷贝是拷贝一层，属性为对象时，浅拷贝是复制，两个对象指向同一个地址

- 深拷贝是递归拷贝深层次，属性为对象时，深拷贝是新开栈，两个对象指向不同的地址

## 垃圾回收机制的理解?

#### 一、是什么

内存泄漏（Memory leak）是在计算机科学中，由于疏忽或错误造成程序未能释放已经不再使用的内存

并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，导致在释放该段内存之前就失去了对该段内存的控制，从而造成了内存的浪费

程序的运行需要内存。只要程序提出要求，操作系统或者运行时就必须供给内存

对于持续运行的服务进程，必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃

![内存占用图](https://static.vue-js.com/56d4bd90-821c-11eb-ab90-d9ae814b240d.png)

在 C 语言中，因为是手动管理内存，内存泄露是经常出现的事情。

```C
char * buffer;
buffer = (char*) malloc(42);

// Do something with buffer

free(buffer);
```

上面是 C 语言代码，malloc 方法用来申请内存，使用完毕之后，必须自己用 free 方法释放内存。

这很麻烦，所以大多数语言提供自动内存管理，减轻程序员的负担，这被称为"垃圾回收机制"

#### 二、垃圾回收机制

Javascript 具有自动垃圾回收机制（GC：Garbage Collecation），也就是说，执行环境会负责管理代码执行过程中使用的内存

> 原理：垃圾收集器会定期（周期性）找出那些不在继续使用的变量，然后释放其内存

通常情况下有两种实现方式：

- 标记清除
- 引用计数

##### 标记清除

**JavaScript**最常用的垃圾收回机制

当变量进入执行环境是，就标记这个变量为“进入环境“。进入环境的变量所占用的内存就不能释放，当变量离开环境时，则将其标记为“离开环境“

垃圾回收程序运行的时候，会标记内存中存储的所有变量。然后，它会将所有在上下文中的变量，以及被在上下文中的变量引用的变量的标记去掉

在此之后再被加上标记的变量就是待删除的了，原因是任何在上下文中的变量都访问不到它们了

随后垃圾回收程序做一次内存清理，销毁带标记的所有值并收回它们的内存

举个例子：

```js
var m = 0,
  n = 19 // 把 m,n,add() 标记为进入环境。
add(m, n) // 把 a, b, c标记为进入环境。
console.log(n) // a,b,c标记为离开环境，等待垃圾回收。
function add(a, b) {
  a++
  var c = a + b
  return c
}
```

##### 引用计数

语言引擎有一张"引用表"，保存了内存里面所有的资源（通常是各种值）的引用次数。如果一个值的引用次数是 0，就表示这个值不再用到了，因此可以将这块内存释放

如果一个值不再需要了，引用数却不为 0，垃圾回收机制无法释放这块内存，从而导致内存泄漏

```js
const arr = [1, 2, 3, 4]
console.log('hello world')
```

上面代码中，数组[1, 2, 3, 4]是一个值，会占用内存。变量 arr 是仅有的对这个值的引用，因此引用次数为 1。尽管后面的代码没有用到 arr，它还是会持续占用内存

如果需要这块内存被垃圾回收机制释放，只需要设置如下：

```js
arr = null
```

通过设置 arr 为 null，就解除了对数组[1,2,3,4]的引用，引用次数变为 0，就被垃圾回收了

##### 小结

有了垃圾回收机制，不代表不用关注内存泄露。那些很占空间的值，一旦不再用到，需要检查是否还存在对它们的引用。如果是的话，就必须手动解除引用

#### 三、常见内存泄露情况

意外的全局变量

```js
function foo(arg) {
  bar = 'this is a hidden global variable'
}
```

另一种意外的全局变量可能由 this 创建：

```js
function foo() {
  this.variable = 'potential accidental global'
}
// foo 调用自己，this 指向了全局对象（window）
foo()
```

上述使用严格模式，可以避免意外的全局变量

定时器也常会造成内存泄露

```js
var someResource = getData()
setInterval(function () {
  var node = document.getElementById('Node')
  if (node) {
    // 处理 node 和 someResource
    node.innerHTML = JSON.stringify(someResource)
  }
}, 1000)
```

如果 **id** 为 Node 的元素从 **DOM** 中移除，该定时器仍会存在，同时，因为回调函数中包含对 **someResource** 的引用，定时器外面的 **someResource** 也不会被释放

包括我们之前所说的闭包，维持函数内局部变量，使其得不到释放

```js
function bindEvent() {
  var obj = document.createElement('XXX')
  var unused = function () {
    console.log(obj, '闭包内引用obj obj不会被释放')
  }
  obj = null // 解决方法
}
```

没有清理对 DOM 元素的引用同样造成内存泄露

```js
const refA = document.getElementById('refA')
document.body.removeChild(refA) // dom删除了
console.log(refA, 'refA') // 但是还存在引用能console出整个div 没有被回收
refA = null
console.log(refA, 'refA') // 解除引用
```

包括使用事件监听**addEventListener**监听的时候，在不监听的情况下使用**removeEventListener**取消对事件监听

##### 参考文献

- http://www.ruanyifeng.com/blog/2017/04/memory-leak.html
- https://zh.wikipedia.org/wiki

## 为什么要使用 Typescript?

::: tip
在没有**Typescript**以前，大部分项目都是使用原生**Javascript**开发。而**Javascript**天生是一门**弱类型**的语言。表现在:

- 它没有类型约束，一个变量可能初始化时是字符串，过一会儿又被赋值为数字
- 由于隐式类型转换的存在，有的变量的类型很难在运行前就确定，也可以做一些神奇的操作
- 基于原型的面向对象编程，使得原型上的属性或者方法可以在运行时被修改
- 函数是**Javascript**中的一等公民，可以赋值给变量，也可以当作参数或返回值

而这些灵活通常导致了**Javascript**代码的肆无忌惮，比如拿数字和数组做求和运算，给函数传入不符合预期的参数等等而这些显而易见的问题编码阶段不会有任何错误提示。

:::

```js
// 数字和数组做求和运算
const number = 1
const arr = [1, 2, 3]
console.log(number + arr)

// 传入不符合预期的参数
function pow2(value) {
  return Math.pow(value, 2)
}
pow2('sister')
```

在大型项目中，一个类型"小改动"可能会导致很多处代码需要跟着调整，而这些需要调整的地方在"小改动"前后可能不会有任何报错提示，开发者只能靠肉眼排查，很难且容易遗漏。

我们使用**Typescript**的主要目的就是【**类型安全**】(type-safe),借助类型声明避免程序做错误的事情。

```js
const number = 1
const arr = [1, 2, 3]
console.log(number + arr)
// 运算符“+”不能应用于类型“number”和“number[]”。

function pow(value: number) {
  return Math.pow(value, 2)
}
pow('sister')
// 类型“string”的参数不能赋给类型“number”的参数。
```

下图是某错误处理平台收集统计的 JavaScript Top10 错误，其中 7 个 TypeError，1 个 ReferenceError：

![类型错误统计图](https://camo.githubusercontent.com/5ef2cb627cca5c8992cfe73a549df8029ee87d2aa9a9dd0cb1023c7fddbe98ad/687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303231303830333036333630342e6a706567)

## Typescript 与 Javascript 相比有哪些优势？

::: tip

1. TypeScript 是添加了类型系统的 JavaScript，适用于任何规模的项目，增加了代码的可读性和可维护性

   尤其是在第三方开源库中（例如组件库），类型系统尤为重要，现在很多项目都是用 TypeScript 写的，如果依赖的库没有 TypeScript 声明，在调用时就会传递大量类型为 any 的值，最终影响项目自身使用 TypeScript 应该获得的价值（强类型推导）。

   因此在开发设计第三方库时，大都会使用 TypeScript 声明。一个库如果足够热门的话，你不做 TypeScript 声明也会有热心用户做一个发布出来的。

2. TypeScript 是一门静态类型、弱类型的语言，它是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性

   类型系统按照「类型检查的时机」来分类，可以分为：

- 动态类型：在运行时才会进行类型检查，往往会导致运行时错误
- 静态类型：指编译阶段就能确定每个变量的类型，往往会导致语法错误

JavaScript 就是一门解释型语言，没有编译阶段，所以它是动态类型：

```js
let foo = 1
foo.split(' ')
// Uncaught TypeError: foo.split is not a function
// 运行时会报错（foo.split 不是一个函数），造成线上 bug
```

TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查，所以 **TypeScript 是静态类型**，这段 TypeScript 代码在编译阶段就会报错了：

```js
let foo = 1
foo.split(' ')
// Property 'split' does not exist on type 'number'.
// 编译时会报错（数字没有 split 方法），无法通过编译
```

另外，得益于 TypeScript 强大的 **类型推论**，上面的代码并没有手动声明变量 foo 的类型，但在变量初始化时自动推论出它是一个 number 类型

```js
let foo: number = 1
foo.split(' ')
// Property 'split' does not exist on type 'number'.
// 编译时会报错（数字没有 split 方法），无法通过编译
```

以下这段代码不管是在 JavaScript 中还是在 TypeScript 中都是可以正常运行的

```js
console.log(1 + '2')
// 打印出字符串 '12'
```

所以，TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性，所以**它们都是弱类型**

3. TypeScript 增强了编辑器（IDE）的功能，提供了代码补全、接口提示、跳转到定义、代码重构等能力

   TypeScript 增强了编辑器（IDE）的功能，包括代码补全、接口提示、跳转到定义、代码重构等，这在很大程度上提高了开发效率。给开发 TypeScript 项目、中小型项目中迁移 TypeScript 提供了便捷

4. TypeScript 与标准同步发展，符合最新的 ECMAScript 标准（stage 3）

   TypeScript 坚持与 ECMAScript 标准同步发展，并推进了很多 ECMAScript 语法提案，比如可选链操作符（?.）、空值合并操作符（??）、Throw 表达式、正则匹配索引等

5. TypeScript 可以和 JavaScript 共存，这意味着 JavaScript 项目能够渐进式的迁移到 TypeScript

   在老 JavaScript 项目中，如果你想使用 TypeScript，可以使用 TypeScript 编写新文件，老的 JavaScript 文件可以继续使用

:::

## Typescript 的泛型?

### 一、是什么

泛型程序设计（generic programming）是程序设计语言的一种风格或范式

泛型允许我们在强类型程序设计语言中编写代码时使用一些以后才指定的类型，在实例化时作为参数指明这些类型 在 `typescript` 中，定义函数，接口或者类的时候，不预先定义好具体的类型，而在使用的时候在指定类型的一种特性

假设我们用一个函数，它可接受一个 `number` 参数并返回一个 `number` 参数，如下写法：

```js
function returnItem(para: number): number {
  return para
}
```

如果我们打算接受一个 `string` 类型，然后再返回 `string` 类型，则如下写法：

```js
function returnItem(para: string): string {
  return para
}
```

上述两种编写方式，存在一个最明显的问题在于，代码重复度比较高

虽然可以使用 `any` 类型去替代，但这也并不是很好的方案，因为我们的目的是接收什么类型的参数返回什么类型的参数，即在运行时传入参数我们才能确定类型

这种情况就可以使用泛型，如下所示：

```ts
function returnItem<T>(para: T): T {
  return para
}
```

可以看到，泛型给予开发者创造灵活、可重用代码的能力

### 二、使用方式

::: tip
泛型通过`<>`的形式进行表述，可以声明：

- 函数

- 接口

- 类

:::

#### 函数声明

声明函数的形式如下：

```ts
function returnItem<T>(para: T): T {
  return para
}
```

定义泛型的时候，可以一次定义多个类型参数，比如我们可以同时定义泛型 `T` 和 泛型 `U`：

```ts
function returnItem<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1] + tuple[0]]
}

swap([7, 'seven']) // ['seven', 7]
```

#### 接口声明

声明接口的形式如下

```ts
interface ReturnItemFn<T> {
  (para: T): T
}
```

那么当我们想传入一个 `number` 作为参数的时候，就可以这样声明函数:

```ts
const returnItem: ReturnItemFn<number> = (para) => para
```

#### 类声明

使用泛型声明类的时候，既可以作用于类本身，也可以作用与类的成员函数

下面简单实现一个元素同类型的栈结构，如下所示：

```ts
class Stack<T> {
  private arr: T[] = []

  public push(item: T) {
    this.arr.push(item)
  }

  public pop() {
    this.arr.pop()
  }
}
```

使用方式如下：

```ts
const stack = new Stacn<number>()
```

如果上述只能传递 `string` 和 `number` 类型，这时候就可以使用 `<T extends xx>` 的方式猜实现约束泛型，如下所示
![](https://static.vue-js.com/67d212a0-0e17-11ec-8e64-91fdec0f05a1.png)

除了上述的形式，泛型更高级的使用如下：

例如要设计一个函数，这个函数接受两个参数，一个参数为对象，另一个参数为对象上的属性，我们通过这两个参数返回这个属性的值

这时候就设计到泛型的索引类型和约束类型共同实现

#### 索引类型、约束类型

索引类型 `keyof T` 把传入的对象的属性类型取出生成一个联合类型，这里的泛型 `U` 被约束在这个联合类型中，如下所示：

```ts
function getValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key] // ok
}
```

上述为什么需要使用泛型约束，而不是直接定义第一个参数为 `object`类型，是因为默认情况 `object` 指的是`{}`，而我们接收的对象是各种各样的，一个泛型来表示传入的对象类型，比如 `T extends object`

使用如下图所示：

![](https://static.vue-js.com/74fcbd40-0e17-11ec-a752-75723a64e8f5.png)

#### 多类型约束

例如如下需要实现两个接口的类型约束：

```ts
interface FirstInterface {
  doSomething(): number
}

interface SecondInterface {
  doSomethingElse(): string
}
```

可以创建一个接口继承上述两个接口，如下：

```ts
interface ChildInterface extends FirstInterface, SecondInterface {}
```

正确使用如下：

```ts
class Demo<T extends ChildInterface> {
  private genericProperty: T

  constructor(genericProperty: T) {
    this.genericProperty = genericProperty
  }
  useT() {
    this.genericProperty.doSomething()
    this.genericProperty.doSomethingElse()
  }
}
```

通过泛型约束就可以达到多类型约束的目的

### 三、应用场景

通过上面初步的了解，后述在编写 `typescript` 的时候，定义函数，接口或者类的时候，不预先定义好具体的类型，而在使用的时候在指定类型的一种特性的时候，这种情况下就可以使用泛型

灵活的使用泛型定义类型，是掌握 `typescript` 必经之路

### 参考文献

- [https://www.tslang.cn/docs/handbook/generics.html](https://www.tslang.cn/docs/handbook/generics.html)
