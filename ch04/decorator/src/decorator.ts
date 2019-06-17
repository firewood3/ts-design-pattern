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


