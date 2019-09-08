## <P align="center">1995年 ECMAScript第一版发布于 1995年 </p>

### ECMAScript是一种语言标准，而JavaScript是网景公司对ECMAScript标准的一种实现。

---
#### **目录**|
**<a href="#快速入门">快速入门</a>** ： 1.<a href="#1.数据类型和变量">数据类型和变量</a>  2.<a href="#2.字符串">字符串</a>  3.<a href="#3.数组">数组</a>  4.<a href="#4.对象">对象</a>   5.<a href="#5.条件判断">条件判断</a>   6.<a href="#6.循环">循环</a>    7.<a href="#7.Map和Set">Map和Set</a>  8.<a href="#8.iterable">iterable</a>

**<a href="#函数">函数</a>** ： 1.<a href="#1.函数定义和调用">函数定义和调用</a>   2.<a href="#2.变量作用域与解构赋值">变量作用域与解构赋值</a>  3.<a href="#3.方法">方法</a>    
4.**<a href="#4.es6新增函数方法">es6新增函数方法</a>** ： ①. <a herf="#①.map/reduce">map/reduce</a>   ②. <a herf="#②.filter">filter</a>    ③. <a href="#③.sort">sort</a>    ④.<a href="#④.Array"> Array</a>
5.<a herf="#5.闭包">闭包</a>    6.<a href="#6.箭头函数">箭头函数</a>    7.<a href="#7.generatot">generator</a>

**<a href="#标准对象">标准对象</a>** ： 1.<a href="#1.Date">Date</a>   2.<a href="#2.RegExp">RegExp</a>     3.<a href="#3.JSON">JSON</a>

**<a href="#面向对象">面向对象</a>** ： 1.<a href="1.创建对象">创建对象</a>  2.<a href="#2.原型继承">原型继承</a>    3.<a href="#3.class">es6之class继承</a>

**<a href="#浏览器操作">浏览器操作</a>**  ：1.**<a href="#Promise">Promise</a>** 2.**<a href="#AJAX">AJAX</a>**     3.**<a href="#Canvas">Canvas</a>**      4.<a href="#表单操作">表单操作</a>      5.<a href="#DOM操作">DOM操作</a>

---

### <a name="快速入门">快速入门</a>
#### js引入及位置
##### javaScript  可直接嵌在网页的任意位置，一般把 js 放在 `<head>` 里，不过出于性能的合理性，把 js 放置于 `<body>的底部` 或者使用 es6 的 `async` 解决 js 置于HTML顶部可能引发的不良问题。
 
``` 
javaScript 在 HTML 中有两个特征： 
                              1.阻塞后面内容的呈现 
                              2.阻塞其后组件的下载
```

##### <P align="center">js文件在下载后，后面都会有一段 code executing 时间,因此每个js文件的阻塞时间：***js下载所需时间 + 执行时间***</p>

###### 如果js在 `<head>` 中，因 DOM 从上往下解析的特性，就很容易出现因 js 的阻塞时间过长而导致页面长时间空白。
### ***`因此 js 最好放置于 <head> 后，或者使用 es6 的 async 或 defer`***

```
    async (后续文档元素的加载、渲染  与  js的加载与执行  并行进行(异步)，无法保证顺序 )
        <script async src="script.js"></script>

    defer (后续文档元素的加载  与 js的加载  并行进行(异步)，有顺序，但js的执行 要在所有元素解析完成后，DOMContentLoaded事件触发前  完成，脚本延迟到文档解析和显示后执行)
        <script defer src="script.js"></script>

        但 script.js 的执行 在所有元素解析完成后， DOMContentLoaded事件触发前 完成
```

-----------------------------------------------------------------------------------------------------------------------------

#### 1.<a name="1.数据类型和变量">数据类型和变量</a>

##### 数据类型 ： 1.<a href="#数值">数值Number</a>  2.<a href="#字符串">字符串String</a>   3.<a href="#布尔值">布尔值Boolean</a>   4.<a href="#undefined">undefined</a>    5.<a href="#null">null</a>   6.<a href="#对象">对象</a>

#### `Number, String, Boolean, Undefined, null 是原始数据类型，即没有属性或方法的数据（它们是硬编码，不能改变）；` 
####  `js中，除了原始值，都是对象（js对象是包含变量的变量，也可说 对象是键-值组成的无序集合,是动态类型）`

#### <a name="数值">①数值Number</a>

#### <p align="center">`js不区分整数和浮点数，统一用Number表示`</p>

```
                        123;    // 整数123
                        0.456;  // 浮点数0.456
                        1.23456e3;  // 科学技术法表示1.23456 * 1000，等同1234.5
                        -99;    // 负数
                        NaN;    // NAN表示Not a Number,无法计算结果时用NaN表示
                        Infinity;   // Infinity表示无限大，当数值超过了js的Number所能表示的最大值时，就表示Infinity
```

由于计算机使用 `二进制` ,有时候用 `十六进制` 表示整数比较方便， `十六进制用0x前缀和0-9、a-f表示` , 如 ： `0xff00, 0xa5b5c3d2` 。

#### <center>`Number 可以做四则运算，规则和数学一致`</center>

```
                        1 + 2;  // 3
                        (1 + 2) * 5 /2;   // 7.5
                        2 / 0;  //Infinity
                        0 / 0;  // NaN
                        10 % 3;  // 1
                        10.5 % 3;   // 1.5
```

#### <a name="字符串">②字符串String</a>

以单引号 ' 或双引号 " 括起来的任意文本， ' ' 或 " " 本身只是一种表示方式，不是字符串的一部分；字符串中含需要输出的引号时，使用 `\转义字符` 。

#### <center>通常，js字符串是原始值，但是，也可通过 `关键字new` 定义为对象, ***不建议这样做，会拖慢性能及产生不可预估的结果*** 。</center>

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

                console.log(str.length);    // 返回字符串长度 16

                console.log(str.indexOf("d"));    // 返回指定字符首次出现的索引,不存在则返回-1,第二个参数为起始检索位置,无法设置正则来检索  3
                
                console.log(str.lastIndexOf("d"))   // 返回指定字符最后一次出现的索引,第二参数为起始检索位置   11

                console.log(str.search("d"));   // 返回指定的特定值的位置,无法设置第二参数做起始检索位置

                console.log(str.slice(start, end));     // 提取字符串的某个部分并返回被提取的部分,参数为负则从字符串的尾部往回计数,省略第二参则返回字符串剩余部分

                console.log(str.substring(start, end));     // 类似slice(),但无法接受负的索引

                console.log(str.substr(start, length));     // 类似slice(), 但第二参指定的是提取长度

                console.log(str.replace("abc", 123));     // 用另一个值替换字符串中指定的值(大小写敏感,如需执行不敏感,用正则的 /i ),默认只替换首个匹配到的值(用正则 /g 可开启搜索整个字符串),且不会改变字符串的值,返回的是新字符串
                console.log(str.replace(/ABC/i, 123));
                console.log(str.replace(/abc/g, 123));

                console.log(str.toUpperCase());     // 字符串转换为大写,不改变原数据

                console.log(str.toLowerCase());     // 字符串转换为小写，不改变原数据

                console.log(str.concat('', str2));      // 连接两个或多个字符串,可替代 + 运算符,等同str + "" + str2

-------------------------------------------------
                console.log(str.trim());    // 删除字符串两端的空白符, IE8及以下不支持,可用正则搭配replace()代替
                console.log(str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ''));
                
                也可把trim函数添加到javascript String.prototype
                    if (!String.prototype.trim) {
                        String.prototype.trim = function () {
                            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
                        }
                    }
                    var str = "  用replace方案把trim函数添加到javascript String.prototype   ";
                    console.log(str.trim());
-----------------------------------------------------
                    console.log(str.charAt(position));      // 返回字符串中指定下标的字符

                    console.log(str.charCodeAt(position));  // 返回字符串中指定索引的字符unicode编码

                    console.log(str.split());   // 将字符串转换为数组

```                

#### <a name="布尔值">③布尔值Boolean</a>

#### <center>一个布尔值只有 `true, false` 两种值</center>

```
                        true;   // true
                        false;  // false
                        2 > 1;  // true
                        2 >= 3;    // false
```

#### <center> `&&` 同真为true，有假则false; `||` 有真为true; `！` true变false，false变true</center>

#### <center>javaScript 允许对任意数据类型做比较，需要注意 `相等运算符` , `==` : 会自动转换数据类型再比较，常会导致意外的结果； `===` ： 不会自动转换数据类型，数据类型不一致就返回false,一致再比较数值。 `因js的该设计缺陷，应坚持做比较时使用 === `

#### <center>`NaN` 这个特殊的Number与所有其他值都不相等，包括其自身。 `只能通过isNaN()函数判断NaN` </center>

#### <center> `浮点数的相等比较只能通过计算它们之差的绝对值，看是否小于某个阈值（原因是浮点数在运算过程中会产生误差，计算机无法精确标示无限循环小数）`</center>

```
                false == 0;     // true
                false === 0;    // false

                NaN === NaN;    // false
                isNaN(NaN);     // true

                1 / 3 === (1 - 2 / 3);    // false
                Math.abs(1 / 3 - (1 - 2 / 3)) < 0.0000001;      // true
```

