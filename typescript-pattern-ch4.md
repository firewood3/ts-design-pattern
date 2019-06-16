# Structural Design Patterns
Structural Design Pattern은 객체의 구성에 대한 패턴이다.

- Structural Pattern을 면밀히 살펴보면 structural class pattern과 structural object patterns으로 나눌 수 있다.
- structural class pattern은 그들 자신의 "interested parites"을 활용하는 것이다.
- structural object pattern은 서로의 조각을 엮어서 사용하는 것이다.
- 이 두 structural pattern은 서로를 보완한다.

- Composite: 원시적인 composite object를 사용하여 구조를 빌드 하는 것이다. tree-like
- Decorator: 기능성을 클래스나 객체에 동적으로 추가하는 것이다. 
- Adapter: concrete adapters들의 실행에 의한 다른 adaptees들과 함께 작동하는 general interface를 제공한다. 하나의 콘텐츠 관리 시스템에서 서로다른 데이터베이스의 선택을 제공하는 것을 생각해보자.
- Bridge: 구현으로부터 추상을 분리하고 분리해낸 둘을 교환가능하게 만든다.
- Facade: 복잡한 하위 시스템들의 조합을 위한 간단한 인터페이스를 제공한다.
- Flyweight: 메모리 효율성과 성능을 향상시키기위해 많은 아이템을 사용하는 무상태의 객체들을 공유한다.
- Proxy: 추가적인 책임들을 취하는 대리자로써 행동한다.

## Composite Pattern


```html
<html>
  <head>
    <title>TypeScript</title>
  </head>
  <body>
    <h1>TypeScript</h1>
    <img />
  </body>
</html>
```

![composite pattern](/images/composite-pattern.png)