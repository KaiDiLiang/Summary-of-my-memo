# ECMAScript 6(简称ES6)是JavaScript语言的下一代标准。因为当前版本的ES6在2015年发布，所以又称ECMAScript 2015。

### 目前不是所有的浏览器都能兼容ES6全部特性，所以得了解一下Babel。

### Babel是一个广泛使用的ES6转码器，可以将ES6转ES5，从而在现有浏览器环境执行。

**[Babel官网](https://babeljs.io/docs/setup/)**

## **最常用的ES6特性**
  ### **变量：** let, const
  ### **类：** class
  ### **继承：** extends， super(超类)
  ### **箭头函数：** arrow function
  ### **字符串模板:** `(``)可以换行写字符串`
  ### **函数解构：** destructuring
  ### **默认参数:** default
  ### **:** rest arguments
  
## ***以下是示例***
  ### **变量：** let, const
   #### 这两个的用途与var类似，都是用来声明变量的，但在实际运用中有其各自的特性。
  
        ```javascript
        var name = 'aaa';

        while(true) {
          var name = 'oba';
          console.log(name);  // oba
          break;
        }

        console.log(name);  // oba
        ```
      
   #### 使用var两次输出都是oba,这是因为ES5只有全局作用域和函数作用域，没有块状作用域的概念，这带来了很多不合理的场景。
   ##### 第一种是：内层变量覆盖外层变量。而let则实际上为JavaScript新增了块状作用域，用它声明的变量，只在let所在的代码块内有效。
        ```
        let name = 'aaa';

        while(true) {
          let name = 'oba';
          console.log(name);  // oba
          break;
        }

        console.log(name);  // aaa
        ```
  ##### 第二种是：用来计数的循环变量泄露为全局变量。
        ```
        var a = [];
        for (var i = 0; i < 10; i++) {
          a[i] = function () {
            console.log(i);
          };
        }

        a[6](); // 10
        ```
   ##### 上面的代码中，变量i是var声明的，在全局范围内都有效，所以每次循环，新的i值都会覆盖旧值，导致最后输出的是最后一轮的i的值。而使用let则不存在该问题。
         ```
         var a = [];
         for (let i = 0; i < 10; i++) {
          a[i] = function () {
            console.log(i);
          };
         }

         a[6]();  // 6
         ```
   
####如果不适用ES6，而用闭包该如何解决呢？   
