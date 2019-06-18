# Structural Design Patterns
Structural Design Pattern은 객체의 구성에 대한 패턴이다.

- Structural Pattern을 면밀히 살펴보면 structural class pattern과 structural object patterns으로 나눌 수 있다.
- structural class pattern은 그들 자신의 "interested parites"을 활용하는 것이다.
- structural object pattern은 서로의 조각을 엮어서 사용하는 것이다.
- 이 두 structural pattern은 서로를 보완한다.

- Composite: 원시적인 composite object를 사용하여 구조를 빌드 하는 것이다. tree-like
- Decorator: 기능성을 클래스나 객체에 동적으로 추가하는 것이다. 
- Adapter: concrete adapters들의 실행에 의한 다른 adaptees들과 함께 작동하는 general interface를 제공한다.
- Bridge: 구현으로부터 추상을 분리하고 분리해낸 둘을 교환가능하게 만든다.
- Facade: 복잡한 하위 시스템들의 조합을 위한 간단한 인터페이스를 제공한다.
- Flyweight: 메모리 효율성과 성능을 향상시키기위해 많은 아이템을 사용하는 무상태의 객체들을 공유한다.
- Proxy: 추가적인 책임들을 취하는 대리자로써 행동한다.

## Composite Pattern
- [Composite Pattern](https://en.wikipedia.org/wiki/Composite_pattern)은 같은 방식으로 작동하는 객체들의 그룹을 설명하는 패턴이다.
- Composite는 객체를 부분-집합으로 표현되는 재귀적인 트리 구조로 "구성(compose)" 된다.
- 예를들어 DOM에서 모든 element들은 Node 클래스의 인스턴스이고, 이 Node 인스턴스들은 tree 구조로 이루어진다.

### Diagram
![composite pattern 2](/images/composite-pattern2.png)

### DOM structure example
![composite pattern](/images/composite-pattern.png)

### Participants
- Component: composite 객체의 기본 동작을 선언하는 인터페이스이다.
<br>ex) Node
- Composite: 자식 컴포넌트들을 저장하고 컴포넌트의 동작을 정의한다.
<br>ex) HtmlHeadElement, HTMLBodyElement
- Leaf: 원시 컴포넌트의 동작을 정의한다.
<br>ex) TextNode, HTMLImageElement
- client : composite와 component를 조작한다.

### Pattern Scope
- 객체들이 트리 구조의 컴포넌트로 재귀적으로 추상화할 수 있을 때, Composite Pattern을 사용할 수 있다.
- ex) 뷰 컴포넌트 트리, 파일 시스템 구조

### Implementation
```ts
// component
export interface HTMLNode {	
  print(): void;
}

// composite
export class CompositeHTMLNode implements HTMLNode{
	nodes = Array<HTMLNode>();

	constructor(
		private tagName: string
	) { }

	print(): void {
		console.log(`<${this.tagName}>`);
		this.nodes.forEach(node=>node.print());
		console.log(`</${this.tagName}>`);
	}

	addNode(node: HTMLNode) {
		this.nodes.push(node);
	}
}

// leaf
export class ImageNode implements HTMLNode { 
	constructor(
		private imagePath: string
	) { }

	print(): void {
		console.log(`<img src="${this.imagePath}"></img>`);
	}
}

// leaf
export class TextNode implements HTMLNode {
	constructor(
		private message: string
	) { }

	print(): void {
		console.log(this.message);
	}
}

// client
export class HTMLDom {
	html!: CompositeHTMLNode;

	constructor() {
		this.initHTML();
	}

	initHTML() {
		this.html = new CompositeHTMLNode("html");
		
		let head = new CompositeHTMLNode("head");
		let body = new CompositeHTMLNode("body");
		let title = new CompositeHTMLNode("title");
		let heading = new CompositeHTMLNode("heading");

		let imageInBody = new ImageNode("src/hello_world.png");
		let textInTitle = new TextNode("Hello world");
		let textInHeading = new TextNode("Welcome to hello world");


		this.html.addNode(head);
		this.html.addNode(body);

		head.addNode(title);
		title.addNode(textInTitle);

		body.addNode(heading);
		body.addNode(imageInBody);
		heading.addNode(textInHeading);
	}

	printHtml() {
		this.html.print();
	}
}


let dom = new HTMLDom();
dom.printHtml();

/*
콘솔 출력

<html>
<head>
<title>
Hello world
</title>
</head>
<body>
<heading>
Welcome to hello world
</heading>
<img src="src/hello_world.png"></img>
</body>
</html>

*/
```

## Decorator Pattern
- 데코레이터 패턴은 객체에 원래 기능은 손상시키지 않으면서 새로운 기능을 동적으로 더하는 패턴이다.
- 데코레이터 패턴은 기능을 추가하는 작업을 하는 Composite로 작동된다.
- 데코레이터 패턴은 재귀적으로 각 데코레이터의 기능을 수행한다.

### Diagram
![decorator](/images/decorator-pattern.png)
![decorator2](/images/decorator-pattern2.png)

### Participants
- Component: 기능을 추가할 객체의 인터페이스를 정의
<br>ex) UIComponent
- ConcreteComponent: 추가적인 기능을 정의한다.
<br>ex) TextComponent
- Decorator: 데코레이터가될 Component의 참조를 정의하고 Component의 context를 관리한다.
<br>ex) Decorator
- ConcreteDecorator: Decorator를 상속받아 추가적인 기능을 정의한다.
<br>ex) ColorDecorator, FontDecorator

### Implementation
```ts
// Component
abstract class UIComponent {
	abstract draw(): void;
}

export class Text {
	color: string = "";
	font: string = "";
	size: string = "";

	constructor(public content: string) {
	}

	setColor(color: string): void {
		this.color = color;
	}
	setFont(font: string): void {
		this.font = font;
	}
	setSize(size: string): void {
		this.size = size;
	}

	draw(): void {
		console.log(`${this.content} / ${this.color} / ${this.font} / ${this.size}`);
	}
}

// Concrete Component
export class TextComponent extends UIComponent {
	constructor(public texts: Text[]) {
		super();
	}

	draw(): void {
			for (let text of this.texts) {
					text.draw();
			}
	}
}

// Decorator
export class Decorator extends UIComponent {
	constructor(
			public component: TextComponent
	) {
			super();
	}

	get texts(): Text[] {
			return this.component.texts;
	}

	draw(): void {
			this.component.draw();
	}
}

// Concrete Decorator
export class ColorDecorator extends Decorator {
	constructor(
			component: TextComponent,
			public color: string
	) {
			super(component);
	}

	draw(): void {
		console.log(this.component);
		console.log(this.texts);
			for (let text of this.texts) {
					text.setColor(this.color);
			}

			super.draw();
	}
}

// Concrete Decorator
export class FontDecorator extends Decorator {
	constructor(
			component: TextComponent,
			public font: string
	) {
			super(component);
	}

	draw(): void {
			for (let text of this.texts) {
					text.setFont(this.font);
			}

			super.draw();
	}
}

// Concrete Decorator
export class SizeDecorator extends Decorator {
	constructor(
		component: TextComponent,
		public size: string
	) {
		super(component);
	}

	draw(): void {
		for (let text of this.texts) {
			text.setSize(this.size);
		}

		super.draw();
	}
}

// --- client ---

let texts = new Array<Text>();
texts.push(new Text("1"));
texts.push(new Text("2"));
texts.push(new Text("3"));
texts.push(new Text("4"));

let textComponent = new TextComponent(texts);

// Color, Font, Size 모두 Draw할 경우.
let colorFontSize = new ColorDecorator(
	new FontDecorator(
		new SizeDecorator(textComponent, '16px'),
		'sans-serif'
	),
	'black'
);
colorFontSize.draw();


let texts2 = new Array<Text>();
texts2.push(new Text("5"));
texts2.push(new Text("6"));
texts2.push(new Text("7"));
texts2.push(new Text("8"));

let textComponent2 = new TextComponent(texts2);

// Font, Size를 Draw할 경우
let fontSize = new FontDecorator(
	new SizeDecorator(textComponent2, '20px'),
	'sans-serif'
);
fontSize.draw();

/*
1 / black / sans-serif / 16px
2 / black / sans-serif / 16px
3 / black / sans-serif / 16px
4 / black / sans-serif / 16px
5 /  / sans-serif / 20px
6 /  / sans-serif / 20px
7 /  / sans-serif / 20px
8 /  / sans-serif / 20px
*/


export abstract class AAA {
	abstract text():void;
}

export class BBB extends AAA {
	text():void {

	};
}

export class CCC extends AAA{
	text():void {
	};
}

export class DDD {
	text():void {
	};
}

export class EEE {

}

export class Test {
	setBBB(aaa: BBB) {

  }
}

//TypeScript에서는 메소드 구조만 객체를 매개변수로 받을 수 있다.
let test = new Test();
test.setBBB(new BBB());
test.setBBB(new CCC());
test.setBBB(new DDD());
// test.setBBB(new EEE()); // error

```

### Consequences
- 데코레이터 패턴의 핵심은 기능을 동적으로 추가하는 것이다.
- 제대로 작성된 데코레이터 패턴은 데코레이터 호출 순서에 상관없이 항상 잘 작동해야 한다.

## Adapter Pattern
[Adapter Pattern](https://en.wikipedia.org/wiki/Adapter_pattern)
- 어댑터 패턴은 클래스의 인터페이스를 다른 인터페이스로 변환하는 패턴이다.
- 어댑터 패턴은 서로 다른 인터페이스가 함께 작업을 할 수 있도록 한다.

### Diagram
![Adapter](/images/adapter-pattern.png)
- "client"는 "target"을 가지고 있지만, "adaptee"는 "target"과 호환되지 않으므로 "client"는 "adaptee"에 직접 접근할 수 없다. 하지만, "client"는 "target"을 구현한 "adapter"를 사용하여 "adaptee"에 접근할 수 있다.

#### Object Adapter Pattern
![Object-Adapter](/images/object-adapter-pattern.png)
- Object Adapter Pattern은 "adapter"가 "adatee"를 구성하고(composition) 형태를 말한다.
- adapter의 operatorion은 "adapter"가 "adaptee"의 인스턴스의 메소드를 호출하는 형태이다.[adaptee.specificOperation()]

#### Class Adapter Pattern
![Object-Adapter](/images/class-adapter-pattern.png)
- Class Adapter Pattern은 "adapter"가 "adaptee"를 상속받는 형태를 말한다. (하나의 어뎁터로 다양한 adaptee로 변환하려면 다중 상속으로 구현)
- adapter의 operation은 "adapter"가 상속받은 "adatee"의 메소드를 호출하는 형태이다.[specificOperation()]

### Participants
- Target: Client에서 작동할 인터페이스
- Adaptee: Client에서 작동되도록 디자인 되지 않은 구현체
- Adapter: Adaptee와 상호작용하는 Target 인터페이스의 구현체
- Client: Target을 조작하는 클래스

### Pattern Scope
- Adapter Pattern은 기존의 client 클래스가 기존의 adaptee와 작동하도록 설계되지 않은 경우에 적용할 수 있다.

### Object Adapter Pattern Implementation
```ts
export interface LightningPhone {
	useLightning(): void;
	recharge(): void;
}

// target
export interface MicroUsbPhone {
	useMicroUsb(): void;
	recharge(): void;
}

// adaptee
export class Iphone implements LightningPhone {
	connector!: boolean;

	useLightning(): void {
		this.connector = true;
		console.log("Lightning connected");
	}

  recharge(): void {
		if (this.connector) {
			console.log("Recharge started");
			console.log("Recharge finished");
		} else {
			console.log("Connect Lightning first");
		}
	}
}

export class Android implements MicroUsbPhone {
	connector!: boolean;

	useMicroUsb(): void {
		this.connector = true;
		console.log("MicroUsb connected");
	}

  recharge(): void {
		if (this.connector) {
			console.log("Recharge started");
			console.log("Recharge finished");
		} else {
			console.log("Connect MicroUsb first");
		}
	}
}

// adapter
export class LightningToMicroUsbAdapter implements MicroUsbPhone {
	constructor(
		// object adapter pattern
		private lightningPhone: LightningPhone
	) { }

	useMicroUsb() {
		console.log("MicroUsb connected");
		// 인스턴스의 메소드 호출
		this.lightningPhone.useLightning();
	}

	recharge() {
		// 인스턴스의 메소드 호출
		this.lightningPhone.recharge();
	}
}

// client
export class MicroUsbPhoneRecharger {
	dockPhone(phone: MicroUsbPhone): void {
		phone.useMicroUsb();
		phone.recharge();
	}
}

let microUsbPhoneRecharger = new MicroUsbPhoneRecharger();
console.log("MicroUsb를 사용한 안드로이드 폰 충전");
microUsbPhoneRecharger.dockPhone(new Android());
console.log("MicroUsb를 사용한 아이폰 충전");
microUsbPhoneRecharger.dockPhone(new LightningToMicroUsbAdapter(new Iphone));


/*
MicroUsb를 사용한 안드로이드 폰 충전
MicroUsb connected
Recharge started
Recharge finished

MicroUsb를 사용한 아이폰 충전
MicroUsb connected
Lightning connected
Recharge started
Recharge finished
*/
```

### Class Adapter Pattern Implementation
```ts
export interface LightningPhone {
	useLightning(): void;
	recharge(): void;
}

// target
export interface MicroUsbPhone {
	useMicroUsb(): void;
	recharge(): void;
}

// adaptee
export class Iphone implements LightningPhone {
	connector!: boolean;

	useLightning(): void {
		this.connector = true;
		console.log("Lightning connected");
	}

  recharge(): void {
		if (this.connector) {
			console.log("Recharge started");
			console.log("Recharge finished");
		} else {
			console.log("Connect Lightning first");
		}
	}
}

export class Android implements MicroUsbPhone {
	connector!: boolean;

	useMicroUsb(): void {
		this.connector = true;
		console.log("MicroUsb connected");
	}

  recharge(): void {
		if (this.connector) {
			console.log("Recharge started");
			console.log("Recharge finished");
		} else {
			console.log("Connect MicroUsb first");
		}
	}
}

// adapter
export class LightningToMicroUsbAdapter extends Iphone implements MicroUsbPhone {
	// class adapter pattern
		
	useMicroUsb() {
		console.log("MicroUsb connected");
    // 상속받은 adaptee의 메소드 호출
    super.useLightning();
	}

	recharge() {
		// 상속받은 adaptee의 메소드 호출
		super.recharge();
	}
}

// client
export class MicroUsbPhoneRecharger {
	dockPhone(phone: MicroUsbPhone): void {
		phone.useMicroUsb();
		phone.recharge();
	}
}

let microUsbPhoneRecharger = new MicroUsbPhoneRecharger();
console.log("MicroUsb를 사용한 안드로이드 폰 충전");
microUsbPhoneRecharger.dockPhone(new Android());
console.log("MicroUsb를 사용한 아이폰 충전");
microUsbPhoneRecharger.dockPhone(new LightningToMicroUsbAdapter());


/*
MicroUsb를 사용한 안드로이드 폰 충전
MicroUsb connected
Recharge started
Recharge finished

MicroUsb를 사용한 아이폰 충전
MicroUsb connected
Lightning connected
Recharge started
Recharge finished
*/
```

### Consequences
- Adapter Pattern을 사용하면 원래 함께 작동하지 않는 클래스 사이의 틈을 메울 수 있다.

## Bridge Pattern
- Bridge Pattern은 구현부에서 추상층을 분리하는 패턴이다. 구현부에서 추상층이 분리되면 구현부에 각자 독립적인 추상층을 추가하여 독립적으로 변형할 수 있게 된다. 또한 추상층을 변경할 수도 있다.

### Diagram
![bridge-pattern](/images/bridge-pattern.png)
- UIComponent를 SVG나 Canvas에 그릴 수 있을 경우, UIComponent와 UIToolkit간의 연결을 브릿지로 하여 UIComponent는 UIToolKit의 구현체를 추상화하여 분리할 수 있다.

### Participants
![bridge-pattern2](/images/bridge-pattern2.png)
- Abstraction: Implementer의 참조를 가지고 있는 인터페이스
<br>ex) UIElement
- Refined abstraction: Abstraction의 구현체, 독립적인 추상층을 가지는 구현부
<br>ex) TextElement, ImageElement
- Implementer: 추상층을 정의한 인터페이스
<br>ex) UIToolkit
- Concrete implementer: Implementer의 구현체, 독립적인 추상층
<br>ex) SVGToolkit, CanvasToolkit

### Pattern scope
- 브릿지 패턴은 다양한 "Implementer"과 함께 작동하는 것을 제공하지만, 대부분의 경우 브릿지 패턴은 단일 "Implementer"와 작동한다.
- 브릿지 패턴이 어탭터 패턴과의 차이점은 어댑터 패턴은 기존의 "Client"가 설계상 사용하지 않는 "adaptee"와 협업하기 위해 "adapter"의 구현에 초점을 두는 반면, 브릿지 패턴은 "adapter" 부분에 해당하는 "Implementer"를 미리 잘 고려하고 예측하여 보편적 인터페이스를 제공한다.

### Implementation
```ts
interface UIToolkit {
    drawBorder(): void;
    drawImage(src: string): void;
    drawText(text: string): void;
}

abstract class UIElement {
    constructor(
        public toolkit: UIToolkit
    ) { }

    abstract render(): void;
}

class TextElement extends UIElement {
    constructor(
        public text: string,
        toolkit: UIToolkit
    ) {
        super(toolkit);
    }

    render(): void {
        this.toolkit.drawText(this.text);
    }
}

class ImageElement extends UIElement {
    constructor(
        public src: string,
        toolkit: UIToolkit
    ) {
        super(toolkit);
    }

    render(): void {
        this.toolkit.drawImage(this.src);
    }
}

export class SVGToolkit implements UIToolkit {
    drawBorder(): void {
      
    }
    
    drawImage(src: string): void {
      console.log(`[SVGToolkit] image src: ${src}`);
    }

    drawText(text: string): void {
			console.log(`[SVGToolkit] text: ${text}`);
    }
}


export class CanvasToolkit implements UIToolkit {
	drawBorder(): void {
      
	}
	
	drawImage(src: string): void {
		console.log(`[CanvasToolkit] image src: ${src}`);
	}

	drawText(text: string): void {
		console.log(`[CanvasToolkit] text: ${text}`);
	}
}

let imageElement = new ImageElement('foo.jpg', new SVGToolkit);
let textElement = new TextElement('bar', new CanvasToolkit);

imageElement.render();
textElement.render();

/*
[SVGToolkit] image src: foo.jpg
[CanvasToolkit] text: bar
*/
```

### Consequences
- 브릿지 패턴은 "Abstraction"과 "implementer"를 분리하므로써, 시스템에 큰 확장성을 가져온다.
- "Client" 는 "Implementer"의 세부사항에 대해서 알 필요가 없기때문에 시스템의 안정성 및 건강한 Dependency 구조를 설계하는데도 도움이 된다.

## Façade Pattern
- 퍼사드 패턴은 Subsystem을 조직화하고 통일화된 상위 계층의 인터페이스(higher-level interface)를 제공한다.
- 모듈형 라이브러리를 사용할때 퍼사드 패턴을 사용하면 프로젝트를 쉽게 유지 관리 할 수 있다.

### Diagram
![facade-pattern](/images/facade-pattern.png)

- "Client"는 "Subsystem"에 직접 접근하지 않고 "Subsystem"을 간단한 인터페이스로 제공하는 "Facade"를 사용하여 접근한다.
- "Client"는 오직 간단한 "Facade" 인터페이스에 의존하고 복잡한 "Subsystem"에 의존하지 않는다.

### Participants
- Façade: 상위 계층의 인터페이스를 정의하고 "Subsystems"와 협력하는 클래스
- Subsystems: 자신의 기능을 실행하고 필요하면 다른 "Subsystems"과의 내부적으로 의사소통하는 모듈

### Pattern Scope
- 파사드 패턴은 "상위 계층의 인터페이스"와 "Subsystems"간의 교차점 역할을 한다.
- 파사드 패턴의 중요한점은, 모듈("Subsystems")의 어떤 의존성을 사용할지말지 선을 그리는 것이다.

### Implementation
```ts
// Subsystem
class Cpu {
  freeze(): void {}
  jump(): void {}
  execute(): void {}
}

// Subsystem
class HardDrive {
  read(): void {}
  save(): void {}
}

// Subsystem
class Memory {
  load(): void {}
}

// Façade
class ComputerFacade {
  processer: Cpu;
  ram: Memory;
  hd: HardDrive;

  constructor() {
    this.processer = new Cpu();
    this.ram = new Memory();
    this.hd = new HardDrive();
  }

  // 컴퓨터가 시작되는 부분은 상위계층의 인터페이스로 제공됨.
  start() {
    this.processer.freeze();
    this.ram.load();
    this.processer.jump();
    this.processer.execute();
  }
}

let computerFacade = new ComputerFacade();
// "Client"는 복잡한 Cpu / Memory / Harddisk를 사용하지않고 
// Facade의 Higher-level interface인 start() interface를 사용하므로써 컴퓨터 시스템을 구동시킬 수 있다.
computerFacade.start();
```

### Consequences
- 파사드 패턴은 "Client"와 "Subsystems" 간의 결합성(Coupling)을 느슨하게 한다.
- "Facade"는 "Client"가 적절한 "Subsystems"에게 명령들을 전달할 수 있도록 한다.
- 파사드 패턴을 사용하므로써, 시스템의 구조를 직관적이고 깨끗하게 유지할 수 있다.

## Flyweight Pattern
- [flyweight](https://en.wikipedia.org/wiki/Flyweight_pattern)는 데이터를 저장하고 공유하므로써 메모리 사용을 최소화하는 객체이다.
- 객체의 생성 비용이 많을 경우 이 패턴을 사용하면 메모리 효율성과 퍼포먼스 향상에 도움이 될 수 있다.

### Diagram
![flyweight-pattern3](/images/flyweight-pattern3.png)

- client는 Flyweight를 생성하거나 공유받기 위해 FlyweightFactory를 참조한다.
- client는 Flyweight 인터페이스를 Fleyweight의 메소드에 접근하며, 매개변수로 Flyweight에게 변화 가능한(variant state) 상태를 전달한다.(flyweight.operation(extrinsicState))
- Flyweight 인터페이스를 구현한 Flyweight1 클래스는 불변의 상태(invariant state)을 저장하고 공유한다.

### Snow Example
![flyweight-pattern1](/images/flyweight-pattern1.png)
![flyweight-pattern2](/images/flyweight-pattern2.png)

- 캔버스에서 100개의 눈송이가 떨어지는 것을 프로그래밍 할때, 눈송이의 스타일는 캐싱해두고 눈송이의 좌표만 랜더링 해서 구현할 수 있다.
- invariant state => 눈송이 스타일 ex) image path
- variant state => 눈송이 좌표 ex) x,y,angle

### Participant
- Flyweight: flyweight 객체를 정의
- Flyweight factory: flyweight 객체를 생성하고 관리(flyweight를 캐싱하는 팩토리)
- Client: 대상의 상태(invariant state)를 저장하고 flyweight 객체를 사용한다.

### Pattern Scope
- Flyweight Pattern은 메모리 효율성과 성능을 향상시키기 위한 패턴이다.
- Flyweight Pattern 패턴을 구현할 때는 invariant state와 variant state 관리에 중점을 두어야 한다.

### Implementation
```ts
// js의 의존 관계 선언 패턴: 함수나 모듈 최 상단에 의존관계가 있는 모듈을 선언하는 것.
const hasOwnProperty = Object.prototype.hasOwnProperty;

export class Image {
	constructor(url: string) { }
}

// Flyweight 객체
export class Snowflake {
	// invariant state
	image: Image;

	constructor(
		public style: string
	) {
		let url = style + '.png';
		this.image = new Image(url);
	}

	// x, y, angle => variant state
	render(x: number, y: number, angle: number): void {
		// ... 
		console.log(`Style ${this.style}, x: ${x}, y: ${y}, angle: ${angle}`);
	}
}

// js의 메모제이션(Memoization) 패턴은 함수에 cache 프로퍼티를 사용하여 캐싱함
// Flyweight 객체를 매번 만들지 않고 캐싱하는 팩토리
export class SnowFlakeFactory {
	// style을 key로 하고 Snowflake 객체를 값으로 하는 맵. 
	// A, B, C 스타일의 Snowflake가 캐싱되어 있음.
	cache: {
		[style: string]: Snowflake;
	} = {};

	get(style: string): Snowflake {
		// 전역 변수를 지역변수화 하여 사용하고 있음(js의 의존관계선언 패턴)
		let cache = this.cache;
		let snowflake: Snowflake;

		// 이미 저장되어있는 스타일의 Snowflake는 new를 통해 새로 생성하지 않고 캐싱되어 있는 Snowflake를 캐시에서 꺼내 사용함
		// Snowflake는 get 함수를 호출할때마다 생성되는 것이 아니고, 스타일의 갯수만큼만 생성됨.
		if (hasOwnProperty.call(cache, style)) {
			snowflake = cache[style];
			console.log('cached snowflake');
		} else {
			snowflake = new Snowflake(style);
			cache[style] = snowflake;
			console.log('new snowflake');
		}

		return snowflake;
	}
}

const SNOW_STYLES = ['A', 'B', 'C'];

// client
export class Sky {
	constructor(
		public width: number,
		public height: number
	) { }

	snow(factory: SnowFlakeFactory, count: number) {
		let stylesCount = SNOW_STYLES.length;
		
		for (let i = 0; i < count; i++) {
			let style = SNOW_STYLES[getRandomInteger(stylesCount)];
			let snowflake = factory.get(style);

			let x = getRandomInteger(this.width);
			let y = getRandomInteger(this.height);

			let angle = getRandomInteger(60);

			snowflake.render(x, y, angle);
		}
	}
}

function getRandomInteger(max: number): number {
	return Math.floor(Math.random() * max);
}

let sky = new Sky(10,10);
sky.snow(new SnowFlakeFactory, 100);

/*

new snowflake
Style C, x: 1, y: 2, angle: 59
cached snowflake
Style C, x: 4, y: 2, angle: 44
cached snowflake
Style C, x: 0, y: 8, angle: 10
new snowflake
Style B, x: 3, y: 2, angle: 24
cached snowflake
Style B, x: 8, y: 4, angle: 32
cached snowflake
Style C, x: 6, y: 7, angle: 13
new snowflake
Style A, x: 7, y: 4, angle: 38
cached snowflake
Style C, x: 6, y: 3, angle: 13
cached snowflake

*/
```

### Consequences
- Flyweight 패턴은 한 시스템에서 관련된 객체의 최종 숫자를 줄여주므로써, 메모리를 절약할 수 있다.


## Proxy Pattern
- 프록시 패턴은 프로그램이 접근 객체에 대해 알고자 하거나 접근 객체의 행동에 개입하기위해 사용된다.
- [프록시](https://en.wikipedia.org/wiki/Proxy_pattern)는 "real object"가 구현한 인터페이스를 구현한 클래스이다.
- 프록시는 "Client"가 "real object"에 접근하기 위해 호출하는 "Agent object"이다.
- 프록시와 "real object"는 동일한 인터페이스를 구현하므로, 프록시 객체의 사용은 "real object"와 비슷하다.
- 프록시를 사용하면 추가적인 기능을 제공할 수 있다.
	- real object의 operation이 자원 집중적인 경우 캐싱
	- real object의 앞선 상태 검사

### Possible usage scenarios
프록시 패턴은 목적에 따라 다음과 같이 구분된다.
- Remote Proxy: 데이터나 원격 서버같은 "원격 객체"를 조작하기 위한 프록시
<br> ex) ATM의 실행에서 ATM은 원격 서버에 있는 은행정보를 "proxy object"로 보유할 수 있다.
- Virtual Proxy: 요청시 로드가 필요한 "비용이 많이 드는 객체"를 관리하기 위한 프록시
- Protection Proxy: 권한 인증이나 유효성 검사를 위한 "타겟 객체의 접근"을 관리하는 프록시
- Smart Proxy: 타겟 객체에 접근할 때 "추가적인 명령을 수행"하는 프록시

### Diagram
![proxy-pattern](/images/proxy-pattern.png)



### Pattern Scope
- Adapter Pattern과 비슷하지만, Adapter Pattern은 호환되지 않는 인터페이스를 변형하기 위한 것이 목적이라면, Proxy Pattern은 "real obejct"의 접근에 개입하는 것이 목적이다.
- Proxy Pattern을 사용하면 "real object"의 메소드나 값을 변경할 수도 있지만 이것은 대부분 뒤로 가거나 에러처리의 목적의 경우가 많다.

### Consequences
- Proxy Pattern은 대부분 특정 객체나 진짜 객체의 명령을 캡슐화하는 목적으로 사용된다.




