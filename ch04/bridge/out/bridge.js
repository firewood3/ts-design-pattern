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
var UIElement = /** @class */ (function () {
    function UIElement(toolkit) {
        this.toolkit = toolkit;
    }
    return UIElement;
}());
var TextElement = /** @class */ (function (_super) {
    __extends(TextElement, _super);
    function TextElement(text, toolkit) {
        var _this = _super.call(this, toolkit) || this;
        _this.text = text;
        return _this;
    }
    TextElement.prototype.render = function () {
        this.toolkit.drawText(this.text);
    };
    return TextElement;
}(UIElement));
var ImageElement = /** @class */ (function (_super) {
    __extends(ImageElement, _super);
    function ImageElement(src, toolkit) {
        var _this = _super.call(this, toolkit) || this;
        _this.src = src;
        return _this;
    }
    ImageElement.prototype.render = function () {
        this.toolkit.drawImage(this.src);
    };
    return ImageElement;
}(UIElement));
var SVGToolkit = /** @class */ (function () {
    function SVGToolkit() {
    }
    SVGToolkit.prototype.drawBorder = function () {
    };
    SVGToolkit.prototype.drawImage = function (src) {
        console.log("[SVGToolkit] image src: " + src);
    };
    SVGToolkit.prototype.drawText = function (text) {
        console.log("[SVGToolkit] text: " + text);
    };
    return SVGToolkit;
}());
exports.SVGToolkit = SVGToolkit;
var CanvasToolkit = /** @class */ (function () {
    function CanvasToolkit() {
    }
    CanvasToolkit.prototype.drawBorder = function () {
    };
    CanvasToolkit.prototype.drawImage = function (src) {
        console.log("[CanvasToolkit] image src: " + src);
    };
    CanvasToolkit.prototype.drawText = function (text) {
        console.log("[CanvasToolkit] text: " + text);
    };
    return CanvasToolkit;
}());
exports.CanvasToolkit = CanvasToolkit;
var imageElement = new ImageElement('foo.jpg', new SVGToolkit);
var textElement = new TextElement('bar', new CanvasToolkit);
imageElement.render();
textElement.render();
/*
[SVGToolkit] image src: foo.jpg
[CanvasToolkit] text: bar
*/ 
