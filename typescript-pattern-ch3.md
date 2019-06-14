# Creational Design Patterns
[Creational Design Patterns](https://en.wikipedia.org/wiki/Creational_pattern)는 객체의 생성 메커니즘을 다루는 패턴이다.
- 일반적으로 객체(Product)를 생성할 경우 내부의 세부사항(Components)을 조립하는 유연성을 갖지 못한다. Creational Design Patterns은 이러한 문제점을 해결한다.

## Factory Method Pattern
객체의 생성과정을 하위 클래스에게 위임하는 패턴
- 생성되는 객체를 정확히 예측할 수 없거나, 하위 클래스들이 좀더 구체적인 버전의 객체를 생성하길 원한다면 이 패턴이 적용될 수 있다.
- 기능이 확장되면 그에 맞는 펙토리 메소드를 구현하면 되므로 확장성이 뛰어난 코드를 만들 수 있다. [참조](https://meylady.tistory.com/59)
- 객체의 생성 과정을 하위 클래스에 위임하므로서 결합도가 낮아진다. [참조](https://jdm.kr/blog/180)

### Factory Method Diagram
![factory method pattern](/images/factory-mathod-pattern.png)

### Participants
- Product: Rocket<br>=> Product는 추상 클래스나 인터페이스로 정의
- Concrete product: FregithRocket <br>=> 특정 product의 구현체
- Creator: RocketFactory <br>=> Product를 생성하는 추상 클래스
- Concrete creator: FreightRocketFactory <br>=> 요구되는 Concrete Product를 생성하기 위해 특정 펙토리 메소드를 구현하거나 오버라이드 한 클래스

### pattern scope
- 펙토리 메소드 패턴은 Product를 만드는 것을 생성자 실행으로부터 분리하고, Concrete product를 만드는 하위 클래스(Concrete creator)를 생성할 수 있도록 한다.
- concrete creator는 전체의 Product를 만드는 것 보다 각 세부사항(Components)를 만드는 것에 조금 더 중점을 둔다.

### Implementation
```ts
class Payload {
  constructor(
      public weight: number
  ) { }
}

class Engine {
  constructor(
      public thrust: number
  ) { }
}

class Stage {
  constructor(
      public engines: Engine[]
  ) { }
}

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

class FreightRocket extends Rocket { }

class Satellite extends Payload {
  constructor(
    public id: number
  ) {
     super(200);
  }
}

class FirstStage extends Stage {
  constructor() {
    super([
      new Engine(1000),
      new Engine(1000),
      new Engine(1000),
      new Engine(1000)
  ]); }
}

class SecondStage extends Stage {
  constructor() {
	super([
		new Engine(1000)
	]); }
}

type FreightRocketStages = [FirstStage, SecondStage];

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


let rocketFactory = new RocketFactory();
let rocket = rocketFactory.buildRocket();

console.log(rocket);

let freightRocketFactory = new FreightRocketFactory();
let freightRocket = freightRocketFactory.buildRocket();

console.log(freightRocket);

/*
콘솔 출력
Rocket {
  payload: Payload { weight: 0 },  
  stages: [ Stage { engines: [Array] } ] 
}
	

FreightRocket {
  payload: Satellite { weight: 200, id: 0 },
  stages:[
    FirstStage { engines: [Array] },
    SecondStage { engines: [Array] }
  ]
}
*/
```

## Abstract Factory Pattern
추상 팩토리 패턴은 concrete products를 구체화하지 않고 팩토리 메소드들의 컬렉션을 인터페이스로 제공한다. 이렇게 하면, 전체의 펙토리는 교환가능하게 된다.

팩토리 메소드와 다른점은 client로 불리는 부분으로 Product를 빌드하는 과정을 추출해낸 것이다. 이렇게 하므로써, factory 부분은 좀더 Components(Product의 property)에 집중할 수 있다.

### Abstract Factory Diagram
![abstract-factory-pattern](/images/abstract-factory-pattern.png)

### participants
- Abstract factory: RocketFactory<br>=> Components를 제작하거나 복잡한 Products를 제조하기위한 인터페이스로써의 산업 표준 팩토리를 정의 한 것.
- Concrete factory: ExperimentalRocketFactory, FreightRocketFacory<br>=> Absctract factory의 구현체이며, Concrete Products를 건설한다.
- Abstract products: Rocket, Payload, Stage[] <br>=> Factory로부터 빌드될 Product를 정의한 인터페이스
- Concrete products: ExperimentalRocket/FreightRocket, ExperimentalPayload/Satellite<br>=> Concrete Factory로부터 제조되는 실제 Products
- Client: <br>=> Factory의 생산 공정을 배치한다. 이때의 Factory는 Abstract factory의 산업 표준을 준수해야한다.

### Pattern scope
- Abstract Factory 패턴은 서로다른 Concrete factory들의 상위에 추상화를 만든다.
- 만약 Concrete factory가 한개라면, Factory Method Pattern 처럼 작동한다.
- Abstract Factory 패턴의 중요한점은 product를 교체할 수 있다는 점이다. (Factory가 추상화 되어 있어서 Client의 매개변수로 서로다른 Concrete Factory를 받을 수 있고, 그래서 concrete product를 교체할 수 있게된다.)
- 이패턴은 UI 구현에서 컴포넌트로 자주 사용된다.

### Implementation
[전체코드](https://github.com/firewood3/ts-design-pattern/blob/master/ch03/abstract-factory/src/absctract-method.ts)

```ts
class Engine {
	constructor(
			public thrust: number
	) { }
}
interface Payload {
	weight: number;
}
interface Stage {
	engines: Engine[];
}

// Abstract Product
interface Rocket {
	payload: Payload;
	stages: Stage[];
}

// Abstract Factory
interface RocketFactory<T extends Rocket> {
	createRocket(): T;
	createPayload(): Payload;
	createStages(): Stage[];
}

// Client
class Client {
	buildRocket<T extends Rocket>(factory: RocketFactory<T>): T {
		let rocket = factory.createRocket();
		rocket.payload = factory.createPayload();
		rocket.stages = factory.createStages();
		return rocket;
	}
}

class ExperimentalPayload implements Payload {
	weight!: number;
}

class ExperimentalRocketStage implements Stage {
	engines!: Engine[];
}

// Concrete Product
class ExperimentalRocket implements Rocket {
	payload!: ExperimentalPayload;
	stages!: [ExperimentalRocketStage];
}

// Concrete Factory
class ExperimentalRocketFactory implements RocketFactory<ExperimentalRocket> {
	createRocket(): ExperimentalRocket {
			return new ExperimentalRocket();
	}
	
	createPayload(): ExperimentalPayload {
			return new ExperimentalPayload();
	}
	
	createStages(): [ExperimentalRocketStage] {
			return [new ExperimentalRocketStage()];
	}
}

class Satellite implements Payload {
	constructor(
			public id: number,
			public weight: number
	) { }
}

class FreightRocketFirstStage implements Stage {
	engines!: Engine[];
}

class FreightRocketSecondStage implements Stage {
	engines!: Engine[];
}

type FreightRocketStages = [FreightRocketFirstStage, FreightRocketSecondStage];

// Concrete Product
class FreightRocket implements Rocket {
	payload!: Satellite;
	stages!: FreightRocketStages;
}

// Concrete Factory
class FreightRocketFactory implements RocketFactory<FreightRocket> {
	nextSatelliteId = 0;
	
	createRocket(): FreightRocket {
			return new FreightRocket();
	}
	
	createPayload(): Satellite {
			return new Satellite(this.nextSatelliteId++, 100);
	}
	
	createStages(): FreightRocketStages {
			return [
					new FreightRocketFirstStage(),
					new FreightRocketSecondStage()
			];
	}
}

let client = new Client();
// Client의 매개변수로 들어오는 Concrete Factory를 교체하면 Product도 교체된다.
let experimentalRocket = client.buildRocket(new ExperimentalRocketFactory());
let freightRocket = client.buildRocket(new FreightRocketFactory());
console.log(experimentalRocket);
console.log(freightRocket);

/*
콘솔 출력
ExperimentalRocket {
  payload: ExperimentalPayload {},
  stages: [ ExperimentalRocketStage {} ] }
FreightRocket {
  payload: Satellite { id: 0, weight: 100 },
  stages: [ FreightRocketFirstStage {}, FreightRocketSecondStage {} ] }
*/
```

### Consequences
- Abstract Factory pattern을 사용하면 전체 제품군을 쉽게 변경할 수 있다.
- Abstract Factory pattern과 Factory Method 패턴에서 여러 Components로 구성된 Product를 만들고자 할때, 각각의 Factory에서는 Product를 Component별로 분리하여 유연성을 얻을 수 있다.
- 그러나 고정된 Product의 Component가 요구사항을 충족시킬수 없을 때에는 Builder Pattern을 생각해 볼 수 있다.

## Builder Pattern
> Builder Pattern은 product의 내부 구조를 캡슐화 하고, building steps만 드러낸다. 그리고 이를 통해 복잡한 객체를보다 유연하게 추상화하고 구현할 수 있다.

### Builder Pattern Diagram
![Builder pattern](/images/builder-pattern.png)

### Participants
- Builder: RocketBuilder <br>=> Product를 건설하는 인터페이스들를 정의
- Concrete builder: FalconBuilder <br>=> Product의 부분을 건설하는 인터페이스를 구현한 메소드
- Director: <br>=> Product를 만들기 위해 steps를 정의하고 builder와 협력을 정의
- Final product: Falcon <br> => Builder에 의해 건설된 Product


### Pattern scope
- 최종적인 Product를 생성하기위해 operations(Buidling step)을 추상화하여 추출하는 것은 Abstract Factory Pattern과 비슷하다.
- Builder Pattern은 각 building step 간의 관계에 보다 더 중점을 두어야 한다. (building step들이 독립적이지 못하다.)
- 반면, Abstract Factory Pattern은 각각 컴포넌트를 생성하는데 중점을 준다. (각 component는 독립적이다.)

### Implementation
```ts
class Engine {
	constructor(
			public thrust: number
	) { }
}

interface Payload {
	weight: number;
}

interface Stage {
	engines: Engine[];
}

interface Rocket {
	payload: Payload;
}

abstract class RocketBuilder<TRocket extends Rocket, TPayload extends Payload> {
	createRocket(): void { }
	
	addPayload(payload: TPayload): void { }
	
	addStages(): void { }
	
	refuelRocket(): void { }
	
	get rocket(): TRocket {
			throw new Error('Not implemented');
	}
}

class Director {
	prepareRocket<TRocket extends Rocket, TPayload extends Payload>(
			builder: RocketBuilder<TRocket, TPayload>,
			payload: TPayload
	): TRocket {
			builder.createRocket();
			builder.addPayload(payload);
			builder.addStages();
			builder.refuelRocket();
			return builder.rocket;
	}
}

// SOUNDING ROCKET

class Probe implements Payload {
	weight!: number;
}

class SolidRocketEngine extends Engine { }

class SoundingRocket implements Rocket {
	payload!: Probe;
	engine!: Engine;
}

class SoundingRocketBuilder extends RocketBuilder<SoundingRocket, Probe> {
	private buildingRocket!: SoundingRocket;
	
	createRocket(): void {
			this.buildingRocket = new SoundingRocket();
	}
	
	addPayload(probe: Probe): void {
			this.buildingRocket.payload = probe;
	}
	
	addStages(): void {
			let payload = this.buildingRocket.payload;
			this.buildingRocket.engine = new SolidRocketEngine(payload.weight);
	}
	
	get rocket(): SoundingRocket {
			return this.buildingRocket;
	}
}

// FREIGHT ROCKET

class Satellite implements Payload {
	constructor(
			public id: number,
			public weight: number
	) { }
}

class LiquidRocketEngine extends Engine {
	fuelLevel = 0;
	
	refuel(level: number): void {
			this.fuelLevel = level;
	}
}

abstract class LiquidRocketStage implements Stage {
	engines: LiquidRocketEngine[] = [];
	
	refuel(level = 100): void {
			for (let engine of this.engines) {
					engine.refuel(level);
			}
	}
}

class FreightRocketFirstStage extends LiquidRocketStage {
	constructor(thrust: number) {
			super();
			
			let enginesNumber = 4;
			let singleEngineThrust = thrust / enginesNumber;
			
			for (let i = 0; i < enginesNumber; i++) {
					this.engines.push(new LiquidRocketEngine(singleEngineThrust));
			}
	}
}

class FreightRocketSecondStage extends LiquidRocketStage {
	constructor(thrust: number) {
			super();
			this.engines.push(new LiquidRocketEngine(thrust));
	}
}

type FreightRocketStages = [FreightRocketFirstStage, FreightRocketSecondStage];

class FreightRocket implements Rocket {
	payload!: Satellite;
	// @ts-ignore
	stages = [] as FreightRocketStages;
}

class FreightRocketBuilder extends RocketBuilder<FreightRocket, Satellite> {
	private buildingRocket!: FreightRocket;
	
	createRocket(): void {
			this.buildingRocket = new FreightRocket();
	}
	
	addPayload(satellite: Satellite): void {
			this.buildingRocket.payload = satellite;
	}
	
	addStages(): void {
			let rocket = this.buildingRocket;
			let payload = rocket.payload;
			let stages = rocket.stages;
			
			stages[0] = new FreightRocketFirstStage(payload.weight * 4);
			
			if (payload.weight >= FreightRocketBuilder.oneStageMax) {
					stages[1] = new FreightRocketSecondStage(payload.weight);
			}
	}
	
	refuel(): void {
			let rocket = this.buildingRocket;
			let payload = rocket.payload;
			let stages = rocket.stages;
			
			let oneMax = FreightRocketBuilder.oneStageMax;
			let twoMax = FreightRocketBuilder.twoStagesMax;
			
			let weight = payload.weight;
			
			stages[0].refuel(Math.min(weight, oneMax) / oneMax * 100);
			
			if (weight >= oneMax) {
					stages[1].refuel((weight - oneMax) / (twoMax - oneMax) * 100);
			}
	}
	
	get rocket(): FreightRocket {
			return this.buildingRocket;
	}
	
	static oneStageMax = 1000;
	static twoStagesMax = 2000;
}


let director = new Director();

let soundingRocketBuilder = new SoundingRocketBuilder();
let probe = new Probe();
let soundingRocket = director.prepareRocket(soundingRocketBuilder, probe);

console.log(soundingRocket);

let freightRocketBuilder = new FreightRocketBuilder();
let satellite = new Satellite(0, 1200);
let freightRocket = director.prepareRocket(freightRocketBuilder, satellite);

console.log(freightRocket);
	 
/*
SoundingRocket {
  payload: Probe {},
	engine: SolidRocketEngine { thrust: } }
	
FreightRocket {
  stages:
   [ FreightRocketFirstStage { engines: [Array] },
     FreightRocketSecondStage { engines: [Array] } ],
  payload: Satellite { id: 0, weight: 1200 } }
*/
```

### Consequences
- Building step은 서로에게 영향을 미치는 방식으로 설계되었기 때문에 Final Product의 구조를 보다 잘 제어 할 수 있다.
- 서브 클래스에서는 Director를 변경하지 않는 선에서 최대한의 유연성을 발휘할 수 있다.


## Prototype Pattern
자바스크립트는 prototype 기반의 언어이기 때문에, 상속관계에 있는 하위 클래스의 인스턴스를 초기값을 지정해 줄때, prototype을 사용할 수 있다.
```ts
class Base {
    state: number;
}

let base = new Base();
base.state = 1;

class Derived extends Base { }
Derived.prototype = base;

//derived의 state 값은 base의 state값으로 초기화 되었다.
let derived = new Derived();
console.log(derived.state); //1
```

>ES6에서는 prototype 변경자를 숨긴다.


## Singleton Pattern
객체의 인스턴스가 단 하나만 존재해야할 때 싱클톤 패턴을 사용할 수 있다. [참고](https://basarat.gitbooks.io/typescript/docs/tips/singleton.html)

```ts
class Singleton {
    private static instance: Singleton;
    private constructor() {
        // do something construct...
    }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
            // ... any one time initialization goes here ...
        }
        return Singleton.instance;
    }
    someMethod() { }
}

let something = new Singleton() // Error: constructor of 'Singleton' is private.

let instance = Singleton.getInstance() // do something with the instance...

```