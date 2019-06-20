"use strict";
// 할인 없음
var NormalBillingStrategy = /** @class */ (function () {
    function NormalBillingStrategy() {
    }
    NormalBillingStrategy.prototype.getActPrice = function (rawPrice) {
        return rawPrice;
    };
    return NormalBillingStrategy;
}());
// 50% 할인
var HappHourStrategy = /** @class */ (function () {
    function HappHourStrategy() {
    }
    HappHourStrategy.prototype.getActPrice = function (rawPrice) {
        return rawPrice;
    };
    return HappHourStrategy;
}());
var Customer = /** @class */ (function () {
    function Customer(strategy) {
        // 고객이 주문한 음료의 가격을 저장하는 배열
        this.drinks = [];
        this.calcStrategy = strategy;
    }
    Customer.prototype.add = function (price) {
        this.drinks.push(this.calcStrategy.getActPrice(price));
    };
    Customer.prototype.printBill = function () {
        var total = this.drinks.reduce(function (a, b) { return a + b; });
        console.log("Total due: " + total);
        this.drinks = [];
    };
    return Customer;
}());
// 전략을 런타임시에 결정할 수 있다.
var customer = new Customer(new HappHourStrategy());
customer.add(100);
customer.add(200);
customer.add(300);
customer.printBill();
/*
Total due: 600
*/
