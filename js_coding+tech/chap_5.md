## 5장 반복문을 단순하게 만들어라

### Tip 20. 화살표 함수로 반복문을 단순하게 만들어라
- 기명 함수 : 이름이 함수의 일부로 선언되어 있다
    ```js
    function namedFunction(){
    }
    ```
- 익명 함수 : 함수의 이름을 설정하지 않고 함수를 변수의 일부로 선언한다
    ```js
    const assignedFunction = function(){
    }
    ```
- 화살표 함수 : 함수 작성을 짧고 간결하게! 필요하지 않은 정보를 걷어내자.
  - 쓰지 않는 것 : ~~function 키워드, 인수를 감싸는 괄효, return 키워드, 중괄호~~ 
  - 그대신 써야 하는 것 : __=>__
  - 매개변수가 없거나 2개 이상일 때 `()`를 사용한다.
    ```js
    const key = () => {
      return 'abc123';
    };
    const greet = (first, last) => {
      return `Hello, ${capitalize(first)} ${capitalize(last)}`;
    };
    ```
  - 중괄호 안이 한줄일 때 `{}`와 `return` 도 필요없이 정의 가능하다.
    ```js
    const formaUser = name => `${capitalize(name)} is logged in.`;
    ```
  - 콜백함수를 인수로 받는 함수에서 원본함수를 호출할 때 화살표 함수를 이용하면 더 간략하게 전달 가능하다.
    ```javascript
    //콜백함수
    function applyCustomGreeting(name, callback) {
      return callback(capitalize(name));
    };
    //호출
    applyCustomGreeting('mark', name => `안녕, ${name}!`);
    ```
