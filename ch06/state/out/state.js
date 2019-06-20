"use strict";
var OrderedState = /** @class */ (function () {
    function OrderedState() {
    }
    OrderedState.prototype.next = function (pkg) {
        pkg.state = new DeliveredState();
    };
    OrderedState.prototype.prev = function (pkg) {
        console.log("this spackage is in its root state.");
    };
    OrderedState.prototype.printStatus = function () {
        console.log('package ordered, not deliverd yet.');
    };
    return OrderedState;
}());
var DeliveredState = /** @class */ (function () {
    function DeliveredState() {
    }
    DeliveredState.prototype.next = function (pkg) {
        pkg.state = new ReceivedState();
    };
    DeliveredState.prototype.prev = function (pkg) {
        pkg.state = new OrderedState();
    };
    DeliveredState.prototype.printStatus = function () {
        console.log("Package delivered, not received yet.");
    };
    return DeliveredState;
}());
var ReceivedState = /** @class */ (function () {
    function ReceivedState() {
    }
    ReceivedState.prototype.next = function (pkg) {
        console.log("this spackage is in its end state.");
    };
    ReceivedState.prototype.prev = function (pkg) {
        pkg.state = new DeliveredState();
    };
    ReceivedState.prototype.printStatus = function () {
        console.log("This package is already receive.");
    };
    return ReceivedState;
}());
var Package = /** @class */ (function () {
    function Package() {
        // 최초 상태
        this._state = new OrderedState();
    }
    Object.defineProperty(Package.prototype, "state", {
        get: function () {
            return this._state;
        },
        set: function (state) {
            this._state = state;
        },
        enumerable: true,
        configurable: true
    });
    Package.prototype.previousState = function () {
        this.state.prev(this);
    };
    Package.prototype.nextState = function () {
        this.state.next(this);
    };
    Package.prototype.printStatus = function () {
        this.state.printStatus();
    };
    return Package;
}());
var pkg = new Package();
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
