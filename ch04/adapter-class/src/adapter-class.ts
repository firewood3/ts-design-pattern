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