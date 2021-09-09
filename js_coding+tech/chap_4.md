## 4장 조건문을 깔끔하게 작성하라

### Tip 17. 거짓 값이 있는 조건문을 축약하라.
- 거짓 값과 참 값을 이용해 서로 다른 정보를 확인하는 방법!
    - `===` : 두 값이 서로 동일할 뿐만 아니라 자료형도 같은 것.
    - 거짓 값(false와 동등)
        - false, null, 0, NaN(숫자아님), '', ""`
        - 배열과 객체는 비어도 항상 참 값.
- 참과 거짓 값을 이용해 긴 표현식을 축약할 수 있다.
    - 값의 존재 여부를 확인하고 어떤 값이라도 있는지만 확인.

### Tip 18. 삼항 연산자로 빠르게 데이터를 확인하라.
- 삼항 연산자는 `변수의 재할당`을 줄일 수 있다.
    - if-else 구문은 변수의 유효범위와 맞물려 과한 할당, 선언, 충돌 등을 야기한다.
    - 깔끔하게 한 줄 가능!
    - 다만 과하게 여러 개 연결해 사용하는 것은 가독성을 떨어트리고 단순함이라는 가치도 잃는다. 그럴땐 오히려 if문을 사용하는게 낫다.
- **삼항 연산자는 코드를 `단순화`할 수 있어서 사용할만한 가치가 있는 경우에만 쓰자.**

### Tip 19. 단락 평가를 이용해 효율성을 극대화하라.
- 단락 평가short circuiting
  > 가장 타당한 정보를 먼저 위치시켜서 정보 확인을 건너 뛰는 것
    - 데이터가 항상 유효한 경우, 굳이 여러번 재확인할 필요가 없다.
    - 참/거짓을 따지는 경우는 확인한 값을 곧바로 할당하면 불필요한 작업을 거치지 않을 수 있다.
        - 참 값이면 무조건 통과 시켜주는 || 연산자를 활용
           ```js
           const name = 'joe' || 'I have no name';
           name;
           ```
  삼항연산자를 더 간결하게!
     ```js
     const icon = {path : 'image.jpg'}
     function getIconPath(icon){
     const path = icon.path || 'uploads/default.png';
     return `http://assets.foo.com/${path}`;
     }
    ```
    - 장점
        - 표현식의 끝에 기본값을 추가할 수 있다 == 변수가 거짓 값이 되지 않는다
- 특정 컬렉션의 메서드 또는 동작을 사용할 때 단락 평가를 사용하면 오류를 방지할 수 있다.
    - 내용이 없는 경우
      ```js
      const userConfig1 = {} //지정된 배열이 없음
      const userConfig2 = {images : [] } //내용이 없음
      ```
        - 거짓값이 발생하는 즉시 종료하는 && 연산자를 활용
      ```js
      function getImage(userconfig){
        const images = userConfig.images; //내용, 속성이 없으면 undefined == 거짓 값
        return images && images.length ? images[0] : 'default.png';
      }
      ```
      