"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server = /** @class */ (function () {
    function Server() {
        this.store = {
            timestamp: 0,
            data: ''
        };
    }
    // 클라이언트의 타임스템프가 서버의 타임스템프 보다 작으면 서버의 DataStore를 클라이언트에 전달한다.
    Server.prototype.getData = function (clientTimestamp) {
        if (clientTimestamp < this.store.timestamp) {
            return this.store;
        }
        else {
            return undefined;
        }
    };
    return Server;
}());
exports.Server = Server;
