# Creational Design Patterns
[Creational Design Patterns](https://en.wikipedia.org/wiki/Creational_pattern)는 객체의 생성 메커니즘을 다루는 패턴이다.
- 일반적으로 객체를 생성할 경우 객체 내부의 세부사항을 조립하는 유연성을 갖지 못한다. Creational Design Patterns은 이러한 문제점을 해결한다.

## Factory Method Pattern
객체의 생성과정을 하위 클래스에게 위임하는 패턴
- 생성되는 객체를 정확히 예측할 수 없거나, 하위 클래스들이 좀더 구체적인 버전의 객체를 생성하길 원한다면 이 패턴이 적용될 수 있다.

![factory method pattern](/images/factory-mathod-pattern.png)

### Participants
- Product: Rocket<br>=> Define an abstract class or an interface of a rocket that will be created as the product. 
- Concrete product: FregithRocket <br>=> Implement a specific rocket product.
- Creator: RocketFactory <br>=> Define the optionally abstract factory class that creates products.
- Concrete creator: <br>=> FreightRocketFactory

### Implementation
[전체코드](https://github.com/firewood3/ts-design-pattern/blob/master/ch03/factory-method/src/factory-method.ts)

Product와 Creator
```ts
class Rocket {
  payload!: Payload;
  stages!: Stage[];
}

class RocketFactory {
  buildRocket(): Rocket {
    let rocket = this.createRocket();
    let payload = this.createPayload();
    let stages = this.createStages();
    rocket.payload = payload;
    rocket.stages = stages;
    return rocket;
  }
	
  createRocket(): Rocket {
    return new Rocket();
  }
  
  createPayload(): Payload {
    return new Payload(0);
	}
	
  createStages(): Stage[] {
    let engine = new Engine(1000);
    let stage = new Stage([engine]);
    return [stage];
  }
}

let rocketFactory = new RocketFactory();
let rocket = rocketFactory.buildRocket();

console.log(rocket);

/*
  콘솔 출력
  Rocket {
    payload: Payload { weight: 0 },  
    stages: [ Stage { engines: [Array] } ] 
  }
 */
```

Concreate Product와 Concreate Creator
```ts
class FreightRocket extends Rocket { }

class FreightRocketFactory extends RocketFactory {
  nextSatelliteId = 0;

  createRocket(): FreightRocket {
		return new FreightRocket();
  }

  createPayload(): Satellite {
		return new Satellite(this.nextSatelliteId++);
	}

  createStages(): FreightRocketStages {
		return [
			new FirstStage(),
			new SecondStage()
		];
  } 
}

let freightRocketFactory = new FreightRocketFactory();
let freightRocket = freightRocketFactory.buildRocket();

console.log(freightRocket);

/*
콘솔 출력
FreightRocket {
  payload: Satellite { weight: 200, id: 0 },
  stages:[
    FirstStage { engines: [Array] },
    SecondStage { engines: [Array] }
  ]
}
*/
```