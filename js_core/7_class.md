# 07. 클래스

<hr><hr>

## 01. 클래스와 인스턴스의 개념 이해
- ES6에 클래스 문법 추가
- 객체지향 프로그래밍의 클래스와 거의 흡사.
- 각 클래스의 상대적인 개념, `하위 클래스subClass`와 `상위 클래스superClass`.
- 하위 클래스는 상위 클래스를 포함 하면서 더 구체적인 개념이 추가된다.
- `인스턴스`: 어떤 클래스의 속성을 지니는 실존하는 개체, 어떤 조건에 부합하는 구체적인 예제
- `클래스`: 개체들이 이미 존재하는 상태에서 이들을 구분짓기 위해 사용
- 한 인스턴스는 하나의 클래스만을 바탕으로 만들어진다.

<hr><hr>

## 02. 자바스크립트의 클래스

- 스태틱 멤버(static member)
- 인스턴스 멤버(instance member)
- 인스턴스에 상속(인스턴스가 참조하는지)되는지 여부에 따라 분류.

> 🚨 단, 자바스크립트는 인스턴스에서도 직접 메서드를 정의할 수 있기 때문에 <br>
> `인스턴스 메서드`라는 용어로 전부 뭉뚱그려 사용하는 대신 `프로토타입 메서드`라고 정확히 정의한다.

예시.
```javascript
var Rectangle = function (width, height){
  this.width = width;
  this.height = height;
};

Rectangle.prototype.getArea = function(){
  return this.width * this.height;
};

Rectangle.isRectangle = function(instance){
  return instance instanceof Rectangle &&
	instance.width > 0 && instance.height > 0;
};

var rect1 = new Rectangle(3,4);
console.log(rect1.getArea()); // 12
console.log(Rectangle.isRectangle(rect1)); //true
console.log(rect1.isRectangle(rect1)); //Error
```

"프로그래밍 언어에서의 클래스는 사용하기에 따라 추상적일 수도 있고 구체적인 개체가 될 수도 있다"
- 일반적인 사용방식, 즉 구체적인 인스턴스가 사용할 메서드를 정의한 '틀'의 역할을 담당하는 목적을 가질 때의 클래스는 추상적인 개념
- 반면 클래스 자체를 this로 해서 직접 접근해야만 하는 스태틱 메서드를 호출할 때의 클래스는 그 자체가 하나의 개체.


<hr><hr>

## 03. 클래스 상속

> ES5까지 클래스가 없었던 자바스크립트의 클래스만들기 대여정<br>
> 7-4챕터에 ES6에서 드디어 생긴 클래스의 사용법이 있기 때문에 적당히 읽고 넘어갈 것. 

<hr>

### 7-3-1. 기본 구현

<hr>

### 7-3-2. 크래스가 구체적인 데이터를 지나지 않게 하는 방법

<hr>

### 7-3-3. constructor 복구하기

<hr>

### 7-3-4. 상위 클래스에의 접근 수단 제공

<hr><hr>

## 04. ES6의 클래스 및 클래스 상속

<hr><hr>

## 05. 정리

- 자바스크립트는 프로토타입 기반 언어라서 원래는 객체지향 언어의 클래스와 상속이 존재하지 않았다.
- 프로토타입 기능을 통해 클래스(추상개념)와 인스턴스(구현체)를 만들 수 있다.
- 프로토타입 메서드의 경우 구현체까지 사용가능하나 클래스에 직접 정의한 메서드는 스태틱 메서드로 구현체가 사용할 수 없다.
- 클래스 상속을 흉내내기 위한 세 가지 방법
  1. SubClass.prototype에 SuperClass의 인스턴스를 할당한 다음 프로퍼티를 모두 삭제하는 방법
  2. 빈 함수(Bridge)를 활용하는 방법
  3. Object.create를 활용하는 방법
- 세 가지 방법 모두 constructor 프로퍼티가 원래의 생성자 함수를 바라보도록 조정해야 한다.
- 상위 클래스에 접근할 수 있는 super를 구현할 수 있다.
- 물론 현재(ES6)는 자바스크립트에도 클래스가 추가되어 이보다 더 쉽게 구현할 수 있다.

<hr><hr>

## 06. 마치며

#### 클래스는 모든 학습을 아우르는 개념이다. 어려웠다면 다시 복습해보자.

