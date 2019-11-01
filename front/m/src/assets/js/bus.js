// 中央事件总线eventBus的实质就是创建一个vue实例，通过一个空的vue实例作为桥梁实现vue组件间的通信。它是实现非父子组件通信的一种解决方案。
// 而eventBus实现也非常简单
// import Vue from 'Vue'
// export default new Vue
// 复制代码我们在使用中经常最容易忽视，又必然不能忘记的东西，那就是:清除事件总线eventBus。
// 不手动清除，它是一直会存在，这样当前执行时，会反复进入到接受数据的组件内操作获取数据，原本只执行一次的获取的操作将会有多次操作。本来只会触发并只执行一次，变成了多次，这个问题就非常严重。
// 当不断进行操作几分钟后，页面就会卡顿，并占用大量内存。
// 所以一般在vue生命周期beforeDestroy或者destroyed中，需要用vue实例的$off方法清除eventBus
// beforeDestroy(){
//     bus.$off('click')
//  }
// 复制代码可当你有多个eventBus时，就需要重复性劳动$off销毁这件事儿。
// 这时候封装一个 eventBus就是更优的解决方案。
export default {
  install: function install (Vue) {
    // Event-bus 相当于简单的store
    const bus = new Vue()

    /* eslint no-param-reassign: ["error", { "props": false }] */
    Vue.prototype.$bus = bus
  }
}
