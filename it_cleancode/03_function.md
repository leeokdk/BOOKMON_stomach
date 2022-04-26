## 03. MEANING NAME

### DAY 5

🔖 오늘 읽은 범위 : 3장 함수

---

😃 **기억하고 싶은 내용**


- 함수를 잘 만드는 법
    - 작게 만들어라!`Small`
    - 한 가지만 해라!`Do one thing`
    - 부수 효과를 일으키지 마라!`Have no side effects`
    - 함수당 추상화 수준은 하나로 해라!`One level of abstraction`
    - 서술적인 이름을 사용해라!`Use descriptive names`
    - 인수는 최소로!`Low number of arguments`
    - 명령과 조회를 분리해라!`Command Query Separation`
    - 오류 코드보다 예외를 사용해라!`Prefer exception to error Codes`
    - 반복하지 마라!`Don't repeat yourself`


🤔 **오늘의 파트에 대한 소감**


- 정말 중요한 내용들이었지만 위의 규칙들만 완벽하게 머리에 넣어 놓는다면 좋을 것 같다. 리팩터링 책을 읽을 때 저자가 항상 강조하던 말들이었는데 여기서도 봐서 새삼 반가웠다.
- 짧고 간단한 함수는 정말 도움이 된다. 근데 이름을 읽는 것만으로 이 함수가 어떤 것인지 안다면? 그래서 이전에 이름을 잘 지으라고 했나보다.


🔎 **추가로 알게 된 것**


- 영문판을 참고하면 좀 더 정리에 효과적인 듯 하다.

[Clean Code: functions](https://www.fabrizioduroni.it/2019/07/28/clean-code-functions/)

- 추상화 수준에 대해서 이해가 가지 않아 참고한 글.

[[CleanCode] 함수의 추상화 수준이란?](https://sosimhan-dev.tistory.com/4)


---

🤟소감 3줄 요약 

- 첫번째, 길고 복잡하고 들여쓰기 단계도 많고 중복된 루프를 돌며 인수 목록도 아주 긴 즉흥적인 함수를 작성한다.
- 두번째, 이 심각한 함수를 통과하는 단위 테스트 코드를 작성한다.
- 세번째, 코드를 다듬고 추가적인 함수를 만들고 이름을 바꾸고 중복을 제거하고 메서드를 줄이고 순서를 바꾸며 코드를 탈바꿈 시킨다. (단, 단위 테스트코드는 항상 통과할 것)
