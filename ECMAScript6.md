# ECMAScript 6(简称ES6)是JavaScript语言的下一代标准。因为当前版本的ES6在2015年发布，所以又称ECMAScript 2015。

### 目前不是所有的浏览器都能兼容ES6全部特性，所以得了解一下Babel。

### Babel是一个广泛使用的ES6转码器，可以将ES6转ES5，从而在现有浏览器环境执行。

**Babel官网 https://babeljs.io/docs/setup/**

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
  
  `var name = 'aaa';
  
  while(true) {
    var name = 'oba';
    console.log(name);  // oba
    break;
  }
  
  console.log(name);  // oba
  `
