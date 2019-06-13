# Creational Design Patterns
[Creational Design Patterns](https://en.wikipedia.org/wiki/Creational_pattern)는 객체의 생성 메커니즘을 다루는 패턴이다.
- 의의: 일반적으로 객체를 생성할 경우 객체 내부의 세부사항을 조립하는 유연성을 갖지 못한다. Creational Design Patterns은 이러한 문제점을 해결한다.

Creational Design class diagram<br>
![Creational](/images/Creational_Pattern_Simple_Structure.png)

### Participants:
- Creator: Declares object interface. Returns object.
- ConcreteCreator: Implements object's interface.

## Factory method
생성자를 사용해 인스턴스를 만드는 대신, 추상 메서드를 사용하여 인스턴스를 만드는 방법.
- 생성되는 객체를 정확히 예측할 수 없거나, 하위 클래스들이 좀더 구체적인 버전의 객체를 생성하길 원한다면 이 패턴이 적용될 수 있다.

![factory method pattern](/images/factory-mathod-pattern.png)

### Participants
- Product: Rocket<br>=> Define an abstract class or an interface of a rocket that will be created as the product. 
- Concrete product: FregithRocket <br>=> Implement a specific rocket product.
- Creator: RocketFactory <br>=> Define the optionally abstract factory class that creates products.
- Concrete creator: <br>=> FreightRocketFactory

### Implementation




펙토리 메소드는 객체를 건설하는 공장으로써의 메소드이다.  전체 로켓을 건설하거나 싱글 컴포넌트를 건설하는 메소드가 팩토리 메소드가 될 수 있다.

대상 객체를 건설하기 위해 하나의 펙토리 메소드는 다른 펙토리메소드에 의존할 수 있다. 펙토리 메소드 패턴은 이유있는 합리적인 복잡성에 유연성을 제공합니다. 