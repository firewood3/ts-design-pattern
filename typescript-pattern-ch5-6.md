# Behavioral Design Pattern
- Chain of Responsibility: 다른 범위의 행동을 조직한다. 특정 명령(command object)에 대한 로직 처리(processing object)를 체인형식으로 수행하는 패턴이다.
- Command: 타겟 객체(receiver)를 조작하는 실행가능한 명령(Command)를 캡슐화(Invoker에서) 하는 패턴이다.
- Memento: 객체를 이전의 상태로 되돌릴 수 있도록 하는 기능을 제공하는 패턴이다.(rollback)
- Iterator: next()와 hasNext()메소드를 가지는 iterator를 사용해 Container의 element를 탐색하고 접근하는 패턴이다.
- Mediator: 서로 연관된 (컴포넌트)객체가 상호 작용하는 방식(functionality)을 캡슐화 하는 패턴이다.
- Strategy and Template : 런타임시에 알고리즘의 선택을 가능하게 해주는 패턴이다.
- State: 객체 내부의 상태 변경되었을 때, 행동도 변경하게 하는 패턴이다.
- Template: 상위 클래스에서 알고리즘의 구조를 제공하는 디자인 패턴
- Observer: Subject가 전달하는 상태를 Observer가 자동전파(push 방식) 받는 패턴
- Visitor: 객체의 구조(Composite)에서 알고리즘을 분리해내는 패턴이다.

## Chain of Responsibility pattern
- Chain of Responsibility pattern은 특정 명령에 대한 로직 처리를 체인형식으로 수행하는 패턴이다.
- 책임연쇄 패턴은 "command object"와 "processing objects"로 이루어 진다.
- "처리 객체"는 "명령 객체"를 처리하는 로직을 가지고, 다음 "처리객체"로 "명령 객체"를 보낸다.(Chain)
- 특정 "처리 객체"가 처리할 수 없는 "명령"은 다음 "처리 객체"로 넘겨진다.(Chain)
- 책임 연쇄 패턴은 if-else if ... else .. else ... endif 문의 객체 지향 버전이다.

### Diagram
![chain of responsibility pattern](/images/chainOfResponsibility-pattern.png)
- Sender는 특정 Reciver를 직접적으로 참조하지 않는다.
- 그대신 Sender는 요청을 처리하기위해 Handler 인터페이스를 참조한다.(handler.handleRequest()) 그러면 Sender는 Receiver 독립적으로 요청을 처리할 수 있다.
- Receiver1, Receiver2, Receiver3은 Handler 인터페이스를 구현하고 요청을 다른 Receiver에게 전달한다.

### Participants
- Handler: next라는 다음 Handler를 지정하는 메소드와 명령을 받아 처리되는 로직을 정의하는 인터페이스
- Concrete Handler: Handler를 구현한 객체
- Client: Handler 체인에게 명령을 전달

### Pattern Scope
- 목적에 따라 수행해야할 많은 시나리오가 있을 때 이 패턴을 사용할 수 있다.

### Implementation
```ts
// Help Information이라는 UI에서 Help창과 Feedback창을 선택적으로 나타내줄때.
// Commend Object
export type RequestType = 'help' | 'feedback';

export interface Request {
  type: RequestType;
}

export class Handler {
  private successor!: Handler;

  handle(request: Request): void {
    if (this.successor) {
      this.successor.handle(request);
    }
	}

	setSuccessor(successor: Handler): Handler {
		this.successor = successor;
		return successor;
  }
}

export class HelpHandler extends Handler {
  handle(request: Request): void {
    if (request.type === 'help') {
      console.log("Show help information.");
    } else {
      super.handle(request);
    }
  }
}

export class FeedbackHandler extends Handler {
  handle(request: Request): void {
    if (request.type === 'feedback') {
      console.log("Show feedback");
    } else {
      super.handle(request);
    }
  }
}

let handler = new Handler();
let helpHandler = handler.setSuccessor(new HelpHandler());
let feedbackHandler = helpHandler.setSuccessor(new FeedbackHandler());
// ... 체인..

handler.handle({type: "feedback"}); // Show feedback
handler.handle({type: "help"}); // Show Help Information



// LogLevel이 Notice이하인 경우, 에러 메시지를 이메일 전송, 다른 로그 레벨은 console.log 처리
export enum LogLevel {
	ERR = 1 , NOTICE = 2, DEBUG = 3
}

export abstract class Logger {	
	mask!: LogLevel;
	next!: Logger;

	setNext(logger: Logger) {
		this.next = logger;
		return logger;
	}

	message(msg: string, priority: LogLevel) {
		console.log(this.mask);
		console.log(priority);
		if (priority <= this.mask) {
			this.writeMessage(msg);
		}
		if (this.next != null) {
			this.next.message(msg, priority);
		}
	}

	abstract writeMessage(msg: string):void;
}

export class StdoutLogger extends Logger {
	constructor(mask: LogLevel) {
		super();
		super.mask = mask;
	}

	writeMessage(msg: string) {
		console.log(`stdout log: ${msg}`);
	}
}

export class EmailLogger extends Logger {
	constructor(mask: LogLevel) {
		super();
		super.mask = mask;
	}

	writeMessage(msg: string) {
		console.log(`Sending via email log: ${msg}`);
	}
}

export class StderrLogger extends Logger {
	constructor(mask: LogLevel) {
		super();
		super.mask = mask;
	}

	writeMessage(msg: string) {
		console.log(`stderr log: ${msg}`);
	}
}

// 책임 연쇄를 건설한다.
let logger: Logger,
	   next: Logger;

logger = new StdoutLogger(LogLevel.DEBUG);
next = logger.setNext(new EmailLogger(LogLevel.NOTICE));
next = next.setNext(new StderrLogger(LogLevel.ERR));

logger.message("debug", LogLevel.DEBUG);
logger.message("notice", LogLevel.NOTICE);
logger.message("err", LogLevel.ERR);

/*

// DEBUG 명령 => stdout 책임 처리
stdout log: debug

// notice 명령 => stdout, email 책임 처리
stdout log: notice
sending via email log: notice

// err 명령 => stdout, email, err 책임 처리
stdout log: err
sending via email log: err
stderr log: err

*/



// try..catch도 책임 연쇄 패턴의 예이다.
// TypeError나 Error를 생성
function foo() {
	let value = Math.random();

	if (value < 0.5) {
			throw new Error('Awesome error');
	} else if (value < 0.8) {
			throw new TypeError('Awesome type error');
	}
}

// TypeError 에러를 처리
function bar() {
	try {
			foo();
	} catch (error) {
			if (error instanceof TypeError) {
					console.log('Some type error occurs', error);
			} else {
					throw error;
			}
	}
}

// Error를 처리
function biu() {
	try {
			bar();
	} catch (error) {
			console.log('Some error occurs', error);
	}
}
// biu > bar > foo 순서로 호출됨
biu();
```

### Consequences
- Chain of Responsibility 패턴은 "command objects"를 발행하는 Client와 "processing objects"의 수행간에 연결을 분리한다. 
- Client는 처리 로직의 세부사항을 잘 알지 못해도 되고, Client에 새로운 명령에 따른 로직을 추가하는 것도 쉽다.
- Client의 명령을 처리하는데 상당한 유연성을 제공한다.
- Cytoscape의 캔버스를 클릭하는 이벤트의 종류를 "Command object"로 하고 이를 처리하는 Processing Objects로 분리하여 Client에서는 Handler에 Command만 보내면 되도록 프로그래밍

## Command Pattern
- Command Pattern은 타겟 객체(receiver)를 조작하는 실행가능한 명령(Command)를 캡슐화(Invoker에서) 하는 패턴이다.

### Diagram
![command-pattern2](/images/command-pattern2.png)
![command-pattern](/images/command-pattern.png)

- Invoker는 Command 인터페이스의 수행(command.execute())을 통해 Reciver를 조작한다.
- Invoker는 각 Command에 대해 독립적이다.
- Command1 클래스는 Command 인터페이스을 사용하여 receiver에게 요청한다.(receiver1.action1())

### Participants
- Command: Receiver를 조작하는 일반적인 인터페이스를 제공한다.
- Concrete Command: Command를 구현하며 관련된 자료구조에 대한 특정 행동을 수행한다.
- Receiver: 조작하길 원하는 타갯 객체
- Invoker: concrete command를 수행한다.
- Client: command와 receiver를 사용한다.

### Pattern Scope
- Command Pattern의 중요한 점은 명령부분과 receiver의 상태를 저장하는 부분을 분리해냈다는 것이다.

### Implemetation
```ts
// Context, Receiver
class TextContext {
    content = 'text content';

    print() {
     console.log(this.content);
    }

    // 책의 예제에서는 Receiver 부분에 action을 정의하지 않고 
    // Command 부분에서 처리하였다.
}

// Command
abstract class TextCommand {
    constructor(
        public context: TextContext
    ) { }

    abstract execute(...args: any[]): void;
}

// ConcreteCommand
class ReplaceCommand extends TextCommand {
    execute(index: number, length: number, text: string): void {
        let content = this.context.content;

        this.context.content =
            content.substr(0, index) +
            text +
            content.substr(index + length);
    }
}

// ConcreteCommand
class InsertCommand extends TextCommand {
    execute(index: number, text: string): void {
        let content = this.context.content;

        this.context.content =
            content.substr(0, index) +
            text +
            content.substr(index);
    }
}

// invoker
class TextCommandInvoker {
    constructor(
        private replaceCommand: ReplaceCommand,
        private insertCommand: InsertCommand
    ) { }

    replace(index: number, length: number, text: string): void {
        this.replaceCommand.execute(index, length, text);
    }
    
    insert(index: number, text: string): void {
        this.insertCommand.execute(index, text);
    }
}

// client
class Client {
    context: TextContext;
    textCommandInvoker: TextCommandInvoker;

    constructor() {
        this.context = new TextContext();
        this.textCommandInvoker = new TextCommandInvoker(new ReplaceCommand(this.context), new InsertCommand(this.context));
    }
    
    test() {
        this.context.print();
        this.textCommandInvoker.replace(0, 4, 'the');
        this.context.print();
        this.textCommandInvoker.insert(0, 'awesome ');
        this.context.print();
    }
}

let client = new Client();
client.test();
/*
text content
the content
awesome the content
*/
```

### Consequences
- Client에서 receiver를 조작할 때, Invoker(receiver에 접근할 수 없는)를 통해 Command를 수행하므로, Receiver에 접근하는 의존성을 낮추고 Receiver를 조작하는 확장성과 안정성을 높일 수 있다.
- Cy의 조작 부분을 Client의 Method(SetNodeSize, SetNodeColor, SetEdgeColor)로 만들었던 것을 Invoker로 빼서 만들면 Workspace, DataSource에서도 하나의 CyInvoker를 사용하도록 프로그래밍

## Memento Pattern
- Memento Pattern은 객체를 이전의 상태로 되돌릴 수 있는 기능을 제공하는 하는 패턴이다.(rollback)

### Diagram & Participants
![memento-pattern](/images/memento-pattern.png)
- Memento: 객체의 상태를 저장하고 회복 메소드(restore)를 정의
- Originator: 내부 상태 저장이 필요한 객체
- Caretaker: Memento들을 관리하고 Originator의 상태를 회복시키는 객체

### Pattern Scope
- Memento Pattern은 상태의 저장이나 회복을 Memento를 사용하여 Caretaker나 Originator로부터 분리한다.
- 상태 저장이나 회복이 간단한 프로세스에서 이미 decupling로직을 가지고 있다면,분리된 memento를 갖는 것이 별로 도움이 되지 않을 수 있다.

### Implementation
[ES6 Object.assign()](https://googlechrome.github.io/samples/object-assign-es6/)
[Prototype Array Shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

```ts
interface State { }

class Memento {
	private state: State;

	constructor(state: State) {
		this.state = Object.assign({} as State, state);
	}

	restore(state: State): void {
		Object.assign(state, this.state);
	}
}

class Originator {
	state!: State;

	get memento(): Memento {
		return new Memento(this.state);
	}

	set memento(memento: Memento) {
		memento.restore(this.state);
	}
}

class Caretaker {
	originator!: Originator;
	history: Memento[] = [];

	save(): void {
		this.history.push(this.originator.memento);
	}

	restore(): void {
		this.originator.memento = this.history.shift() as Memento;
	}

	test() {
		this.originator = new Originator();
		this.originator.state = {state: 'state1'}; // originator.state ==> { state: 'state1' }
		this.originator.state = {state: 'state2'}; // originator.state ==> { state: 'state2' }
		this.save();
		this.originator.state = {state: 'state3'};  // originator.state ==> { state: 'state3' }
		this.save();
		this.originator.state = {state: 'state4'}; // originator.state ==> { state: 'state4' }
		this.restore(); // originator.state ==> { state: 'state2' }
		this.originator.state = {state: 'state5'}; // originator.state ==> { state: 'state5' }
		this.restore(); // originator.state ==> { state: 'state3' }
	}
}
```

### Consequences
- Memento Pattern은 originator의 상태를 관리하는것을 쉽게 해주므로써, 저장과 복원하는 상태의 확장을 가능하게 한다.
- UndoRedo 라이브러리가 없다면, Cy의 움직임을 Memento로 관리하는 Caretaker를 사용하여 프로그래밍 

## Iterator Pattern
- next()와 hasNext()메소드를 가지는 iterator를 사용해 Container의 element를 탐색하고 접근하는 패턴

## Mediator Pattern
- Mediator Pattern은 서로 연관된 (컴포넌트)객체가 상호 작용하는 방식(functionality)을 캡슐화 하는 패턴이다.
- 서로 연관성 있는 객체(Componet or Colleague)들은 서로 의사소통(object를 주고받음)을 하는데 이 의사소통을 기능적으로 분리(Mediagtor)하도록 해준다.
- 중재자 패턴은 frontend 세계에서 WebComponent나 React의 컨셉으로 사용된다.
- React 같은 라이브러리에서는 Mediator pattern을 사용하기 매우 쉽다.

### Diagram
![mediator-pattern](/images/mediator-pattern.png)
![mediator-pattern2](/images/mediator-pattern2.png)

- 지역을 선택하는 경우의 자료구조는 상위지역에서 하위 지역을 선택하는 트리 구조로 이루어진다.
- CountryInput / ProvidenceInput / CityInput가 나타내어야 하는 데이터는 모두 연관되어있다.
- 이 연관된 데이터와 Component or Colleague의 이벤트를 관리하는 중재자(Mediator)를 재사용성과 유지보수성이 높아진다.


### Participants
- Mediator: 보통 프레임워크에서 미리 정의된 추상화나 골격(Skeleton)이다. mediator를 사용하여 의사소통하는 인터페이스를 정의한다.
- Concrete mediator: Mediator를 사용하는 Colleague classes의 협력을 관리한다.
- Colleague classes: 자신의 변경사항을 Mediator에게 알리고, Mediator의 변경을 받아들인다.

### Implementation
```ts
// 최종 주소값을 정의한 인터페이스
interface LocationResult {
  country: string;
  province: string;
  city: string;
}

// Mediator
class LocationPicker {
	// Component or Colleagues
	$country = $(document.createElement('select'));
	// Component or Colleagues
	$province = $(document.createElement('select'));
	// Component or Colleagues
  $city = $(document.createElement('select'));
  $element = $(document.createElement('div'))
    .append(this.$country)
    .append(this.$province)
		.append(this.$city);
		
  constructor() {
		// 각 Component에 초기값을 설정해주고 있음
    LocationPicker.setOptions(this.$country, LocationPicker.getCountries());
    LocationPicker.setOptions(this.$province, ['-']);
		LocationPicker.setOptions(this.$city, ['-']);
		
		// Component의 이벤트를 달아주고 있음
    this.$country.change(() => {
			// Country가 변경되면 Providence의 값을 변경해준다.
      this.updateProvinceOptions();
    });
    this.$province.change(() => {
			// Providence가 변경되면 City의 값을 변경해준다.
      this.updateCityOptions();
    });
	}
	
	// 최종 주소 값을 불러오는 메소드
  get value(): LocationResult {
    return {
      country: this.$country.val(),
      province: this.$province.val(),
      city: this.$city.val()
    };
	}
	
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

  private static setOptions($select: JQuery, values: string[]): void {
    $select.empty();
    let $options = values.map(value => {
      return $(document.createElement('option'))
        .text(value)
        .val(value);
    });
    $select.append($options);
  }
  private static getCountries(): string[] {
    return ['-'].concat([/* countries */]);
  }
  private static getProvincesByCountry(country: string): string[] {
    return ['-'].concat([/* provinces */]);
  }
  private static getCitiesByCountryAndProvince(country: string, province: string): string[] {
    return ['-'].concat([/* cities */]);
  }
}
```

### Pattern Scope & Consequences
- 증가되는 재사용성과 명확한 상호작용이 Mediator를 통해 소개되기 때문에 프로그램의 신용도를 높일 수 있다.
- Mediator Pattern은 코드의 품질을 높이는데 도움이 되고 프로젝트를 유지보수하기 쉽도록한다.
- Mediator Pattern이 더이상 효율적이지 않은 구조로 프로젝트가 성장할 수 있다. 그러므로 Mediator는 시간차원으로 적절히 디자인 되어야 한다.
- Component를 조금더 잘개 쪼개고 각 Component 간에 연관된 기능성을 ParentComponent나 Service에서 관리하도록 프로그래밍

## Strategy Pattern
- Strategy Pattern은 런타임시에 알고리즘의 선택을 가능하게 해주는 패턴이다.

### Diagram
![strategy-pattern](/images/strategy-pattern.png)
- Context는 알고리즘의 실행을 직접적으로 가지고 있지 않고 알고리즘을 Strategy 인터페이스로 간접 수행한다.(stragegy.algorithm())
- Context가 알고리즘의 실행에 대해 독립적이게 된다.

### Pattern Scope
- Strategy Pattern은 알고리즘의 캡슐화 방법을 제공하고 같은 OutLine에 알고리즘 관리를 쉽게 만든다.

### Implementation
```ts
interface BillingStrategy {
	getActPrice(rawPrice: number): number;
}

// 할인 없음
class NormalBillingStrategy implements BillingStrategy {
	getActPrice(rawPrice: number): number {
		return rawPrice;
	}	
}

// 50% 할인
class HappHourStrategy implements BillingStrategy {
	getActPrice(rawPrice: number): number {
		return rawPrice / 2;
	}	
}

class Customer {
	// 고객이 주문한 음료의 가격을 저장하는 배열
	drinks: number[] = [];
	calcStrategy: BillingStrategy;

	constructor(strategy :BillingStrategy) {
		this.calcStrategy = strategy;
	}

	add(price: number) {
		this.drinks.push(this.calcStrategy.getActPrice(price));
	}

	printBill() {
		let total = this.drinks.reduce((a,b)=>a + b);
		console.log("Total due: " + total);
		this.drinks = [];
	}
}

// 전략을 런타임시에 결정할 수 있다.
let customer = new Customer(new HappHourStrategy());
customer.add(100);
customer.add(200);
customer.add(300);

customer.printBill();

/*
Total due: 300
*/
```

### Consequences
- Strategy pattern은 Context에 알고리즘의 추가를 선택이고 쉽게 만든다.
- Graph를 분석 알고리즘을 사용자가 선택적으로 사용할 수 있도록 Strategy 패턴 적용
- Graph의 레이아웃을 적용하는 코드를 Strategy 패턴을 사용하여 분리

## State Pattern
- State Pattern은 객체 내부의 상태 변경되었을 때, 행동도 변경하게 하는 패턴이다.
- State Pattern은 유한 상태 머신(finite-state machines)의 개념에 가깝다.
- State Pattern은 Strategy Pattern으로 변경할 수 있다.(Strategy Pattern에 유한 상태의 계념을 추가한 패턴이다.)
- [참고: State Design Pattern in Java](https://www.baeldung.com/java-state-design-pattern)

### Diagram
![State-patten](/images/state-pattern.png)
- Context는 state-specific한 행동을 바로 하지 않는다. Context는 State를 참조하여 state-specific한 행동을 수행한다.(state.operation())
- Context는 state-specific한 행동에 대해서 독립적이다.
- state1과 state2는 state 인터페이스를 구현하며, state-specific한 행동을 캡슐화 하고, 실행한다.

### Participants
- State: 내부적으로 변경될 상태 객체의 인터페이스를 정의한다.
- ConcreteState: State 인터페이스를 구현하며 state-specific한 메서드를 실행한다.
- Context: 다른 상태를 관리하고 상태에 따른 행동을 수행한다.

### Pattern Scope
- State Pattern은 특징(상태)의 크기가 정해져 있는 코드에 적용할 수 있다.

### Implementation
```ts
// Package 상태 순서 : 주문-> 배달 -> 수령
interface PackageState {
	// 상태 변경 메소드
	next(pkg: Package): void;
	// 상태 변경 메소드
	prev(pkg: Package): void;
	// 행동 변경 메소드
	printStatus(): void;
}

class OrderedState implements PackageState {
	next(pkg: Package): void {
		pkg.state = new DeliveredState();
	}

	prev(pkg: Package): void {
		console.log("this spackage is in its root state.");
	}

	printStatus(): void {
		console.log('package ordered, not deliverd yet.');
	}
}

class DeliveredState implements PackageState {
	next(pkg: Package): void {
		pkg.state = new ReceivedState();
	}

	prev(pkg: Package): void {
		pkg.state = new OrderedState();
	}

	printStatus(): void {
		console.log("Package delivered, not received yet.");
	}
}

class ReceivedState implements PackageState {
	next(pkg: Package): void {
		console.log("this spackage is in its end state.");
	}

	prev(pkg: Package): void {
		pkg.state = new DeliveredState();
	}

	printStatus(): void {
		console.log("This package is already receive.");
	}
}

class Package {
	private _state: PackageState;

	constructor() {
		// 최초 상태
		this._state = new OrderedState();
	}

	get state(): PackageState {
		return this._state;
	}

	set state(state: PackageState) {
		this._state = state;
	}

	previousState() {
		// 상태 변경 메소드 호출
		this.state.prev(this);
	}

	nextState() {
		// 상태 변경 메소드 호출
		this.state.next(this);
	}

	printStatus() {
		// 상태에 따른 행동 메소드 호출
		this.state.printStatus();
	}
}

let pkg = new Package();

pkg.printStatus();
pkg.nextState(); // next: ordered -> delivered 
pkg.printStatus();
pkg.nextState(); // next: delivered -> received
pkg.printStatus();
pkg.previousState(); // previous: received -> delivered
pkg.printStatus();

/*
package ordered, not deliverd yet.
Package delivered, not received yet.
This package is already receive.
Package delivered, not received yet.
*/
```

### Consequences
- State Pattern은 Context의 메소드 조건부 분기를 줄인다.(Context 객체에서 상태 객체로 처리 로직을 분리하므로)
- State Pattern에서의 추가적인 상태 도입도 큰 문제가 되지 않는다.
- 유한 상태에 따라 다른 로직을 처리해야할 경우가 있을 때 이 패턴을 사용할 수 있겠다.

## Template Method Pattern
- 상위 클래스에서 알고리즘의 구조를 제공하는 디자인 패턴
- 하위 클래스에서는 알고리즘의 구조를 변경하지 않고 알고리즘의 특정 단계를 재정의 할 수 있도록 한다.
- [Cook Meal Example](https://www.avajava.com/tutorials/lessons/template-method-pattern.html)
- [Template Method in Typescript](https://refactoring.guru/design-patterns/template-method/typescript/example)

### Diagram
![template-method-pattern2](/images/template-method-pattern2.png)
- AbstractClass는 templateMethod() 메소드를 정의한다.
- TemplateMethod는 알고리즘의 뼈대를 정의한다.
- TemplateMethod는 변경 불가능한(invariant) 부분을 실행하고 primitive1()과 primitive2()를 호출하여 변경 가능한(variant) 부분을 실행한다.
- primitive1() 메소드와 primitive2 메소드는 AbstractClass를 실행한 SubClass1에서 정의된다.
- hookMethod는 알고리즘 특성상 선택적으로 구현할 수 있는 메소드

### Participants
- Abstract class: Template Method를 정의하고 variant 메소드의 인터페이스를 정의한다.
- Concrete class: Abstract class를 구현하고 variant 메소드들을 정의한다

### Pattern Scope
- Template Method Pattern 알고리즘의 구조에서 중복을 피하고 기능에 확장성을 부여한다.

### TextReader Example
![template-method-pattern](/images/template-method-pattern.png)
- TextReader는 상위 추상 클래스로 readAllText() 메소드를 사용하여 리소스의 모든 Text를 읽어오는 메소드이다.
- readAllText()는 Template Method로써 리소스를 byte로 변경하는 단계(decodeBytes())와 byte를 text로 변경하는 단계(readAllBytes())를 거친다.
- AsciiTextReader는 TextReader를 상속받고 decodeBytes 메소드를 재정의 한다. 
- FileAsciiTextReader와 HttpAsciiTextReader는 AsciiTextReader를 상속받고 readAllBytes() 메소드를 재정의 한다.
- HttpAsciiTextReader 인스턴스의 readAllTest()를 사용하면 Http 리소스의 텍스르를 반환을수 있고, FileAsciiTestReader 인스턴스의 readAllTest()를 사용하면 File 리소스의 텍스트를 반환받을 수 있다.

### Implementaion
```ts
abstract class TextReader {
  // Template Method
  async readAllText(): Promise<string> {
    let bytes = await this.readAllBytes();
    let text = this.decodeBytes(bytes);

    return text;
  }

  // abstract Method
  abstract async readAllBytes(): Promise<Buffer>;

  // abstract Method
  abstract decodeBytes(bytes: Buffer): string;
}

abstract class AsciiTextReader extends TextReader {
  decodeBytes(bytes: Buffer): string {
    return bytes.toString('ascii');
  }
}

class FileAsciiTextReader extends AsciiTextReader {
  constructor(
    public path: string
  ) {
    super();
  }

  async readAllBytes(): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      FS.readFile(this.path, (error, bytes) => {
        if (error) {
          reject(error);
        } else {
          resolve(bytes);
        }
      });
    });
  }
}

class HttpAsciiTextReader extends AsciiTextReader {
  constructor(
    public url: string
  ) {
    super();
  }

  async readAllBytes(): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      request(this.url, {
        encoding: null
      }, (error, bytes, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  }
}

// Http로 Text를 받아올 때는 HttpAsciiTextReader를 사용
let httpAsciiTextReader = new HttpAsciiTextReader('http://host/path');
let httpText = httpAsciiTextReader.readAllText();

// File에 있는 Text를 받아올 때는 FileAsciiTextReader를 사용
let fileAsciiTextReader = new FileAsciiTextReader('file://host/path');
let fileText = httpAsciiTextReader.readAllText();
```

### Consequences
- Strategy Pattern과 비교하면 Template Method Pattern은 기존 시스템의 알고리즘과 같은 알고리즘의 뼈대를 건설하는 편리함을 제공한다.
(기존 Client쪽의 알고리즘 코드를 Template Method로 분리할 수 있다.)
- Template Method Pattern의 실행은 Subclass에 의존하기 때문에, 같은 코드에 다른 브런치를 가지는 결과를 쉽게 만들어 낼 수 있다.


## Observer Pattern 
- Subject가 전달하는 상태를 Observer가 자동전파(push 방식) 받는 패턴

- 상태 전파를 받고자하는 Client는 Observer를 Subject객체에 등록하고, Subject 객체는 next()함수를 통해 등록된 Observer에게 상태를 전파하는 패턴
- Observer pattern의 Subject는 읽고 쓰기 가능
- Observable은 읽기 전용. 
- operator는 observable을 반환하고 push방식이 체인으로 연결되서 상태전파를 연속적으로 일어남(reactive programming)
- operator은 fure function의 사용(functional programming)

## Visitor Pattern
- Visitor Pattern은 객체의 구조(Composite)에서 알고리즘을 분리해내는 패턴이다.
- 분리의 실질적인 결과는 기존의 객체 구조를 변경하지 않고 새로운 기능을 더하는 능력이다.
- Element에 기능을 선택적으로 추가할 수 있다. / 기능들은 하나의 visitor에 모을 수 있다.
- Visitor Pattern은 보통 Composite와 함께 사용된다.

### Diagram
![visitor-pattern](/images/visitor-pattern.png)
- ElementA는 operation을 직접적으로 실행하지 못하고 operation의 실행을 Visitor에게 위임(Dispatches, delegates)한다(accept(visitor)=>visitor.visitElementA(this)). 
- ElementA의 operation을 전달받은 Visitor1은 Element1의 참조를 가지고 Element1에 특화된 명령을 처리한다.(visitElementA(e:ElementA))


### Pattern Scope
- Visitor Pattern은 특정 카테고리의 핵심 구조를 형성할 수 있다.
- 이것은 abstract syntax tree(AST)와 같은 자료구조에서 넓게 사용된다.

### Example
- 다음과 같은 DOM-like Tree를 가정해 보자. 
- 이 Tree를 HTML로 렌더링 할 수 있고 MarkDown으로 렌더링 할 수도 있다.
- 각 Html Node는 Element로 될 수 있고 각각의 마크업 언어로 렌더링 하는 기능은 Visitor에서 수행할 수 있다.
```json
[
  Text {
    content: "Hello, "
  },
  BoldText {
    content: "TypeScript"
  },
  Text {
    content: "! Popular editors:\n"
  },
  UnorderedList {
    items: [
      ListItem {
        content: "Visual Studio Code"
      }, ListItem {
        content: "Visual Studio"
      },
      ListItem {
        content: "WebStorm"
      }
    ]
  }
]
```

Html로 변환 결과
```html
Hello, <b>TypeScript</b>! Popular editors:
<ul>
  <li>Visual Studio Code</li>
  <li>Visual Studio</li>
  <li>WebStorm</li>
</ul>
```

MarkDown으로 변환 결과
```md
Hello, **TypeScript**! Popular editors:

- Visual Studio Code
- Visual Studio
- WebStorm
```

![visitor-pattern2](/images/visitor-pattern2.png)
![visitor-pattern3](/images/visitor-pattern3.png)

### Implementation
```ts
// element
interface Node {
  // Element는 자신의 기능 호출을 dispatch하는 accept()메소드를 정의한다.
  appendTo(visitor: NodeVisitor): void;
}

// visitor
interface NodeVisitor {
  // Visitor는 각 Element 마다 기능을 처리하는 메소드를 정의한다.
  appendText(text: Text): void;
  appendBold(text: BoldText): void;
  appendUnorderedList(list: UnorderedList): void;
  appendListItem(item: ListItem): void;
}

// Concrete Element
export class Text implements Node {
  constructor(
    public content: string
	) { }
	
  appendTo(visitor: NodeVisitor): void {
    visitor.appendText(this);
  }
}

// Concrete Element
class BoldText implements Node {
  constructor(
    public content: string
  ) { }

  appendTo(visitor: NodeVisitor): void {
    visitor.appendBold(this);
  }
}

// Concrete Element
class UnorderedList implements Node {
	// UnorderedList는 자식 Element[]를 Composite하고 있음
  constructor(
    public items: ListItem[]
  ) { }

  appendTo(visitor: NodeVisitor): void {
    visitor.appendUnorderedList(this);
  }
}

// Concrete Element
class ListItem implements Node {
  constructor(
    public content: string
  ) { }

  appendTo(visitor: NodeVisitor): void {
    visitor.appendListItem(this);
  }
}

// Concrete Visitor
class HTMLVisitor implements NodeVisitor {
	// 각 Element가 실행될때마다 output을 추가함
  output = '';

	// 각 Element에 맞는 실행을 구현함
  appendText(text: Text) {
    this.output += text.content;
  }

  appendBold(text: BoldText) {
    this.output += `<b>${text.content}</b>`;
  }

  appendUnorderedList(list: UnorderedList) {
		this.output += '<ul>';
			
    for (let item of list.items) {
      item.appendTo(this);
		}
			
    this.output += '</ul>';
  }

  appendListItem(item: ListItem) {
    this.output += `<li>${item.content}</li>`;
  }
}

// Concrete Visitor
class MarkdownVisitor implements NodeVisitor {
	// 각 Element가 실행될때마다 output을 추가함
  output = '';

  appendText(text: Text) {
    this.output += text.content;
  }

  appendBold(text: BoldText) {
    this.output += `**${text.content}**`;
  }

  appendUnorderedList(list: UnorderedList) {
		this.output += '\n';
			
    for (let item of list.items) {
      item.appendTo(this);
    }
  }

  appendListItem(item: ListItem) {
    this.output += `- ${item.content}\n`;
  }
}

// 모든 Node를 composite하는 객체
let nodes: Node[] = [
  new Text('Hello, '),
  new BoldText('TypeScript'),
  new Text('! Popular editors:\n'),
  new UnorderedList([
    new ListItem('Visual Studio Code'),
    new ListItem('Visual Studio'),
    new ListItem('WebStorm')
  ])
];

let htmlVisitor = new HTMLVisitor();
let markdownVisitor = new MarkdownVisitor();

// 모든 노드를 순회하면서 appendTo 명령을 실행함 
for (let node of nodes) {
  node.appendTo(htmlVisitor);
  node.appendTo(markdownVisitor);
}

console.log(htmlVisitor.output);
/*
Hello, <b>TypeScript</b>! Popular editors:
<ul><li>Visual Studio Code</li><li>Visual Studio</li><li>WebStorm</li></ul>
*/

console.log(markdownVisitor.output);
/*
Hello, **TypeScript**! Popular editors:

- Visual Studio Code
- Visual Studio
- WebStorm
*/
```

### Consequences
- Strategy Pattern과 Visitor Pattern 모두 객체의 알고리즘을 분리해내는 패턴이다.
- Strategy Pattern은 서로 다른 객체의 다른 동작을 절묘하게 추상화 하기는 여렵다. (Strategy pattern은 하나의 객체에 대해서 처리 알고리즘을 기술)
- 반면, Visitor Pattern은 서로 다른 객체의 다른 동작을 추상화 하기 쉽다.(Composite로 객체를 구성할 수 있고 각각의 객체에 대한 알고리즘 처리 과정을 Visitor에서 각자 구현)
- 연관성있는 객체의 구조에서 알고리즘을 분리해내고자 할때 Strategy Pattern을 사용할 수 있겠다.
- Composite Pattern을 사용한 Graph 분석 알고리즘을 사용할 때, Visitor Pattern을 사용하여 알고리즘 부분을 분리하도록 프로그래밍