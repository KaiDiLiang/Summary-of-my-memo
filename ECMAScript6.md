## ECMAScript 6(简称ES6)是JavaScript语言的下一代标准。因为当前版本的ES6在2015年发布，所以又称ECMAScript 2015。

##### 目前不是所有的浏览器都能兼容ES6全部特性，所以得了解一下Babel。

#### ``Babel`` 是一个广泛使用的ES6转码器，可以将ES6转ES5，从而在现有浏览器环境执行。

**[Babel官网](https://babeljs.io/docs/setup/)**

## **最常用的ES6特性**
  ### **``变量`` ：** ``let, const``  
  ### **``类`` ：** ``class``  
  ### **``继承`` ：** ``extends ， super(超类==父类的调用)`` 
  ### **``箭头函数`` ：** ``arrow function``    
  ### **``字符串`` :** \``（字符串模板可以换行写字符串）， 新增``.includes()``和``.repeat()``方法
  ### **``解构`` ：** ``destructuring``(可直接将数组或对象中的值直接分别导出到多个变量中) 
  ### **``默认参数`` :** ````
  ### **``rest参数`` :** ``(...args)``
  
  
## ***以下是示例***
  ### **``变量``：** ``let`` , ``const``  
   ##### 这两个的用途与var类似，都是用来声明变量的，但``let`` ``const``不存在变量提升，而``var``有。
   ##### **``变量提升：把变量声明提升到它所在作用域的最开始的部分。``**
  
   ###### es5产生的var的变量提升  
        ``  
          console.log(global); // undefined
          var global = 'global';
          console.log(global); // global
        
        ``上面例子实际按以下方式运行
        
          var global;   // 变量提升，全局作用域范围内，此时只是声明，并没有赋值
          console.log(global);  // undefined
          global = 'global';  // 此时才赋值
          console.log(global);  // global
        ``
  
   ###### es5中var只有全局作用域和函数作用域，没有块状作用域的概念
   
          var name = 'aaa';

          while(true) {
            var name = 'oba';
            console.log(name);  // oba
            break;
          }

          console.log(name);  // oba
     
   ##### es5不合理第一种是：内层变量覆盖外层变量。而 ``let则实际上为JavaScript新增了块状作用域，用它声明的变量，只在let所在的代码块内有效`` 。
       
       let name = 'aaa';

        while(true) {
          let name = 'oba';
          console.log(name);  // oba
          break;
        }

        console.log(name);  // aaa
 
  ##### 不合理第二种是：用来计数的循环变量泄露为全局变量。

        var a = [];
        for (var i = 0; i < 10; i++) {
          a[i] = function () {
            console.log(i);
          };
        }

        a[6](); // 10

   ###### 上面的代码中，变量i是var声明的，在全局范围内都有效，所以每次循环，新的i值都会覆盖旧值，导致最后输出的是最后一轮的i的值。而使用let则不存在该问题。
    
         var a = [];
         for (let i = 0; i < 10; i++) {
          a[i] = function () {
            console.log(i);
          };
         }

         a[6]();  // 6
   
   
##### 如果不使用ES6，而用闭包该如何解决下面的问题呢？ 
        ``
          // 期待点击不同的clickBox,显示不同的i，但实际无论点击哪个clickBox，输出都为5
          var clickBoxs = document.querySelectorAll('.clickBox');
          for (var i = 0; i < clickBoxs.length; i++) {
            clickBoxs[i].onclick = function () {
              console.log(i);
            }
          }
        ``
   ###### 用闭包解决
   
        function iteratorFactory (i) {
          var onclick = function (e) {
            console.log(i);
          }
          return onclick;
        }
        
        var clickBoxs = document.querySelectorAll('.clickBox');
        for (var i = 0; i < clickBoxs.length; i++) {
          clickBoxs[i].onclick = iteratorFactory(i);
        }
  
 #### **``const`` 也可以用来声明变量，但是声明的是 ``常量`` 。``常量一旦声明，其值就不可再更改`` 。**
 
        const PI = Math.PI;
        
        PI = 23;  // Module build failed: SyntaxError: /es6/app.js: "PI" is read-only
        
  ##### 当尝试去改变用const声明的常量时，浏览器就会报错。</br>
  **``const有个好应用场景，就是引用第三方库的变量时，用const来声明可以避免重命名而导致的bug``**</br>
         
         const monent = require('moment')
        
 ### **``类`` ： ``class`` , ``继承`` ： ``extends`` , ``超类`` ： ``super``（相当于父类构造函数的调用）**
  ###### ES6 引入了Class（类）这个概念，新的class写法让对象原型的写法更清晰、更像面向对象编程的语法。
         
         class Animal {
            constructor () {
                this.type = 'animal';
            }
            says (say) {
                console.log(this.type + 'says' + say)
            }
         }
         
         let animal = new Animal();
         animal.says('hello');  // animal says hello
         
         class Cat extends Animal {
            constructor () {
                super();
                this.type = 'cat';
            }
         }

         let cat = new Cat();
         cat.says('hello');   // cat says hello
         
  ##### 以上代码用 **``class``** 定义了一个“类”，可以看到有 ``一个 ``**constructor**`` 方法（构造函数方法）``，而 `` this `` 关键字则代表 `` 实例对象 ``。
  #### **`` constructor `` 内定义的``方法``和``属性``是``实例对象自己的``，而`` constructor ``外定义的``方法``和``属性``则是所有实例对象可以共享的。**
  #### ``class``之间可通过``extends``关键字实现``继承``,这比es5的通过修改原型链实现继承要清晰得多。
  ##### 上面代码定义了一个 ``Cat类``，该类通过  ``extends 关键字`` ,继承了 ``Animal 类`` 的 ``所有属性`` 和 ``方法``。
  
  #### ``super关键字`` ,指代父类的实例（即 ``父类的this对象`` ）;  **``子类``** 必须在 ``constructor 方法`` 中 调用 ``super 方法`` ，否则新建实例时报错（**``子类 没有自己的this对象`` ,而是 ``继承父类的this对象`` ，再对其进行加工。**），不调用 ``super 方法`` , ``子类`` 无法获取 ``this对象``。
  
  #### **Es6的继承机制，实质是 ``先创造父类的实例对象this（因而必须先调用 super方法 ）,再用``子类``的``构造函数方法``修改this。``**
  
  
  ### **``箭头函数`` ：``arrow function ``**
  
    ``
    function (i) { return i + 1; }  // es5
    (i) => i + 1  // es6
    ``
  
  ##### **es6与es5差异：**
      1.参数只有1个或者为空时，可以直接省略function
      2.语法块只有1行时，可以直接省略 {}
  
  
  #### **arrow function 对 ``this对象`` 有奇效**
      
      ``
        class Animal {
            constructor () {
                this.type = 'animal'
            }
            says(say) {
                setTimeout(function () {
                    console.log(this.type + 'says' + say)
                }, 1000)
            }
        }
        var animal = new Animal();
        animal.says('hi');  // underfined says hi
     `` 
  ###### 以上代码运行会报错，因为 ``seeTimeout`` 中的 ``this`` 指向的是  ``全局对象``。
  #### **setTimeout中所执行函数中的this，永远指向window！注意是要延迟执行的函数中的this哦！**
  
  ##### 传统解决方案：
   ###### 1.将 ``this`` 传给 ``self`` ，再用 ``self`` 指代 ``this``
   
       says (say) {
          var self = this;
          setTimeout(function () {
              console.log(self.type + 'says' + say)
          }, 1000)
       }
     
   ###### 2.用 ``bind(this)``
   
        says (say) {
            setTimeout(function () {
                console.log(self.type + 'says' + say)
            }.bind(this), 1000)
        }
   
   ##### 使用箭头函数，则简洁明了得多。
   #### **箭头函数体内的 ``this对象``,就是 ``定义时所在的对象``，而 ``不是使用时所在的对象``。**
   #### **箭头函数其实没有自己的 ``this``, ``它的this是继承外部的``, 因此 ``箭头函数内部的this就是外层代码块的this``。**
   
        class Animal {
            constructor () {
                this.type = 'animal';
            }
            says (say) {
                setTimeout( () => {
                    console.log(this.type + 'says' + say)
                }, 1000)
            }
        }
        var animal = new Animal();
        animal.says('hi');  // animal says hi
    

   ### **``字符串``: ``template string``(\``用于插入大段html内容时), ``.includes()``, ``.repeat()``**
   
   #### **字符串模板,1.支持直接插入特殊字符，不用转义，2.支持直接插入变量，实现字符串与变量的直接连接输出**
   
      es5添加大段字符串时需大量的 +
      
        $("#result").append(
          "There are <b>" + basket.count + "</b>" + 
          "items in your basket," + "<em>" + basket.onSale + 
          "</em> are on sale!"
        );
      
      或
      
        var text = [
            'cat',
            'dog',
            'zoo'
        ].join('\n');

        console.log(text);
      ``
      
      使用es6的字符串模板``,不必关注换行转义符，直接换行即可，内部还支持表达式
      
        $("$result").append(`
          There are <b>${basket.count}</b> items
          in your basket, <em>${basket.onSale}</em>
          are on sale!
        `);

        let today1 = new Date();
        let text2 = `The time and date is ${today.toLocaleString()}`;

        console.log(text2);   // The time and date is 2019/4/21 上午00:09:56
      ``
   ##### 使用`` ` ``标识起始，用 ``${}`` 引用变量，所有的空格和缩进都会被保留

   #### **.includes(),用于判断是否包含某一元素，但是不能定位**
   ##### ``.indexOf(),可查找某一元素的位置，但有2不足：
              1.返回-1和元素的位置来表示是否包含（定位方面没问题，但不够语义化）
              2.不能判断是否有NaN的元素     
         ``
      
      ``es5时用.indexOf()判断,对NaN无法判断
      
        var str1 = 'food';
        var substr1 = 'foo';

        console.log(str1.indexOf(substr1) > -1);  // true
      ``
      
      ``es6时可用.includes()返回布尔值，对NaN有效
        
        const str1 = 'food';
        const substr1 = 'foo';
        
        console.log(str1.includes(substr1));  // true
      ``
      
   #### **.repeat(),将指定字符重复n次**
      
      ``es5
      
        function repeatFun(string, count) {
            var strings = [];
            while(strings.length < count) {
                strings.push(string);
            }
            return strings.json('');
        }
      
      ``es6 则可用.repeat()实现
      
        // string.repeat(numberOfRepetitions)
        'haha'.repeat(3);   // 'hahaha'
      ``  
      
      
      


   ### **``解构`` : ``destructuring``，可直接将数组或对象中的值直接分别导出到多个变量中**
   #### es6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，该模式称为解构。
   
   ``旧版数组
       let cat1 = 'kai';
       let dog1 = 'liang';
       let zoo = {cat: cat1, dog: dog1};
       console.log(zoo);  // object {cat: "kai", dog: "liang"}

       var arr = [1, 2, 3, 4];
       var a = arr[0];
       var b = arr[1];
       var c = arr[2];
       var d = arr[3];
       console.log(a, b, c, d);   // 1 2 3 4
   
   
     es6数组解构
       let cat = 'kai';
       let dog = 'liang';
       let zoo = {cat, dog};
       console.log(zoo);  // object {cat: "kai", dog: "liang"} 

       let [a, b, c, d] = [1, 2, 3, 4];
       console.log(a, b, c, d);   // 1 2 3 4
   
   
     es5对象
       var luke = {occ: 'jeke', fat: 'anma'};
       var occ = luke.occ;
       var fat = luke.fat;

       console.log(occ, fat);   // jeke anma
   
   
     es6对象解构
       let luke = {occ: 'jeke', fat: 'anma'};
       let {occ, fat} = luke;

       console.log(occ, fat);   // jeke anma 
   ``
   
   
   ### **``参数``: ``default``, ``rest``**
   
