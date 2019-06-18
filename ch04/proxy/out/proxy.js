"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// RealSubject
var RealImage = /** @class */ (function () {
    function RealImage(filename) {
        this.filename = filename;
        this.loadImageFromDisk();
    }
    RealImage.prototype.loadImageFromDisk = function () {
        console.log("Loading: " + this.filename);
    };
    RealImage.prototype.displayImage = function () {
        console.log("Displaying: " + this.filename);
    };
    return RealImage;
}());
exports.RealImage = RealImage;
// Proxy
var ProxyImage = /** @class */ (function () {
    function ProxyImage(filename) {
        this.filename = filename;
    }
    ProxyImage.prototype.displayImage = function () {
        if (!this.image) {
            this.image = new RealImage(this.filename);
        }
        this.image.displayImage();
    };
    return ProxyImage;
}());
exports.ProxyImage = ProxyImage;
// Client
var ImageClient = /** @class */ (function () {
    function ImageClient() {
    }
    ImageClient.prototype.display = function () {
        var image = new ProxyImage("Photo1");
        image.displayImage();
    };
    return ImageClient;
}());
exports.ImageClient = ImageClient;
var imageClinet = new ImageClient();
imageClinet.display();
/*
Loading: Photo1
Displaying: Photo1
*/
