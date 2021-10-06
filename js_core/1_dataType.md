# 01. 데이터 타입

## 01. 데이터 타입의 종류

- 기본형 primitive type : `값이 담긴 주솟값`을 바로 복제
    - number
    - string
    - boolean
    - null
    - undefined
    - symbol(new!)


- 참조형 reference type : `값이 담긴 주솟값들로 이루어진 묶음`을 가리키는 주솟값을 복제
    - Object
        - Array
        - Function
        - Date
        - RegExp
        - Map
        - WeakMap
        - Set
        - WeakSet

> 기본형은 `불변성immutability`을 띈다?<br>
이게 대체 무슨 말인지 이해하기 위해 ₩메모리₩와 `데이터`, `식별자`와, `변수`의 개념을 알아야 한다!<br>
그리고 메모리 영역에서 자바스크립트의 데이터가 처리되는 과정을 살펴보면 알 수 있다.

## 02. 데이터 타입에 관한 배경지식 

### 1-2-1 메모리와 데이터
### 1-2-2

## 03. 변수 선언과 데이터 할당

### 1-3-1 변수 선언
### 1-3-2 데이터 할당

```javascript
var a; //변수 a 선언
a = 'abc'; //변수 a에 데이터 할당

var a = 'abc'; //변수 선언과 할당을 한 문장으로 표현
```

📌 <ins>실제로는 a의 위치에 'abc'를 직접 저장하지 않는다!</ins>

주소를 저장하는 <font color="pink">변수영역</font>과 실제 값을 저장하는 <font color="skyblue">데이터 영역</font>이 존재

1. <font color="pink">변수 영역</font>에서 빈 공간(<font color="pink">@1003</font>)을 확보한다.
2. 확보한 공간(<font color="pink">@1003</font>)의 식별자를 <font color="pink">a</font>로 지정한다.
3. <font color="skyblue">데이터 영역</font>의 빈 공간(<font color="skyblue">@5004</font>)에 문자열 '<font color="skyblue">abc</font>'를 저장한다.
4. <font color="pink">변수 영역</font>에서 <font color="pink">a</font>라는 식별자를 검색한다. => <font color="pink">@1003</font>
5. 앞서 저장한 문자열의 주소(<font color="skyblue">@5003</font>)를 <font color="pink">@1003</font>의 공간에 대입한다.

🧐 직접 저장하지 않고 한 단계 거치는 이유

: 데이터 `변환`을 자유롭게 할 수 있게 함과 동시에 `메모리`를 더욱 효율적으로 관리하기 위하여.

<small>
가변적인 문자열 데이터의 경우 데이터를 변환할 때마다 데이터의 크기에 관해 고민해야 함.<br>
'abc'를 'abcdef'로 바꿀경우 데이터 영역의 @5003이 'abcdef'로 바뀌는 것이 아닌 
'abcdef'라는 값을 가진 새로운 데이터 영역(@5004)가 생성되어 @1003에 주솟값이 @5004로 바뀐다.<br>
500개의 변수에 모두 'abc'를 할당한다면 이미 데이터 영역에 @5003이 존재하기 때문에
새로 생겨난 변수 영역에 모두 주솟값을 연결해주기만 하면 된다.(중복데이터 처리 효율 증가)
</small>

## 04. 기본형 데이터와 참조형 데이터

### 1-4-1 불변값

- 변수variable와 상수constant 그리고 불변값
  - 변수와 상수는 `변경가능성`으로 구분.
  - 바꿀 수 있으면 변수, 바꿀 수 없으면 상수.
  - 상수와 불변값도 비슷하지만 `메모리 영역`으로 구분.
  - 변수와 상수의 변경 대상은 <font color="pink">변수 영역 메모리</font>.
  - 불변성 여부에 대한 변경 대상은 <font color="skyblue">데이터 영역 메모리</font>.
  - 즉 변수와 상수는 주솟값을 바꾸냐 마냐이며 불변값은 실제 데이터값을 바꾸냐 마냐이다.
  - 기본형 데이터인 숫자, 문자열, boolean, null, undefined, Symbol은 모두 불변값이다.


