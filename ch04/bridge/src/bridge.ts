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