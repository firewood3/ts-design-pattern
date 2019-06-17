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

