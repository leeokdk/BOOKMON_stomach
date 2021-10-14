# 04. 콜백 함수
<hr>
<hr>

## 01. 콜백 함수란?

- 다른 코드(함수 또는 메서드)에게 인자로 넘겨줌으로써 그 제어권도 함께 위임한 함수
- 어떤 함수 X를 호출하면서 '특정 조건일 때 함수 Y를 실행해서 나에게 알려달라'는 요청을 함께 보내는 것
- 콜백 함수를 위임받은 코드는 자체적인 내부 로직에 의해 이 콜백 함수를 적절한 시점에 실행한다
- `제어권`을 넘겨준다는 것이 핵심

<hr>
<hr>

## 02. 제어권

<hr>

### 4-2-1 호출 시점

<hr>

### 4-2-2 인자

<hr>

### 4-2-3 this

<small> 3-1-4 복습 </small>

```text
...
콜백 함수도 함수이기 때문에 기본적으로는 this가 전역객체를 참조하지만, 제어권을 넘겨받을 코드에서 콜백 함수에 별도로 this가 될 대상을 지정한 경우에는 그 대상을 참조하게 된다.
...
```

- 위의 설명에서 `this가 될 대상을 지정한 경우`를 thisArg를 사용하는 map 메서드를 해부하며 알아보자.

```javascript
Array.prototype.map = function (callback, thisArg){
    var mappedArr = [];
    for (var i = 0; i < this.length; i++){
        var mappedValue = callback.call(thisArg || window, this[i], i, this);
		// 전역 객체가 있으면 전역객체를 첫번째 인자로 넣고 thisArg로 this 객체가 명시되면 그것을 넣는다.
		// this[i] : 값
		// i : 인덱스
		// this : 배열 자체
        mappedArr[i] = mappedValue;
    }
    return mappedArr; //배열반환
}
```

- 제어권을 넘겨받은 코드에서 call/apply 메서드의 첫번째 인자에 콜백 함수 내부에서의 this가 될 대상을 명시적으로 바인딩하는 것을 알 수 있다.

```javascript
setTimeout(function(){console.log(this)},300);
//Window { ... ]

[1,2,3,4].forEach(function(x){console.log(this)});
//Window {...} 4번 출력
[1,2,3,4].forEach(function(x){console.log(this)},[1,2,3,4]);
//[1, 2, 3, 4] 명시된 this 4번 출력
[1,2,3].forEach(function(x){console.log(this)},[1,2,3,4]);
//[1, 2, 3, 4] 명시된 this 3번 출력

document.body.innerHTML += '<button id="a">클릭</button>';
document.body.querySelector('#a').addEventListener('click', function(e){console.log(this,e);});
// <button id="a">클릭</button> PointerEvent { ... }
```

- setTimeout : 콜백함수의 this는 전역으로
- forEach : thisArg 존재하여 this 명시 가능
- addEventListener : 콜백함수의 this는 메서드의 this를 넘겨, addEventListener를 호출한 주체인 HTML 엘리먼트를 가리킴

<hr>
<hr>

## 03. 콜백 함수는 함수다

- 콜백 함수로 어떤 객체의 메서드를 전달하더라도 그 메서드는 메서드가 아닌 `함수`로서 호출된다.

```javascript
var obj = {
    vals: [1,2,3],
    logValues: function(v, i){
        console.log(this, v, i);
    }
};
obj.logValues(1,2); // 메서드 호출이므로 this는 obj를 가리킴
[1,2,3,4].forEach(obj.logValues); 
// forEach의 콜백함수로써 함수로 호출된 것이므로 obj와 연관이 없어짐 즉 함수만 전달됨
// 더욱이 forEach가 thisArg를 지정하지 않았으므로 this는 전역 객체를 바라봄
```

<hr>
<hr>

## 04. 콜백 함수 내부의 this에 다른 값 바인딩하기

- 기본적으로 콜백함수는 속했던 객체를 this로 바라볼 수 없다.
- 하지만 그럼에도 하고 싶은 경우.
  - 별도의 인자로 this를 받는 함수는 명시해주면 된다.
  - 그렇지 못하는 경우 this를 다른 변수에 담아 콜백 함수로 활용할 함수에서는 this 대신 그 변수를 사용하게 하고 이를 클로저로 만드는 방식을 사용'했'다.

```javascript
var obj1 = {
    name: 'obj1',
    func: function(){
        var self = this; //this를 self에 담고
        return function(){console.log(self.name);};
		//익명함수 선언과 동시에 반환
    }
};
var callback = obj1.func();
setTimeout(callback, 1500);

var obj2 = {
    name: 'obj2',
    func: obj1.func //함수부분 재활용
};
var callback2 = obj2.func();
setTimeout(callback2, 1500);

var obj3 = {name:'obj3'};
var callback3 = obj1.func.call(obj3); //함수부분 재활용
setTimeout(callback3, 1500);

/*
	var obj1 = {
		name: 'obj1',
		func: function() {
			console.log(obj1.name);
		}
	};
	var callback = obj1.func();
	setTimeout(callback, 1500);
*/
```

- 첫번째 obj1은 함수 내에 this를 우회하는 부분을 넣어서 코드를 재활용할 수 있도록 만들었다. 다양한 객체를 바라볼 필요가 있는 경우 이런식으로 사용한다.
- 두번째 obj1: 명시적으로 객체를 obj1로 지정했기 때문에 다른 객체를 바라보게 만들 수 없다. 재활용할 필요성이 없는 경우 사용한다.

- ES5부터는 bind 메서드를 통해 이런 번거로운 방법없이 편하게 사용할 수 있다.
- func.bind(thisArg)
```javascript
var obj1 = {
	name: 'obj1',
	func: function() {
		console.log(this.name);
	}
};

var callback1 = obj1.func.bind(obj1);
setTimeout(callback1, 1500);

var obj2 = { name: 'obj2' };
var callback2 = obj1.func.bind(obj2);
setTimeout(callback2, 2000); 
```

*분명히 오류가 걸렸었는데.. devtool: 'source-map' 한번 사용한 뒤로 브라우저 창을 새로 띄워도 오류가 안난다. 뭐가 뭔지 모르겠다..
*refused to evaluate a string as javascript because 'unsafe-eval'...

<hr>
<hr>

## 05. 콜백지옥과 비동기 제어

> `콜백 지옥`<br>
> 콜백함수를 익명 함수로 전달하는 과정이 반복되어 코드의 들여쓰기 수준이 감당하기 힘들 정도로 깊어지는 현상<br>
> 비동기 처리 로직을 위해 콜백 함수를 연속해서 사용할 때 발생

- 동기적인 코드: 현재 실행 중인 코드가 완료되어야 다음 코드를 실행. CPU 계산에 의해 즉시 처리가 가능한 대부분의 코드.
- 비동기적인 코드: 현재 실행 중인 코드의 완료 여부와 무관하게 즉시 다음 코드로 넘어감. 별도의 요청, 실행 대기, 보류 등과 관련된 코드.

- 웹의 복잡도가 높아진 만큼 비동기적인 코드의 비중이 예전보다 높아졌다.
- 그만큼 콜백지옥에 빠지기도 쉬워졌다.

```javascript
// 콜백지옥 예제
setTimeout(function(name){
    var coffeeList = name;
    console.log(coffeeList);
    
    setTimeout(function (name) {
        coffeeList += ', ' + name;
        console.log(coffeeList);
        
        setTimeout(function(name){
            coffeeList += ', '+name;
            console.log(coffeeList);
            
            setTimeout(function(name){
                coffeeList += ', '+name;
                console.log(coffeeList);
            }, 500, 'cafelatte');
        }, 500, 'cafemocha');
    }, 500, 'americano');
}, 500, 'espresso');
```

- 들여쓰기 수준이 과도하게 깊어져 알아보기 힘들다.
- 전달되는 순서가 아래에서 위로 향하고 있어서 어색하다.


- 해결 1. 익명의 콜백함수를 기명함수로 변환(콜백함수 분리)
```javascript
var coffeeList = '';
var addEspresso = function (name){
    coffeeList = name;
    console.log(coffeeList);
    setTimeout(addAmericano, 500, 'americano');
};
var addAmericano = function (name){
    coffeeList += ', ' + name;
    console.log(coffeeList);
    setTimeout(addMocha, 500, 'cafemocha');
};
var addMocha = function (name){
    coffeeList += ', ' + name;
    console.log(coffeeList);
    setTimeout(addLatte, 500, 'cafelatte');
};
var addLatte = function (name){
    coffeeList += ', ' + name;
    console.log(coffeeList);
};
setTimeout(addEspresso, 500, 'espresso');
```

- 코드의 가독성을 높이며 위에서부터 아래로 순서대로 읽어내려갈 수 있다.
- 전체를 즉시 실행 함수로 감싸면 변수노출도 예방할 수 있다.
- 하지만 일회성 함수를 전부 변수에 할당하는 노력을 감수해야한다.

- 해결 2. promise 이용(ES6)
```javascript
new Promise(function(resolve){
	setTimeout(function (){
		var name = 'espresso';
		console.log(name);
		resolve(name);
	},500);
}).then(function (prevName){
    return new Promise(function (resolve){
        setTimeout(function (){
            var name = prevName + ', americano';
            console.log(name);
            resolve(name);
        },500);
    });
}).then(function (prevName){
    return new Promise(function (resolve){
        setTimeout(function (){
            var name = prevName + ', cafemocha';
            console.log(name);
            resolve(name);
        },500);
    });
}).then(function (prevName){
    return new Promise(function (resolve){
        setTimeout(function (){
            var name = prevName + ', cafelatte';
            console.log(name);
            resolve(name);
        },500);
    });
});

//반복되는 부분 함수화
var addCoffee = function(name){
    return function (prevName){
        return new Promise(function (resolve){
            setTimeout(function (){
                var newName = prevName ? (prevName + ', ' + name) : name;
                console.log(newName);
                resolve(newName);
            },500);
        });
    };
};
addCoffee('espresso')()
	.then(addCoffee('americano'))
	.then(addCoffee('cafemocha'))
	.then(addCoffee('cafelatte'));
```

- new 연산자와 함께 호출한 Promise의 인자로 넘겨주는 콜백 함수는 호출할때 바로 실행된다.
- 하지만 내부에 resolve 또는 reject 함수를 호출하는 구문이 있을 경우 둘 중 하나가 실행되기 전까지는 다음(then) 또는 오류구문(catch)로 넘어가지 않는다.
- 비동기 작업이 완료될 때 resolve 또는 reject를 호출하여 동기적 표현이 가능하다.

- 해결 3. generator 이용(ES6)
```javascript
var addCoffee = function (prevName, name) {
	setTimeout(function () {
		coffeeMaker.next(prevName ? prevName + ', ' +name : name);
	}, 500);
};
var coffeGenerator = function* () {
	var espresso = yield addCoffee('', 'espresso');
	console.log(espresso);
	var americano = yield addCoffee(espresso, 'americano');
	console.log(americano);
	var cafemocha = yield addCoffee(americano, 'cafemocha');
	console.log(cafemocha);
	var cafelatte = yield addCoffee(cafemocha, 'cafelatte');
	console.log(cafelatte);
};
var coffeeMaker = coffeGenerator();
coffeeMaker.next();
```
- *이 붙은 함수가 Generator 함수이다.
- Generator 함수를 실행하면 next라는 메서드를 가진 Iterator가 반환한다.
- next 메서드를 호출하면 Generator 함수 내부에서 가장 먼저 등장하는 yield에서 함수의 실행을 멈춘다.
- 비동기 작업이 완료되는 시점마다 next 메서드를 호출해준다면 Generator 함수 내부의 소스가 순차적으로 진행될 수 있다.

- 해결 4. async/await (ES2017)
```javascript
// 기존 프라미스 함수
var addCoffee = function(name){
	return new Promise(function (resolve){
		setTimeout(function (){
			resolve(name);
		},500);
	});
};

// async/await 활용
var coffeeMaker = async function(){
	var coffeeList = '';
	var _addCoffee = async function(name){
		coffeeList += (coffeeList ? ',' : '') + await addCoffee(name);
	};
	await _addCoffee('espresso');
	console.log(coffeeList);
	await _addCoffee('americano');
	console.log(coffeeList);
	await _addCoffee('cafemocha');
	console.log(coffeeList);
	await _addCoffee('cafelatte');
	console.log(coffeeList);
};
coffeeMaker();
```
- 비동기 작업을 수행하고자 하는 함수 앞에 async 표시
- 함수 내부에서 실질적인 비동기 작업이 필요한 위치마다 await를 표시
  - 뒤의 내용이 Promise로 자동 전환
  - 해당 내용이 resolve된 이후에야 다음으로 진행(then과 비슷한 효과)

<hr>
<hr>

## 06. 정리
- 콜백 함수는 다른 코드에 인자로 넘겨줌으로써 그 `제어권`도 함께 위임한 함수다.
- 제어권을 넘겨받은 코드는 다음과 같은 제어권을 가진다.
  - 콜백 함수를 **호출하는 시점**을 스스로 판단해서 실행한다.
  - 콜백 함수를 호출할 때 **인자로 넘겨줄 값들 및 그 순서**가 정해져 있다. 이 순서를 따르지 않고 코드를 작성하면 엉뚱한 결과를 낳는다.
  - 콜백 함수의 this가 무엇을 바라보도록 할지가 정해져 있는 경우도 있다. 정하지 않는 경우에는 전역객체를 바라본다. 사용자 임의로 this를 바꾸고 싶을 경우 bind 메서드를 활용하면 된다.
- 어떤 함수에 인자로 메서드를 전달하더라도 이는 결국 `함수`로서 실행된다.
- 비동기 제어를 위해 콜백 함수를 사용하다 보면 콜백 지옥에 빠지기 쉽다. ECMAScript에는 **Promise, Generator, async/await** 등 콜백 지옥에서 벗어날 수 있는 방법이 존재한다.