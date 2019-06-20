# The Callenge of Increasing Complexity

## Implementing the basics
- Creating the code base
- Defining the initial structure of the data to be synchronized
- Getting data by comparing timestamps
- Two-way synchronizing
- Things that went wrong while implementing the basic
    - Passing a data store from the server to the client does not make sense Making the relationships clear.

## Growing features
- Synchronizing multiple imtes
    - Simply replacing data type with an array
    - Server-centered synchronization
        - Synchronizing from the server to the client
        - Synchronizing from client to server
    - Synchronizing multiple types of data
    - Supporting multiple clients with incremental data
        - Updating the client side
        - Updating server side
    - Supporting more conflict merging
        - New data structures
        - Updating client side
        - Updating the server side
    - Things that go wrong while implementing everything
        - Piling up similar yet parallel processes
        - Data stores that are tremendously simplified

## Getting things right
- Finding abstraction
- Implementing strategies
- Wrapping stores

## Summary

# Creational Design Patterns
Creational Design Patterns는 객체의 생성 메커니즘을 다루는 패턴이다.

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

## Mediator Pattern

- UIComponents와 관련된 객체의 연결은 극도로 복잡해질수 있다.
- OOP는 객체에 따라 기능을 나눈다.
- 이는 코딩을 쉽고 명확하며 좀더 직관적으로 만든다.
- 그러나 이는 재사용성을 보장하지 않고 때때로는 코드를 나중에 다시볼때 이해하기 어렵게 만든다.
- (단일 Operation은 잘 알수 있을지라도, Operation간의 연결이 복잡해지면 혼란스러울 수 있다.)

- 사용자 프로필을 수정하는 페이지를 생각해보자.
- nickname과 tagline과 같은 input이 독립적으로 있는데 이는 각각 연관되어있다.
- 지역을 선택하는 경우를 예로 들면, 지역 선택은 상위 지역에서 하위 지역을 선택하는 트리형태로 될 수 있다.
- 하지만 이 객체들이 단 하나의 거대한 컨트롤러로 직접적으로 관리되어진다면, 재사용성에 제한이 생길 것이다.
- 이 상황에 수행된 코드는 사람들이 이해하기 어려운 경향이 있다.

- 중재자 패턴은 이러한 문제를 elements와 objects의 연결성(coupling)을 groups으로 분리하므로써 해결한다.
- 그리고 director를 elements의 a group 사이에 추가하고 다른 objects는 다음과 같이 나타난다.

![mediator-pattern](/images/mediator-pattern.png)

- 이 objects들은 다른 object와 함께 상호작용하는 하나의 객체로써 mediator를 형성한다.
- Mediator는 관련된 객체의 기능을 분리하므로써 적절한 캡슐화와 더 나은 재사용성을 갖는다.
- 중재자 패턴은 frontend 세계에서 WebComponent나 React의 컨셉으로 사용된다.

### Participants
- Mediator: 보통 프레임워크에서 미리 정의된 추상화나 골격(Skeleton)이다. mediator를 사용하여 의사소통하는 인터페이스를 정의한다.
- Concrete mediator: Mediator를 사용하는 Colleague classes의 협력을 관리한다.
- Colleague classes: 자신의 변경사항을 Mediator에게 알리고, Mediator의 변경을 받아들인다.


### Pattern Scope
- Mediator Pattern은 하나의 프로젝트의 많은 부분을 연결할 수 있지만, 개요에 직접적이거나 거대한 영향을 미치지 않는다.
- 증가되는 재사용성과 명확한 상호작용이 Mediator를 통해 소개되기 때문에 프로그램의 신용도를 높일 수 있다.
- Mediator Pattern은 코드의 품질을 높이는데 도움이 되고 프로젝트를 유지보수하기 쉽도록한다.

### Implementation
- React 같은 라이브러리에서는 Mediator pattern을 사용하기 매우 쉽다.

```ts
// 데이터 구조
interface LocationResult {
  country: string;
  province: string;
  city: string;
}
```

```ts
// Mediator
class LocationPicker {
  $country = $(document.createElement('select'));
  $province = $(document.createElement('select'));
  $city = $(document.createElement('select'));
  $element = $(document.createElement('div'))
    .append(this.$country)
    .append(this.$province)
    .append(this.$city);
  get value(): LocationResult {
    return {
      country: this.$country.val(),
      province: this.$province.val(),
      city: this.$city.val()
    };
  }
}
```

```ts
// slelect element의 option을 업데이트하는 메소드
private static setOptions($select: JQuery, values: string[]): void {
  $select.empty();
  // value로 넘어온 값을 opetion Element로 변환해주고 있음
  let $options = values.map(value => {
    return $(document.createElement('option'))
      .text(value)
      .val(value);
  });
  $select.append($options);
}
```

```ts
// Mediator에서 City, Province, City의 값을 전달하는 함수
private static getCountries(): string[] {
  return ['-'].concat([/* countries */]);
}
private static getProvincesByCountry(country: string): string[] {
  return ['-'].concat([/* provinces */]);
}
private static getCitiesByCountryAndProvince(country: string, province: string): string[] {
  return ['-'].concat([/* cities */]);
}
```

```ts
// 각 Component의 Option을 업데이트 해주는 함수
updateProvinceOptions(): void {
  let country: string = this.$country.val();
  let provinces = LocationPicker.getProvincesByCountry(country);
  LocationPicker.setOptions(this.$province, provinces);
  this.$city.val('-');
}
updateCityOptions(): void {
  let country: string = this.$country.val();
  let province: string = this.$province.val();
  let cities = LocationPicker.getCitiesByCountryAndProvince(country, province);
  LocationPicker.setOptions(this.$city, cities);
}
```

```ts
// colleagues들을 짜고, change event 리스너를 추가
constructor() {
  LocationPicker.setOptions(this.$country, LocationPicker.getCountries());
  LocationPicker.setOptions(this.$province, ['-']);
  LocationPicker.setOptions(this.$city, ['-']);
  this.$country.change(() => {
    this.updateProvinceOptions();
  });
  this.$province.change(() => {
    this.updateCityOptions();
  }); 
}
```

