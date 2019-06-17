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
    function LightningToMicroUsbAdapter(lightningPhone) {
        this.lightningPhone = lightningPhone;
    }
    LightningToMicroUsbAdapter.prototype.useMicroUsb = function () {
        console.log("MicroUsb connected");
        this.lightningPhone.useLightning();
    };
    LightningToMicroUsbAdapter.prototype.recharge = function () {
        this.lightningPhone.recharge();
    };
    return LightningToMicroUsbAdapter;
}());
exports.LightningToMicroUsbAdapter = LightningToMicroUsbAdapter;
var MicroUsbPhoneRecharger = /** @class */ (function () {
    function MicroUsbPhoneRecharger() {
    }
    return MicroUsbPhoneRecharger;
}());
exports.MicroUsbPhoneRecharger = MicroUsbPhoneRecharger;
var AdapterDemo = /** @class */ (function () {
    function AdapterDemo() {
    }
    AdapterDemo.prototype.rechargeMicroUsbPhone = function (phone) {
        phone.useMicroUsb();
        phone.recharge();
    };
    AdapterDemo.prototype.rechargeLightningPhone = function (phone) {
        phone.useLightning();
        phone.recharge();
    };
    AdapterDemo.prototype.demonstrate = function () {
        var android = new Android();
        var iPhone = new Iphone();
        console.log("Recharging android with MicroUsb");
        this.rechargeMicroUsbPhone(android);
        console.log("Recharging iPhone with Lightning");
        this.rechargeLightningPhone(iPhone);
        // Adapter를 사용하여 iphone 충전
        console.log("Recharging iPhone with MicroUsb");
        this.rechargeMicroUsbPhone(new LightningToMicroUsbAdapter(iPhone));
    };
    return AdapterDemo;
}());
exports.AdapterDemo = AdapterDemo;
var demo = new AdapterDemo();
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
