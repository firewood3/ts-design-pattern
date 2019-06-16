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
- [Composite Pattern](https://en.wikipedia.org/wiki/Composite_pattern)은 같은 방식으로 작동하는 객체들의 그룹을 설명하는 패턴이다.
- Composite는 객체를 부분-집합으로 표현되는 트리 구조로 "구성(compose)" 한다.
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
데코레이터 패턴은 객체에 원래 기능은 손상시키지 않으면서 새로운 기능을 동적으로 더하는 패턴이다.

### Diagram

### Participants