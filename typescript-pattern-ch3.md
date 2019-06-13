# Creational Design Patterns
Creational Design Patterns는 객체의 인스턴스화에 적용할 수 있는 디자인 패턴이다.

Payload, Engine, Stage을 프로퍼티로 가지는 Rocket을 객체를 생성해보자.
```ts
  class Payload {
     weight: number;
}
   class Engine {
     thrust: number;
}
   class Stage {
     engines: Engine[];
}
```

자바스크립트에서는 다음과 같은 방법으로 객체를 생성할 수 있었다.
- Constructor with new operator 
- Factory function

```js
 function Rocket() {
     this.payload = {
       name: 'cargo ship'
     };
     this.stages = [
       {
         engines: [
           // ...
           ] }
]; }
   var rocket = new Rocket();
```

```js
function buildRocket() {
     var rocket = {};
     rocket.payload = {
       name: 'cargo ship'
     };
     rocket.stages = [
       {
         thrusters: [
           // ...
] }
];
     return rocket;
   }
   var rocket = buildRocket();
```

처음의 코드는 건설 과정과와 리턴객체의 강한 연관이 있고, 반면에 두번째 코드는 리턴객체의 인터페이스를 암시한다.

그러나 이 두 코드 모두, rocket의 세부사항을 조립하는 유연성을 제공하지 못한다. 이것에 관한 이야기가 Creational Design Patterns이다.

## Factory method
인스턴스를 만들 때, 생성자를 사용하는 대신 팩토리 추상 클래스를 사용하는 방법. 하위 클래스가 implementing 메소드나 overriding 메소드로 변경할 수 있게 한다.

어떤 객체가 생성될지 예측할 수 없다. 이 하위 클래스들은 좀더 구체적인 버전의 객체를 생성하길 원한다. 이럴때, 펙토리메소드 패턴이 쓰일 수 있다.

다음은 펙토리 메소드 패턴이 적용가능한 구조이다.

![factory method pattern](/images/factory-mathod-pattern.png)

펙토리 메소드는 객체를 건설하는 공장으로써의 메소드이다.  전체 로켓을 건설하거나 싱글 컴포넌트를 건설하는 메소드가 팩토리 메소드가 될 수 있다.

대상 객체를 건설하기 위해 하나의 펙토리 메소드는 다른 펙토리메소드에 의존할 수 있다. 펙토리 메소드 패턴은 이유있는 합리적인 복잡성에 유연성을 제공합니다. 