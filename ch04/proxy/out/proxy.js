"use strict";
// @ts-ignore
var IndexedDBStorage = /** @class */ (function () {
    function IndexedDBStorage(name, permission, storeName) {
        if (storeName === void 0) { storeName = 'default'; }
        this.name = name;
        this.permission = permission;
        this.storeName = storeName;
    }
    Object.defineProperty(IndexedDBStorage.prototype, "dbReady", {
        get: function () {
            if (!this.dbPromise) {
                // @ts-ignore
                this.dbPromise = new Promise(function (resolve, reject) {
                    var request = indexedDB.open(name);
                    request.onsuccess = function (event) {
                        resolve(request.result);
                    };
                    request.onerror = function (event) {
                        reject(request.error);
                    };
                });
            }
            return this.dbPromise;
        },
        enumerable: true,
        configurable: true
    });
    IndexedDBStorage.prototype.get = function (key) {
        var _this = this;
        if (!this.permission.read) {
            // @ts-ignore
            return Promise.reject(new Error('Permission denied'));
        }
        return this
            .dbReady
            // @ts-ignore
            .then(function (db) { return new Promise(function (resolve, reject) {
            var transaction = db.transaction(_this.storeName);
            var store = transaction.objectStore(_this.storeName);
            var request = store.get(key);
            request.onsuccess = function (event) {
                resolve(request.result);
            };
            request.onerror = function (event) {
                reject(request.error);
            };
        }); });
    };
    IndexedDBStorage.prototype.set = function (key, value) {
        var _this = this;
        if (!this.permission.write) {
            // @ts-ignore
            return Promise.reject(new Error('Permission denied'));
        }
        return this
            .dbReady
            // @ts-ignore
            .then(function (db) { return new Promise(function (resolve, reject) {
            var transaction = db.transaction(_this.storeName, 'readwrite');
            var store = transaction.objectStore(_this.storeName);
            // @ts-ignore
            var request = store.put(key, value);
            request.onsuccess = function (event) {
                resolve();
            };
            request.onerror = function (event) {
                reject(request.error);
            };
        }); });
    };
    return IndexedDBStorage;
}());
var storage = new IndexedDBStorage('foo', {
    read: true,
    write: true
});
