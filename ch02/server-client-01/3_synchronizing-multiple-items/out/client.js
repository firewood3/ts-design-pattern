"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client = /** @class */ (function () {
    function Client(server) {
        this.server = server;
        this.store = {
            timestamp: 0,
            data: undefined
        };
    }
    // 클라이언트의 DataStore와 서버의 DataStore의 동기를 맞춘다.
    Client.prototype.synchronize = function () {
        var updatedStore = this.server.getData(this.store.timestamp);
        if (updatedStore) {
            this.store = updatedStore;
        }
    };
    return Client;
}());
exports.Client = Client;
