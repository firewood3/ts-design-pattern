interface State { }

class Memento {
	private state: State;

	constructor(state: State) {
		this.state = Object.assign({} as State, state);
	}

	restore(state: State): void {
		Object.assign(state, this.state);
	}
}

class Originator {
	state!: State;

	get memento(): Memento {
		return new Memento(this.state);
	}

	set memento(memento: Memento) {
		memento.restore(this.state);
	}
}

class Caretaker {
	originator!: Originator;
	history: Memento[] = [];

	save(): void {
		this.history.push(this.originator.memento);
	}

	restore(): void {
		this.originator.memento = this.history.shift() as Memento;
	}

	test() {
		this.originator = new Originator();
		this.originator.state = {state: 'state1'}; // originator.state ==> { state: 'state1' }
		this.originator.state = {state: 'state2'}; // originator.state ==> { state: 'state2' }
		this.save();
		this.originator.state = {state: 'state3'};  // originator.state ==> { state: 'state3' }
		this.save();
		this.originator.state = {state: 'state4'}; // originator.state ==> { state: 'state4' }
		this.restore(); // originator.state ==> { state: 'state2' }
		this.originator.state = {state: 'state5'}; // originator.state ==> { state: 'state5' }
		this.restore(); // originator.state ==> { state: 'state3' }
	}
}

