abstract class UIComponent {
	abstract draw(): void;
}

export class Text {
	content: string = "";

	constructor(public c: string) {
		this.content = c;
	}

	setColor(color: string): void {
		this.content += color + " ";
	}
	setFont(font: string): void {
		this.content += font + " ";
	}
	setSize(size: string): void {
		this.content += size + " ";
	}

	draw(): void {
		console.log(this.content);
	}
}

export class TextComponent extends UIComponent {
	texts: Text[] = new Array<Text>();

	constructor() {
		super();
		this.texts.push(new Text("1"));
		this.texts.push(new Text("2"));
		this.texts.push(new Text("3"));
		this.texts.push(new Text("4"));
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

let decoratedComponent = new ColorDecorator(
	new FontDecorator(
		new SizeDecorator(
			new TextComponent(),
			'10px'
		), 'sans-serif'
	),
	'black'
);

decoratedComponent.draw();

abstract class AAA {

}

class BBB extends AAA {

}

class CCC extends AAA {
	constructor(public bbb: BBB) {
		super();
	}
}

class DDD extends CCC {

}

class EEE extends CCC {

}

class FFF extends AAA {

}

class ABC {
	setABC(bbb: BBB) {

	}
}

let ddd = new DDD(new EEE(new DDD(new BBB)));

let abc = new ABC();
abc.setABC(new FFF());

