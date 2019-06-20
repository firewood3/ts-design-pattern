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
		this.state.prev(this);
	}

	nextState() {
		this.state.next(this);
	}

	printStatus() {
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

