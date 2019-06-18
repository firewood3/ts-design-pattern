// Subject
interface Image {
  displayImage(): void;
}

// RealSubject
export class RealImage implements Image {
  constructor(
      private filename: string
  ) { 
		this.loadImageFromDisk();
	}

  loadImageFromDisk(): void {
		console.log("Loading: " + this.filename);
	}
	
	displayImage(): void {
		console.log("Displaying: " + this.filename);
	}
}

// Proxy
export class ProxyImage implements Image {
	image!: Image;

	constructor(
		private filename: string
	) { }

	displayImage() {
		if (!this.image) {
			this.image = new RealImage(this.filename);
		}

		this.image.displayImage();
	}
}

// Client
export class ImageClient {
	display() {
		let image = new ProxyImage("Photo1");
		image.displayImage();
	}
}

let imageClinet = new ImageClient();
imageClinet.display();

/*
Loading: Photo1
Displaying: Photo1
*/
