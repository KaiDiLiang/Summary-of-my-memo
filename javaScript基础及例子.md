## <P align="center">ECMAScript第一版发布于 1995年 </p>

### ECMAScript是一种语言标准，而JavaScript是网景公司对ECMAScript标准的一种实现。

---
#### **目录**|
**<a href="#快速入门">快速入门</a>** ： 1.<a href="#1.数据类型和变量">数据类型和变量</a>  2.<a href="#2.字符串">字符串</a>  3.<a href="#3.数组">数组</a>  4.<a href="#4.对象">对象</a>   5.<a href="#5.条件判断">条件判断</a>   6.<a href="#6.循环">循环</a>    7.<a href="#7.Map和Set">Map和Set</a>  8.<a href="#8.iterable">iterable</a>

**<a href="#函数">函数</a>** ： 1.<a href="#1.函数定义和调用">函数定义和调用</a>   2.<a href="#2.变量作用域与解构赋值">变量作用域与解构赋值</a>  3.<a href="#3.方法">方法</a>    
4.**<a href="#4.es6新增函数方法">es6新增函数方法</a>** ： ①. <a href="#①.map/reduce">map/reduce</a>   ②. <a href="#②.filter">filter</a>    ③. <a href="#③.sort">sort</a>    ④.<a href="#④.Array"> Array</a>
5.<a href="#5.闭包">闭包</a>    6.<a href="#6.箭头函数">箭头函数</a>    7.<a href="#7.generatot">generator</a>

**<a href="#标准对象">标准对象</a>** ： 1.<a href="#1.Date">Date</a>   2.<a href="#2.RegExp">RegExp</a>     3.<a href="#3.JSON">JSON</a>

**<a href="#面向对象">面向对象</a>** ： 1.<a href="1.创建对象">创建对象</a>  2.<a href="#2.原型继承">原型继承</a>    3.<a href="#3.class">es6之class继承</a>

**<a href="#浏览器操作">浏览器操作</a>**  ：1.**<a href="#Promise">Promise</a>** 2.**<a href="#AJAX">AJAX</a>**     3.**<a href="#Canvas">Canvas</a>**      4.<a href="#表单操作">表单操作</a>      5.<a href="#DOM操作">DOM操作</a>

---

### <a name="快速入门">快速入门</a>
#### js引入及位置
##### javaScript  可直接嵌在网页的任意位置，一般把 js 放在 `<head>` 里，不过出于性能的合理性，把 js 放置于 `<body>的底部` 或者使用 es6 的 `async` 解决 js 置于HTML顶部可能引发的不良问题。
 </br>

>jS在HTML中有两个特征： 
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.阻塞后面内容的呈现 
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.阻塞其后组件的下载

**js文件在下载后，后面都会有一段 code executing 时间,因此每个js文件的阻塞时间：`js下载所需时间 + 执行时间`**

如果js在 `<head>` 中，因 DOM 从上往下解析的特性，就很容易出现因 js 的阻塞时间过长而导致页面长时间空白。

***因此 js 最好放置于 <head> 后，或者使用 es6 的 async 或 defer***

**async (后续文档元素的加载、渲染  与  js的加载与执行  并行进行(异步)，无法保证顺序 )**
    <p align='center'>`<script async src="script.js"></script>`<p>

**defer (后续文档元素的加载  与 js的加载  并行进行(异步)，有顺序，但js的执行 要在所有元素解析完成后，DOMContentLoaded事件触发前  完成，脚本延迟到文档解析和显示后执行)**
    <p align='center'>`<script defer src="script.js"></script>`</p>

**但 script.js 在 `所有元素解析完成后执行`， `DOMContentLoaded事件触发前完成`**

---

#### 1.<a name="1.数据类型和变量">数据类型和变量</a>

##### 数据类型 ： 1.<a href="#数值">数值Number</a>  2.<a href="#字符串">字符串String</a>   3.<a href="#布尔值">布尔值Boolean</a>   4.<a href="#undefined">undefined</a>    5.<a href="#null">null</a>   6.<a href="#对象">对象</a>

>`Number, String, Boolean, Undefined, null 是原始数据类型，即没有属性或方法的数据（它们是硬编码，不能改变）；` 

**`js中，除了原始值，都是对象`（js对象是包含变量的变量，也可说 对象是键-值组成的无序集合,是动态类型）, javaScript对象无法进行对比，哪怕两个对象的值一样，对比结果始终返回 false**

**`原始值`**: 如3.14 或 2016， `无法拥有属性和方法(因它们不是对象)`，但通过javaScript，方法和属性也可用于原始值， `因为javaScript在 执行方法和属性时将原始值视为对象`。</p>

**所有javaScript数据类型都有 `valueOf()` 和 `toString()` 方法。**

---

#### <a name="数值">①数值Number</a>

#### js不区分整数和浮点数，统一用Number表示

```
                        123;    // 整数123
                        0.456;  // 浮点数0.456
                        1.23456e3;  // 科学技术法表示1.23456 * 1000，等同1234.5
                        -99;    // 负数
                        NaN;    // NAN表示Not a Number,无法计算结果时用NaN表示
                        Infinity;   // Infinity表示无限大，当数值超过了js的Number所能表示的最大值时，就表示Infinity
```

由于计算机使用 `二进制` ,有时候用 `十六进制` 表示整数比较方便， `十六进制用0x前缀和0-9、a-f表示` , 如 ： `0xff00, 0xa5b5c3d2` 。

#### Number 可以做四则运算，规则和数学一致

```
                        1 + 2;  // 3
                        (1 + 2) * 5 /2;   // 7.5
                        2 / 0;  //Infinity
                        0 / 0;  // NaN
                        10 % 3;  // 1
                        10.5 % 3;   // 1.5
```

***原始值 : (如3.14 或 2016)， 无法拥有属性和方法(因它们不是对象)，但通过javaScript，方法和属性也可用于原始值， `因为javaScript在 执行方法和属性 时将 原始值 视为 对象`***

#### 常用方法：

**所有数字方法可用于任意类型的数字(字面量、变量或表达式)**

```
            <!-- toString() 以字符串返回数值 -->
                
                var num = 123;
                
                num.toString();     // 从 变量num 返回 字符串123
                
                (123).toString();   // 从 文本123 返回 字符串123

                (100 + 23).toString();     // 从 表达式 100 + 23 返回 字符串123

            --------------------------------------------------------------------------------------------------------------

            <!-- toExponential() 返回字符串值，包含已四舍五入并使用指数计数法的数字,参数可选，不设置则不会对数字进行舍入 -->
                
                var num2 = 9.657;
                
                num2.toExponential(2);      // 返回 9.66e+0

                num2.toExponential(4);      // 返回 9.6570e+0
                
                num2.toExponential(6);      // 返回 9.657000e+0

            --------------------------------------------------------------------------------------------------------------

            <!-- toFixed() 返回字符串值，包含了指定位数小数的数字; toFixed(2) 非常适合处理金钱 -->

                var num3 = 9.656;
                
                num3.toFixed(0);      // 返回 10

                num3.toFixed(2);      // 返回 9.66

                num3.toFixed(4);      // 返回 9.6560

                num3.toFixed(6);      // 返回 9.656000

            ---------------------------------------------------------------------------------------------------------------

            <!-- toPrecision() 返回字符串值，包含了指定长度的数字 -->

                var num4 = 9.656;

                num4.toPrecision();     // 返回 9.656

                num4.toPrecision(2);    // 返回 9.7

                num4.toPrecision(4);    // 返回 9.656

                num4.toPrecision(6);    // 返回 9.65600

            ---------------------------------------------------------------------------------------------------------------

            <!-- valueOf() 以数值返回数值 -->

                var num5 = 123;

                num5.valueOf();      // 从 变量num5 返回 数值123

                (123).valueOf();     // 从文本123 返回 数值123

                (100 + 23).valueOf();      // 从表达式100 + 23 返回 数值123

```

**在jS中，数字可以是原始值(typeof = number) 或 对象(typeof = object) 。**

在javaScript内使用 `valueOf()` 可将 `Number对象` 转换为 `原始值` ， 但没有理由在代码中使用它。

##### 可将变量转换为数字的3种全局javaScript方法(可用于所有javaScript数据类型)： `1.Number()` ;  `2.parseInt()` ; `3.parseFloat()`

```
        <!-- Number() 用于把javaScript变量转换为数值 -->
            
            var x = true;
            Number(x);      // 返回 1

            var y = false;
            Number(y);      // 返回 0

            var t = new Date();
            Number(t);      // 返回 1568007739725

            var str = "10";
            Number(str);    // 返回 10

            var str2 = "10 20";
            Number(str2);   // 返回 NaN，无法转换为数字就返回NaN

        <!-- parseInt() 解析一段字符串并返回数值，允许空格，但只返回首个数字  -->
            
            parseInt("10");     // 返回 10

            parseInt("10.33");      // 返回 10

            parseInt("10 20 30");       // 返回 10

            parseInt("10 years");       // 返回 10

            parseInt("years 10");       // 返回 NaN,无法转换为数值，则返回NaN

        <!-- parseFloat() 解析一段字符串并返回数值，允许空格，但只返回首个数字 -->

            parseFloat("10");       // 返回 10

            parseFloat("10.33");    // 返回 10.33

            parseFloat("10 20 30");     // 返回 10

            parseFloat("10 years");     // 返回 10

            parseFloat("years 10");     // 返回 NaN,无法转换为数值就返回NaN

```

#### <a name="字符串">②字符串String</a>

以单引号 ' 或双引号 " 括起来的任意文本， ' ' 或 " " 本身只是一种表示方式，不是字符串的一部分；字符串中含需要输出的引号时，使用 `\转义字符` 。

**通常，js字符串是原始值，但是，也可通过 `关键字new` 定义为对象, ***不建议这样做，会拖慢性能及产生不可预估的结果*** 。**

```
            var x = "bill";
            typeof(x);      //  返回 string

            var y = new String("bill");
            typeof(y);      // 返回 object
```            

##### 常用方法：
```
            var str = "abcdefghabcdefgh";
            var str2 = "ABCDEFGHABCDEFGH" 
        
            str.length;    // 返回字符串长度 16

            str.indexOf("d");    // 返回指定字符首次出现的索引,不存在则返回-1,第二个参数为起始检索位置,无法设置正则来检索  3
            
            str.lastIndexOf("d");   // 返回指定字符最后一次出现的索引,第二参数为起始检索位置   11

            str.search("d");   // 返回指定的特定值的位置,无法设置第二参数做起始检索位置

            str.slice(start, end);     // 提取字符串的某个部分并返回被提取的部分,参数为负则从字符串的尾部往回计数,省略第二参则返回字符串剩余部分

            str.substring(start, end);     // 类似slice(),但无法接受负的索引

            str.substr(start, length);     // 类似slice(), 但第二参指定的是提取长度

            str.replace("abc", 123);     // 用另一个值替换字符串中指定的值(大小写敏感,如需执行不敏感,用正则的 /i ),默认只替换首个匹配到的值(用正则 /g 可开启搜索整个字符串),且不会改变字符串的值,返回的是新字符串
            str.replace(/ABC/i, 123);
            str.replace(/abc/g, 123);

            str.toUpperCase();     // 字符串转换为大写,不改变原数据

            str.toLowerCase();     // 字符串转换为小写，不改变原数据

            str.concat('', str2);      // 连接两个或多个字符串,可替代 + 运算符,等同str + "" + str2

-----------------------------------------------------------------------------------------------------
            str.trim();    // 删除字符串两端的空白符, IE8及以下不支持,可用正则搭配replace()代替
            str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
            
            也可把trim函数添加到javascript String.prototype
                if (!String.prototype.trim) {
                    String.prototype.trim = function () {
                        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
                    }
                }
                var str = "  用replace方案把trim函数添加到javascript String.prototype   ";
                console.log(str.trim());

-----------------------------------------------------------------------------------------------------

            str.charAt(position);      // 返回字符串中指定下标的字符

            str.charCodeAt(position);  // 返回字符串中指定索引的字符unicode编码

            str.split();   // 将字符串转换为数组

```                

#### <a name="布尔值">③布尔值Boolean</a>

**一个布尔值只有 `true, false` 两种值**

```
            true;   // true
            false;  // false
            2 > 1;  // true
            2 >= 3;    // false
```

**`&&` 同真为true，有假则false； `||` 有真为true； `！` true变false，false变true**

**jS `允许对任意数据类型做比较`，注意 `相等运算符` ， `==` : 会自动转换数据类型再比较，常会导致意外的结果； `===` ： 不会自动转换数据类型，数据类型不一致就返回false,一致再比较数值。 `因js的该设计缺陷，应坚持做比较时使用 === `**

**`NaN` 这个特殊的Number与所有其他值都不相等，包括其自身。 `只能通过isNaN()函数判断NaN`**

**浮点数的相等比较只能通过计算它们之差的绝对值，看是否小于某个阈值**（`原因是浮点数在运算过程中会产生误差，计算机无法精确标示无限循环小数）`

```
            false == 0;     // true
            false === 0;    // false

            NaN === NaN;    // false
            isNaN(NaN);     // true

            1 / 3 === (1 - 2 / 3);    // false
            Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001;      // true
```

#### <a name="undefined" name="null">④undefine和null</a>
