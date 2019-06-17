"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Iphone = /** @class */ (function () {
    function Iphone() {
    }
    Iphone.prototype.useLightning = function () {
        this.connector = true;
        console.log("Lightning connected");
    };
    Iphone.prototype.recharge = function () {
        if (this.connector) {
            console.log("Recharge started");
            console.log("Recharge finished");
        }
        else {
            console.log("Connect Lightning first");
        }
    };
    return Iphone;
}());
exports.Iphone = Iphone;
var Android = /** @class */ (function () {
    function Android() {
    }
    Android.prototype.useMicroUsb = function () {
        this.connector = true;
        console.log("MicroUsb connected");
    };
    Android.prototype.recharge = function () {
        if (this.connector) {
            console.log("Recharge started");
            console.log("Recharge finished");
        }
        else {
            console.log("Connect MicroUsb first");
        }
    };
    return Android;
}());
exports.Android = Android;
// adapter
var LightningToMicroUsbAdapter = /** @class */ (function (_super) {
    __extends(LightningToMicroUsbAdapter, _super);
    function LightningToMicroUsbAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // class adapter pattern
    LightningToMicroUsbAdapter.prototype.useMicroUsb = function () {
        console.log("MicroUsb connected");
        // 상속받은 adaptee의 메소드 호출
        _super.prototype.useLightning.call(this);
    };
    LightningToMicroUsbAdapter.prototype.recharge = function () {
        // 상속받은 adaptee의 메소드 호출
        _super.prototype.recharge.call(this);
    };
    return LightningToMicroUsbAdapter;
}(Iphone));
exports.LightningToMicroUsbAdapter = LightningToMicroUsbAdapter;
// client
var MicroUsbPhoneRecharger = /** @class */ (function () {
    function MicroUsbPhoneRecharger() {
    }
    MicroUsbPhoneRecharger.prototype.dockPhone = function (phone) {
        phone.useMicroUsb();
        phone.recharge();
    };
    return MicroUsbPhoneRecharger;
}());
exports.MicroUsbPhoneRecharger = MicroUsbPhoneRecharger;
var microUsbPhoneRecharger = new MicroUsbPhoneRecharger();
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
