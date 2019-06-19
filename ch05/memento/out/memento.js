"use strict";
class Memento {
    constructor(state) {
        this.state = Object.assign({}, state);
    }
    restore(state) {
        Object.assign(state, this.state);
    }
}
class Originator {
    get memento() {
        return new Memento(this.state);
    }
    set memento(memento) {
        memento.restore(this.state);
    }
}
class Caretaker {
    constructor() {
        this.history = [];
    }
    save() {
        this.history.push(this.originator.memento);
    }
    restore() {
        this.originator.memento = this.history.shift();
    }
    test() {
        this.originator = new Originator();
        this.originator.state = { state: 'state1' }; // originator.state ==> { state: 'state1' }
        this.originator.state = { state: 'state2' }; // originator.state ==> { state: 'state2' }
        this.save();
        this.originator.state = { state: 'state3' }; // originator.state ==> { state: 'state3' }
        this.save();
        this.originator.state = { state: 'state4' }; // originator.state ==> { state: 'state4' }
        this.restore(); // originator.state ==> { state: 'state2' }
        this.originator.state = { state: 'state5' }; // originator.state ==> { state: 'state5' }
        this.restore(); // originator.state ==> { state: 'state3' }
    }
}
