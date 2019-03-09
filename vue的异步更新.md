# 个人关于vue的响应式的理解笔记


##### 受现代 JavaScript 的限制 (而且 Object.observe 也已经被废弃)，Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 `` getter/setter `` 转化过程，所以 `` 属性必须在 data对象 上存在才能让 Vue 转换它，这样才能让它是响应的 `` 。  
###### （只有在 `` data对象 `` 上存在的属性才能让 `` vue `` 转换，这样它才是响应式的 ）
      ``  
      var vm = new Vue({
        data:{
          a:1
        }
      })

      // vm.a 是响应的

      vm.b = 2
      // vm.b 是非响应的  
      
      ``  
#### Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 ``(root-level reactive property)``。然而它可以使用 ``Vue.set(object, key, value)`` 方法将响应属性添加到嵌套的对象上:  
###### ( `` vue `` 不允许在已有的实例上动态添加新的根级响应式属性，却可用 `` Vue.set(obj, key, value) ``方法将响应属性添加到嵌套的对象上)     
      ``  
      Vue.set(vm.someObject, 'b', 2)  
      
      ``  
###### (也可用 `` vm.$set ``实例方法，这也是 `` 全局 Vue.set 方法 ``的别名：)
