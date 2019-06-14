"use strict";
var Engine = /** @class */ (function () {
    function Engine(thrust) {
        this.thrust = thrust;
    }
    return Engine;
}());
var Client = /** @class */ (function () {
    function Client() {
    }
    Client.prototype.buildRocket = function (factory) {
        var rocket = factory.createRocket();
        rocket.payload = factory.createPayload();
        rocket.stages = factory.createStages();
        return rocket;
    };
    return Client;
}());
var ExperimentalPayload = /** @class */ (function () {
    function ExperimentalPayload() {
    }
    return ExperimentalPayload;
}());
var ExperimentalRocketStage = /** @class */ (function () {
    function ExperimentalRocketStage() {
    }
    return ExperimentalRocketStage;
}());
var ExperimentalRocket = /** @class */ (function () {
    function ExperimentalRocket() {
    }
    return ExperimentalRocket;
}());
var ExperimentalRocketFactory = /** @class */ (function () {
    function ExperimentalRocketFactory() {
    }
    ExperimentalRocketFactory.prototype.createRocket = function () {
        return new ExperimentalRocket();
    };
    ExperimentalRocketFactory.prototype.createPayload = function () {
        return new ExperimentalPayload();
    };
    ExperimentalRocketFactory.prototype.createStages = function () {
        return [new ExperimentalRocketStage()];
    };
    return ExperimentalRocketFactory;
}());
var Satellite = /** @class */ (function () {
    function Satellite(id, weight) {
        this.id = id;
        this.weight = weight;
    }
    return Satellite;
}());
var FreightRocketFirstStage = /** @class */ (function () {
    function FreightRocketFirstStage() {
    }
    return FreightRocketFirstStage;
}());
var FreightRocketSecondStage = /** @class */ (function () {
    function FreightRocketSecondStage() {
    }
    return FreightRocketSecondStage;
}());
var FreightRocket = /** @class */ (function () {
    function FreightRocket() {
    }
    return FreightRocket;
}());
var FreightRocketFactory = /** @class */ (function () {
    function FreightRocketFactory() {
        this.nextSatelliteId = 0;
    }
    FreightRocketFactory.prototype.createRocket = function () {
        return new FreightRocket();
    };
    FreightRocketFactory.prototype.createPayload = function () {
        return new Satellite(this.nextSatelliteId++, 100);
    };
    FreightRocketFactory.prototype.createStages = function () {
        return [
            new FreightRocketFirstStage(),
            new FreightRocketSecondStage()
        ];
    };
    return FreightRocketFactory;
}());
var client = new Client();
// Client의 매개변수로 들어오는 Concrete Factory를 교체하면 Product도 교체된다.
var experimentalRocket = client.buildRocket(new ExperimentalRocketFactory());
var freightRocket = client.buildRocket(new FreightRocketFactory());
console.log(experimentalRocket);
console.log(freightRocket);
/*
콘솔 출력
ExperimentalRocket {
  payload: ExperimentalPayload {},
  stages: [ ExperimentalRocketStage {} ] }
FreightRocket {
  payload: Satellite { id: 0, weight: 100 },
  stages: [ FreightRocketFirstStage {}, FreightRocketSecondStage {} ] }
*/ 
