
<center>基于ThinkPHP 6.0的api</center>
===============

> 运行环境要求PHP7.1+。

[TOC]

#### 主要新特性

* 采用`PHP7`强类型（严格模式）
* 支持更多的`PSR`规范
* 原生多应用支持
* 更强大和易用的查询
* 全新的事件系统
* 模型事件和数据库事件统一纳入事件系统
* 模板引擎分离出核心
* 内部功能中间件化
* SESSION/Cookie机制改进
* 对Swoole以及协程支持改进
* 对IDE更加友好
* 统一和精简大量用法

#### 安装

~~~
composer create-project topthink/think tp 6.0.*
~~~

如果需要更新框架使用
~~~
composer update topthink/framework
~~~

#### 文档

[完全开发手册](https://www.kancloud.cn/manual/thinkphp6_0/content)

#### 强制Route
>route的作用是简化URL访问地址，并根据定义的路由类型做出正确的解析。

>强制Route: 可以隐藏真实地址，必须从定义的路由进来，否则抛出异常

##### 1.开启强制route:
![avatar](/public/pictures/aboutPhp-img/router.png)<br>

该模式必须严格给每一个访问地址定义路由规则（包括首页），否则将抛出异常。</br>

##### 2.添加路由规则：

>Route::rule('hello/\<name>', 'index/Index/hello', 'GET');

`rule()` 第一个参为 `路由规则` (通过Route访问的地址) , 第二个参为 `路由地址` (真实的路由地址，即控制器名/方法) ,第三个参为 `请求类型` (限制请求类型，默认支持任意请求)。</br>

**一旦开启强制路由，并设定请求类型，那么除规定的类型外其他类型请求都将失败，并且原来的访问地址会自动失效**。</br>

###### ①路由规则的参数:
可以包括 `动态变量` ,包含变量的称 `动态路由` ，如 `:变量名` 或 `<变量名>` 。**推荐第二种，有利于混合变量定义，并且会 `自动绑定到操作方法的对应参数`**。以 `[:变量名]` 或 `<变量名?>` 包含变量，表示 `可选变量`。不包含任何变量的路由称为 `静态路由` 。</br>
```
    Route::rule('/', 'index'); // 首页访问路由
    Route::rule('my', 'Member/myinfo'); // 静态地址路由
    Route::rule('blog/:id', 'Blog/read'); // 静态地址和动态地址结合
    Route::rule('new/:year/:month/:day', 'News/read'); // 静态地址和动态地址结合
    Route::rule(':user/:blog_id', 'Blog/read'); // 全动态地址
```
---

>Route::any('hello/\<name>', 'index/Index/hello');

`any()` 可以支持所有的请求类型，其实和 `rule()`是一样的，区别在于不用写第三个参数。</br>

当然，也可以使用`快捷注册路由规则`：
>Route::get('index/\<id>', 'index/user');
 Route::post('index/\<id>', 'index/user');
 Route::put('index/\<id>', 'index/user');
 Route::delete('index/\<id>', 'index/user');

也可以`批量注册路由规则`：
>Route::rule(['index/\<id>' => 'index/user', 'blog/<user_name>' => 'Blog/user']);

###### ②路由规则的额外参数：
>Route::get('news/\<id>', 'news/read')
->append(['status' => 1, 'app_id' => 5]);

路由跳转的时候支持额外传入参数对 ( `额外参数指的是不在URL里面的参数`，隐式传值到需要的操作中，有时候能够起到一定的安全防护作用)

**如果append方法中的变量和路由规则存在冲突的话，append方法传入的优先。**

##### 3.变量规则

###### ①局部变量规则，仅在当前路由有效：
```
    Route::get('new/<name>', 'News/read')
    ->pattern(['name' => '[\w|\-]+']);
```
**不需要开头添加^或者在最后添加$，也不支持模式修饰符，系统会自动添加.**

###### ②设置全局变量规则，全部路由有效：
```
    Route::pattern([
      'name': '\w+',
      'id': '\d+'
    ]);
```

##### 4.tp6开启redis及把redis作为session类型
① 开启redis作为缓存类型
![avatar](/public/pictures/aboutPhp-img/开启redis作为缓存类型.png)

② redis配置写在.env文件中
![avatar](/public/pictures/aboutPhp-img/redis配置写在env文件中.png)

③ 可以直接使用think\facade\Session类操作session
>think\facade\Session

>tp6**不支持操作原生 `$_SESSION` 数组和所有 `session_` 开头的函数**，只能通过 `Session` 类(或者助手函数)来操作。**会话数据统一在当前请求结束的时候统一写入，所以不要在 `session` 写入操作之后执行 `exit` 等中断操作，否则会导致 `Session` 数据写入失败。**</br>

**`session` 功能默认没有开启(API应用通常不需要使用Session),如果要开启 `Session`,需要在全局的中间件定义文件中加上下面的中间件定义：**
>'think\middleware\SessionInit'

② 配置redis作为session类型
![avatar](/public/pictures/aboutPhp-img/使用redis作为session类型.png)

##### 5.tp中数组转换字符串
>\$a = implode(',', $a);

##### 6.echo、print、print_r三者的区别

**echo**: 可以输出 `多个变量值`；`没有返回值`。</br>

**print:** `只有一个变量`，以 `字符串形式` 输出，不能输出数组和对象；`有返回值`。</br>

**print_r:** `可以输出string、int、float、array、object等`，输出array时会用解构表示；返回值为true；可 `通过print_r($str,true)使其不输出而返回处理后的值`。</br>

动态输出HTML内容，以print和echo来实现，实际使用中，两者功能几乎一致，但是，`echo可以输出多个字符串`,而 `print只能输出一个字符串`。</br>
`echo` 不需要圆括号，echo函数更像语句而不像函数。