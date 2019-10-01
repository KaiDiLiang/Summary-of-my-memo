### <p align="center">利用vue+axios+node构建简易的充值功能及相关知识点整理</p>

<p>主要是为了加深对async/await发送异步请求,通过cdn引入vue + axios,再以npm命令安装express进行后端返回固定的数据依赖,以server.js作为服务端的管理，public文件夹放置的index.html文件作为前端页面。</p>

---

    所需环境及依赖：node, express, nodemon, vue, axios

                    node install --save
                    npm install express --save
                    npm install nodemon --save


---

<p>server.js文件如下,构建最简单的web服务器</p>

```
    const express = require('express');
    const app = express();
    
    // express.static 提供静态文件,即html、css、js
    app.use(express.static('public'));

    <!-- 前端所需的数据处理代码块start -->
        // todo
    <!-- 数据处理代码块end -->

    app.listen(5000, () => {
        console.log('server start');    // 监听端口5000
    })
```
###### 1.index.html
<p>以cdn引入vue构建页面,通过cdn引入的axios发送ajax请求，以功能实现为主，css就忽略了。</p>
<p>为了得到输入的手机号，给input输入框加个v-model指令，绑定给phoneNum，充值数额则绑定给faceList,并以v-for展示后端返回的数额。</p>

###### 2.请求数据和数据返回
<p>功能实现需要动态获取充值面值，在用户输入号码并点击确定按钮后，得根据手机号拿到省市来确定可充值的面额，所以需要一个方法来请求获取省和市，所以给确定按钮处bind一个事件来发送请求，方法名为getLocation,接收参数phoneNum,后台接口名为phoneLocation; 
<p>拿到省市后，再请求获取充值面额，获取充值面额的方法为getFaceList,接收参数province和city,后台接口为faceList。</p>

---
### <p align="center">async/await</p>

<strong><p>async</strong> ：作为关键字放在函数前，`表示一个异步函数`，意味着该函数的执行 `不会阻塞后面代码的执行`。</p>

<strong><p>await</strong> ：作为关键字，`表示代码执行遇到它需要等待一下，不再向下执行，等待跟在其后的返回promise对象的表达式执行完毕并取得promise resolve的返回值再继续向下执行。` 但是，`只能放到async函数里面，它后面可以放任何表达式，常放的是一个返回promise对象的表达式`。</p>

##### 带async关键字的函数，返回值必定是promise对象,其实就是把返回值包装成promise对象。
<p>&ensp;&ensp;如果带async的函数返回的不是promise,会自动用Promise.resolve()包装。</p>
<p>&ensp;&ensp;如果带async关键字的函数显式地返回promise,那就以你返回的promise为准。</p>

```
                async function fn1() {
                    return 123;
                }

                function fn2() {
                    return 123;
                }

                console.log(fn1());     // Promise{<resolved>: 123}
                console.log(fn2());     // 123

```

##### async函数返回的是一个promise对象，要拿到promise的返回值，需用then()

```

                async function testAsync() {
                    return 'hello world';
                };

                testAsync().then((result) => {
                    console.log(result);
                });

                console.log('虽然在你后面，但是我先执行');

```
##### `async函数的返回值` 是一个 `promise对象`, 当调用该async函数时,async函数内部会根据逻辑代码去决定调用 `Promise.resolve()` 还是 `Promise.reject()`

```
                async function testAsync(flag) {
                    if (flag) {
                        return '我由promise.resolve()返回的';
                    } else {
                        throw '我是promise.reject()返回的';
                    }
                }

                console.log(testAsync(true));

                console.log(testAsync(false));

```

---

### <p align="center">Promise对象</p>

##### <p>`promise对象` 可以理解为一次必然执行的异步操作，在将来的某个时间点触发一个函数调用。</p>
<strong><p>用处：</strong>1.使用 `promise对象` 之后可以使用一种 `链式调用` 的方式来组织代码; 2.避免 `回调地狱`; 3.避免`同步或异步混乱`的问题; 4.在 `异步执行的流程中` ，把 `执行代码` 和 `处理结果的代码` 清晰地 `分离`。</p>

<strong><p>常用方法有 ：</strong> <a href="#resolve">resolve</a> , <a href="#reject">reject</a> , <a href="#then">then</a> , <a href="#catch">catch</a> , <a href="#all">all</a> ,一般通过 `new Promise()` 创建 `promise对象`, 但是也可以用 `promise.resolve()` 和 `promise.reject()` 快捷创建。</p>

<strong><p>`promise` 有3种状态 ：</strong> `Resolve(onFulfilled)` , `Reject(onRejected)` , `Pending()`</p>

&ensp;<p align="center">对通过 `new` 生成的 `promise对象` ，为了设置其值在 `resolve/reject` 时调用的 `回调函数`，可以使用 `promise.then()`</p>

#### 通过 `then()的链式调用或catch()调用` ,每次调用后都会返回 `新promise对象`

#### <a name="resolve">Promise.resolve()</a>
#### <a name="reject">Promise.reject()</a>

```
                var testPromise = new Promise((resolve, reject) => {
                    // 异步处理
                    // 成功调用resolve  往下传递参数，且只接受一个参数
                    // 失败调用reject  往下传递参数，且只接受一个参数
                })

                // Promise.resolve(value) 的返回值也是一个promise对象
                // resolve(11) 会让promise对象进入resolve状态，并将参数11传递给后面的then所指定的onFulfilled函数

                    Promise.resolve(11).then(value => console.log(value))    // 打印出 11
                             
                    new Promise((resolve, reject) => reject(new Error("我是错的")))

```

#### <a name="then">通过then()的链式调用或catch()调用 ,每次调用后都会返回`新promise对象`</a>

```
                
                var testPromise = new Promise(resolve => resolve(1));

                var thenPromise = testPromise.then(value => console.log(value));

                var catchPromise = thenPromise.catch(error => console.log(error));

                console.log(testPromise !== thenPromise);       // true
                console.log(thenPromise !== catchPromise);      // true

------------------------------------------------------------------------------------------------------------------------------------------------------------------------
                
            // 该种then()调用几乎是同事开始进行，且传给每个then的value都是1

                var testPromise = new Promise(resolve => resolve(1));

                testPromise.then(value => value * 2);

                testPromise.then(value => value * 2);

                // 因为每次调用then()使用的是不同的promise对象,除非连续调用then()才会导致结果不同
                
                testPromise.then(value => console.log("1" + value));        // 打印出 11

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

            // 该种then()调用属于方法链，传给每个then的value都是前一个promise对象的值

                var testPromise = new Promise(resolve => resolve(1));

                testPromise.then(value => value * 2).then(
                    value => value * 2).then(
                        value => "1" + value)     // 打印出 14

```

##### `resolve()` 调用`onFulfilled`方法，`reject()` 调用`onRejected`方法

```
                promise.then(onFulfilled, onRejected);
```

---

###### 出现异常的情况时采用，只指定onRejected回调函数即可，不过更推荐使用catch()

#### <a name="catch">promise.catch()</a>
 `promise.catch()`是 `Promise.then(undefined, onRejected)的别名`，用来注册当 `promise对象状态变为Rejected的回调函数`

```

                promise.then(undefined, onRejected);
                promise.catch(onRejected);
```

```
               var testPromise = ready => {
                   return new Promise((resolve, reject) => {
                       if (ready) {
                           resolve('我成功回来了');
                       } else {
                           reject('我迷路了');
                       }
                   })
               };

               testPromise(true).then(msg => console.log(msg),
               error => console.log(error))

```

---

##### Promise异步调用的操作：

```
            var testPromise = new Promise(resolve => {
                console.log(1);
                resolve(3);
            });

            testPromise.then(value => console.log(value));

            console.log(2);
        
```
<p>先后打印出 1, 2, 3。</br>
<p>代码从上往下执行，先输出了1，再调用resolve(3)，这时候promise对象变为确定状态(即调用onFulFilled方法)，因此第一个函数是成功调用的，但`promise对象是以异步方式调用的`,所以先执行console.log(2),输出2，最后才输出3。</p></br>

#### 理解是同步调用还是异步调用：

先输出"我是同步加载的，先执行我；"，再输出其后的其他console.log()语句，然后到"DOM Load Success;",最后才到setTimeout().</br>

`promise.then()的结果线程会排到其后面跟着的console.log()后面，但比计时/延时函数要早`

```
            var readyPromise = () => {
                return new Promise((resolve, reject) => {
                    var NowReadyState = document.readyState;
                    if (NowReadyState === 'interactive' || NowReadyState === 'complete') {
                        resolve();
                    } else {
                        window.addEventListener('DOMContentLoaded', resolve);
                    }
                });
            }

            readyPromise().then(() => console.log('DOM Load Success'));
            console.log('我是同步加载的，先执行我');
            console.log('promise对象是一次异步函数，执行到它的then方法时，会先把它后面的非延时/计时的代码块执行完，最后才输出它的then方法内的代码块结果');
            setTimeout(() => console.log('我是延时函数的结果'), 1000);

```

---

#### <a name="all">Promise.all()</a>

<strong>可以接受 `一个Promise对象的数组` 作为参数，只有 `作为参数的该数组内的所有promise对象都变为resolve或都变为rejected`时，Promise.all()才会继续后面的处理。</strong>

<p>多用于需要发起2个ajax请求时，不管其先后顺序，在2个请求返回的promise对象状态同时变为FulFilled或Rejected后才执行某些操作的情况。</p>

```
                var testPromise = new Promise(resolve => 
                    setTimeout(() => resolve(1), 3000)
                );       
                    
                var testPromise2 = new Promise(resolve => 
                    setTimeout(() => resolve(2), 1000)
                );

                Promise.all([testPromise, testPromise2]).then(value => console.log(value));

                // 打印出 [1, 2],如果不是使用了Promise.all()，
                那么将按照延时的长短返回[2, 1],但Promise.all()必须是在作为参数的数组中的所有promise对象都变为resolve才会返回结果，
                因此结果才出现按照数组的原顺序返回的结果

```
---

#### Promise.race()

`只要参数中有一个promise对象进入FulFilled或Rejected状态,程序就会停止,且会继续后面的处理逻辑`

```
                var testPromiseRace = delay => {
                    return new Promise(resolve => setTimeout(
                        resolve(delay)), delay);
                };

                Promise.race([
                    testPromiseRace(1),
                    testPromiseRace(32),    
                    testPromiseRace(64),
                    testPromiseRace(128)
                ]).then(value => console.log(value));       // 获取到第1个返回值后跳出代码块，直接执行后续的then()

                Promise.all([
                    testPromiseRace(1),
                    testPromiseRace(32),    
                    testPromiseRace(64),
                    testPromiseRace(128)
                ]).then(value => console.log(value));       // [1, 32, 64, 128]

```

<p>上面代码创建了4个promise对象，分别设置在1ms, 32ms, 64ms, 128ms 后变为确定状态，Promise.race()在获取到第一个返回值后跳出代码块，直接执行后续的then()；Promise.all()则会等全部promise对象返回才执行后续的then()。</p>

```
                var runPromise = new Promise(resolve => setTimeout(() => {
                    console.log(1);
                    resolve(2);
                }, 500));

                var runPromise2 = new Promise(resolve => setTimeout(() => {
                    console.log(3);
                    resolve(4);
                }, 1000));

                Promise.race([runPromise, runPromise2]).then(
                    value => console.log(value)         // 1 2 3
                );

```
<p></p>