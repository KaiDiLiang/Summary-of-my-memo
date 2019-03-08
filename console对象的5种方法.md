# console对象的5种方法

## 显示信息(5种方法都可以使用printf风格的占位符，只支持字符（%s）、整数（%d 或 %i）、浮点数（%f）、对象（%o）)

  * #### console.log('显示信息')
  * #### console.info('一般信息')
  * #### console.debug('出错信息')
  * #### console.warn('警告信息')
  * #### console.error('错误信息')
	
## a.占位符

   ### ***console.log(%d);***  
	``
			console.log('%d年%d月%d日', 2019,3,8);		// 2019年3月8日  
			console.log('圆周率是%f', 3.1415926);		// 圆周率是3.1415926
			
	``

   ### ***console.log(%o);***
	``  
			var dog = {};  
			dog.name = '大毛';  
			dog.color = 'yellow';  
			console.log('%o', dog);		// {name: "大毛", color: "yellow"}  
	``
 
## b.	分组显示(信息过多时使用 console.group() 和 console.End() )
#### 点击组标题则该组信息折叠或展开

	``  
			console.group('第一组信息');
			console.log('第一组第一条');
			console.log('第一组第二条')；
			console.groupEnd();
			console.group('第二组信息');
			console.log('第二组第一条');
			console.log('第二组第二条');
			console.groupEnd();  
	``		

## d.	显示一个对象所有的属性和方法（console.dir()）

	``  
			var dog = {};
			dog.name = '大毛';
			dog.color = 'yellow';
			dog.bark = function() {alert('汪汪汪')};		// 为dog对象，添加bark()方法
			console.log('%o', dog); 

			console.dir(dog);				// Object ,打印dog对象的所有属性及方法  
			
	``

## e.	显示网页的某个节点（node）所包含的html/xml代码（console.dirxml(）)

	``  
			var table = document,getElementById('table1');

			console.dirxml(table);		// 显示该节点包含的代码  
			
	``

## f.	判断一个表达式或变量是否为真（console.assert()）
#### 结果为否才会在控制台输出相应信息，并抛出一个异常

	``  
	
			var result = 0;
			console.assert( result );		//  false, 控制台输出相应信息并抛出异常

			var year = 2000;
			console.assert( year == 2019 );		//  false, 控制台输出相应信息并抛出异常  
			
	``

## g.	追踪函数的调用轨迹（console.trace()）

	``  
	
			function add(a, b) {
			console.trace();
			return a + b;
			}

			var x1 = add3(1,1);
			function add3(a,b){return add2(a,b);}
			function add2(a,b){return add1(a,b);}
			function add1(a,b){return add(a,b);}
			// 运行后，显示add()的调用轨迹，从上到下：add()、add1()、 add2()、add3()

			es6可简写为：function add(a, b) {
							console.trace();
			return a + b;
			}

			let x = add3(1, 1);
			(a, b) => add2(a ,b);
			(a, b) => add1(a, b);
			(a, b) => add(a, b);  
			
	``  
	

## h.	显示代码的运行时间（console.time() 和 console.timeEnd()）

	``  
	
			console.time('计时器一');
			for( let i = 0; i < 1000; i++ ) {
			for( let j = 0; j < 1000; j++ ) {}
			}

			console.timeEnd('计时器一');  
			
	``  

## j.	分析程序各个部分的运行时间（console.profile()）

	``  
	
			function Foo() {
			for( var i = 0; i < 10; i++ ) {
			funcA( 1000 );
			}
			funcB( 10000 );
			}

			function funcA(count){
			for( var i = 0; i < count; i++ ) {

			}
			}

			function funcB(count){
			for( var i = 0; i < count; i++ ) {

			}
			}

			console.profile('性能分析器一');
			Foo();
			console.profileEnd();  
			
	``  		

#### 控制台会显示一张性能分析表，标题栏提示，一共运行了12个函数，共耗时2.656毫秒。其中funcA()运		行10次，耗时1.391毫秒，最短运行时间0.123毫秒，最长0.284毫秒，平均0.139毫秒；funcB()运行1次，耗时1.229ms毫秒。  

#### 除了使用console.profile()方法，firebug还提供了一个"概况"（Profiler）按钮。第一次点击该按钮，"性能分析" 开始，你可以对网页进行某种操作（比如ajax操作），然后第二次点击该按钮，"性能分析"结束，该操作引发的所有运算就会进行性能分析。
