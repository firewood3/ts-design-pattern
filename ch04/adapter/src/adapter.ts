// adaptee
export interface LightningPhone {
	useLightning(): void;
	recharge(): void;
}

// target
export interface MicroUsbPhone {
	useMicroUsb(): void;
	recharge(): void;
}


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
		private lightningPhone: LightningPhone
	) { }

	useMicroUsb() {
		console.log("MicroUsb connected");
		this.lightningPhone.useLightning();
	}

	recharge() {
		this.lightningPhone.recharge();
	}
}

export class MicroUsbPhoneRecharger {

}

export class AdapterDemo {

	rechargeMicroUsbPhone(phone: MicroUsbPhone) {
		phone.useMicroUsb();
		phone.recharge();
	}

	rechargeLightningPhone(phone: LightningPhone) {
		phone.useLightning();
		phone.recharge();
	}

	demonstrate() {
		let android = new Android();
		let iPhone = new Iphone();

		console.log("Recharging android with MicroUsb");
		this.rechargeMicroUsbPhone(android);

		console.log("Recharging iPhone with Lightning");
		this.rechargeLightningPhone(iPhone);
		
		// Adapter를 사용하여 iphone 충전
		console.log("Recharging iPhone with MicroUsb");
		this.rechargeMicroUsbPhone(new LightningToMicroUsbAdapter(iPhone));
	}
}

let demo = new AdapterDemo();
demo.demonstrate();

/*
Recharging android with MicroUsb
MicroUsb connected
Recharge started
Recharge finished

Recharging iPhone with Lightning
Lightning connected
Recharge started
Recharge finished

Recharging iPhone with MicroUsb
MicroUsb connected
Lightning connected
Recharge started
Recharge finished
*/