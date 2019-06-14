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
var Payload = /** @class */ (function () {
    function Payload(weight) {
        this.weight = weight;
    }
    return Payload;
}());
var Engine = /** @class */ (function () {
    function Engine(thrust) {
        this.thrust = thrust;
    }
    return Engine;
}());
var Stage = /** @class */ (function () {
    function Stage(engines) {
        this.engines = engines;
    }
    return Stage;
}());
var Rocket = /** @class */ (function () {
    function Rocket() {
    }
    return Rocket;
}());
var RocketFactory = /** @class */ (function () {
    function RocketFactory() {
    }
    RocketFactory.prototype.buildRocket = function () {
        var rocket = this.createRocket();
        var payload = this.createPayload();
        var stages = this.createStages();
        rocket.payload = payload;
        rocket.stages = stages;
        return rocket;
    };
    RocketFactory.prototype.createRocket = function () {
        return new Rocket();
    };
    RocketFactory.prototype.createPayload = function () {
        return new Payload(0);
    };
    RocketFactory.prototype.createStages = function () {
        var engine = new Engine(1000);
        var stage = new Stage([engine]);
        return [stage];
    };
    return RocketFactory;
}());
var FreightRocket = /** @class */ (function (_super) {
    __extends(FreightRocket, _super);
    function FreightRocket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FreightRocket;
}(Rocket));
var Satellite = /** @class */ (function (_super) {
    __extends(Satellite, _super);
    function Satellite(id) {
        var _this = _super.call(this, 200) || this;
        _this.id = id;
        return _this;
    }
    return Satellite;
}(Payload));
var FirstStage = /** @class */ (function (_super) {
    __extends(FirstStage, _super);
    function FirstStage() {
        return _super.call(this, [
            new Engine(1000),
            new Engine(1000),
            new Engine(1000),
            new Engine(1000)
        ]) || this;
    }
    return FirstStage;
}(Stage));
var SecondStage = /** @class */ (function (_super) {
    __extends(SecondStage, _super);
    function SecondStage() {
        return _super.call(this, [
            new Engine(1000)
        ]) || this;
    }
    return SecondStage;
}(Stage));
var FreightRocketFactory = /** @class */ (function (_super) {
    __extends(FreightRocketFactory, _super);
    function FreightRocketFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nextSatelliteId = 0;
        return _this;
    }
    FreightRocketFactory.prototype.createRocket = function () {
        return new FreightRocket();
    };
    FreightRocketFactory.prototype.createPayload = function () {
        return new Satellite(this.nextSatelliteId++);
    };
    FreightRocketFactory.prototype.createStages = function () {
        return [
            new FirstStage(),
            new SecondStage()
        ];
    };
    return FreightRocketFactory;
}(RocketFactory));
var rocketFactory = new RocketFactory();
var rocket = rocketFactory.buildRocket();
console.log(rocket);
var freightRocketFactory = new FreightRocketFactory();
var freightRocket = freightRocketFactory.buildRocket();
console.log(freightRocket);
/*
콘솔 출력
Rocket {
  payload: Payload { weight: 0 },
  stages: [ Stage { engines: [Array] } ]
}
    

FreightRocket {
  payload: Satellite { weight: 200, id: 0 },
  stages:[
    FirstStage { engines: [Array] },
    SecondStage { engines: [Array] }
  ]
}
*/ 
