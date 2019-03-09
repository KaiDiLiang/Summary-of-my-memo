# 个人关于vue的响应式的理解笔记


##### 受现代 JavaScript 的限制 (而且 Object.observe 也已经被废弃)，Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性执行 `` getter/setter `` 转化过程，所以 `` 属性必须在 data对象 上存在才能让 Vue 转换它，这样才能让它是响应的 `` 。  
###### （ 只有在 `` data对象 `` 上存在的属性才能让 `` vue `` 转换，这样它才是响应式的 ）  
######  ( `` Vue 不允许动态添加根级响应式属性 ``,初始化实例前 ``声明根级响应式属性，哪怕只是一个空值 `` )
      ``  
      var vm = new Vue({
        data:{
          a:1,
          message: ''         // 声明 message 为空值字符串
        },
        template: '<div>{{ message }}</div>'
      })

      vm.message = 'hello'    // 设置 'message'
      
      // vm.a 是响应的

      vm.b = 2          // vm.b 是非响应的,因为该属性不存在于data对象上  
      
      ``  
#### Vue 不允许在已经创建的实例上动态添加新的根级响应式属性 ``(root-level reactive property)``。然而它可以使用 ``Vue.set(object, key, value)`` 方法将响应属性添加到嵌套的对象上:  
###### ( `` vue `` 不允许在已有的实例上动态添加新的根级响应式属性，却可用 `` Vue.set(obj, key, value) ``方法将响应属性添加到嵌套的对象上)     
      ``  
      Vue.set(vm.someObject, 'b', 2)  
      
      ``  
###### (也可用 `` vm.$set ``实例方法，这也是 `` 全局 Vue.set 方法 ``的别名)  
      ``  
      this.$set(this.someObject,'b',2)  
      
      ``  
##### 向一个已有对象添加多个属性，可使用 `` Object.assign() 或 _.extend() ``方法来添加属性。但是， `` 该方法添加到对象上的新属性不会触发更新,在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性 ``  
      ``  
      // 代替 Object.assign(this.someObject, { a: 1, b: 2 })  
      this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })  
      
      ``

