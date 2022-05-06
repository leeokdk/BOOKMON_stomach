## 07. EXCEPTION HANDLING

### DAY 15

🔖 오늘 읽은 범위 : 7장 오류 처리

---

😃 **기억하고 싶은 내용**

#### 우아하고 고상하게 오류를 처리하는 기법과 고려 사항

- 오류코드보다 예외를 사용하라.
  > 예외를 사용하면 각각의 처리 구간이 구분되어 코드가 더 명확해진다.

- Try-Catch-Finally문부터 작성하라.
  > try ~ catch 구문으로 범위를 정의하고 난 뒤 오류나 예외가 발생하지 않는다는 가정하에 논리를 추가한다. 
  > 먼저 강제로 예외를 일으키는 테스트 케이스를 작성한 후 테스트를 통과하게 코드를 작성하는 방법을 사용하면 자연스럽게 try 블록의 트랜잭션 범위부터 구현하게 되므로 범위 내에서 트랜잭션 본질을 유지하기 쉬워진다.
  
- 미확인unchecked 예외를 사용하라.
  > 확인된 예외를 사용할 경우 하위 단계에서 코드를 변경하면 상위 단계 메서드 선언부를 전부 고쳐야 한다. 확인된 예외가 캡슐화를 깨버리는 현상은 참으로 유감스럽다.

- 예외에 의미를 제공하라.
  > 실패한 코드의 의도를 파악하려면 호출 스택만으로 부족하다. 오류 메시지에 정보를 담아 예외와 함께 던지자.

- 호출자를 고려해 예외 클래스를 정의하라.
  ```java
    // 호출하는 라이브러리 API를 감싸면서 예외 유형 하나를 반환하면 중복도 줄이고 쉽게 오류를 처리할 수 있다.
    LocalPort port = new LocalPort(12);
    try{
      port.open();
    } catch(PortDeviceFailure e) {
      reportError(e);
      logger.log(e.getMessage(), e);
    } finally {
      ...
    }

    // LocalPort 클래스는 ACMEPort 클래스가 던지는 예외를 잡아 반환하는 감싸기wrrapper 클래스 이다.
    public class LocalPort {
      private ACMEPort innerPort;

      public LocalPort(int portNumber){
        innerPort = new ACMEPort(portNumber);
      }

      public void open(){
        try{
          port.open();
        } catch(DeviceResponseException e) {
          throw new PortDeviceFailure(e);
        } catch(ATM1212UnlockedException e) {
          throw new PortDeviceFailure(e);
        } catch(GMXError e) {
          throw new PortDeviceFailure(e);
        }
      }
    }
  ```

- 정상 흐름을 정의하라.
  > 때로는 중단으로 예외를 처리하는 방식이 적합하지 않은 때도 있다.

- null을 반환하지 마라.
- null을 전달하지 마라.
  > null을 사용하는 것은 부가효과를 처리하려는 것과 다름이 없다. null을 반환하거나 전달하면 코드는 통제불능에 빠진다.
 


---

🤔 **오늘의 파트에 대한 소감**


- 예외처리에 대한 것은 어떻게 강조를 해도 부족한 부분이기 때문에 최대한 집중해서 읽으려고 노력하였다. 다만 나는 아직까지는 에러가 발생할 때를 제외하고는 자발적으로 try~catch 구문을 사용해본적은 없어서 이해하는데 시간이 걸렸다. 아무래도 직접 활용한 경험이 적어서 그런 것 같다. 하지만 예외 처리에 대해 생각해보고 공부하는 좋은 계기가 된 것 같다.

---

🔎 **추가로 알게 된 것**



---

🤟소감 3줄 요약 

- 오류코드보다 예외를 사용하라.
- Try-Catch-Finally문부터 작성하라.
- 코드가 null을 활용하도록 내버려두지 마라.

