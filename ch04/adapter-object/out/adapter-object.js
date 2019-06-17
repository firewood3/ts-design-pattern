"use strict";
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
var LightningToMicroUsbAdapter = /** @class */ (function () {
    function LightningToMicroUsbAdapter(
    // object adapter pattern
    lightningPhone) {
        this.lightningPhone = lightningPhone;
    }
    LightningToMicroUsbAdapter.prototype.useMicroUsb = function () {
        console.log("MicroUsb connected");
        // 인스턴스의 메소드 호출
        this.lightningPhone.useLightning();
    };
    LightningToMicroUsbAdapter.prototype.recharge = function () {
        // 인스턴스의 메소드 호출
        this.lightningPhone.recharge();
    };
    return LightningToMicroUsbAdapter;
}());
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
microUsbPhoneRecharger.dockPhone(new LightningToMicroUsbAdapter(new Iphone));
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
