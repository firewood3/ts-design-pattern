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
var UIComponent = /** @class */ (function () {
    function UIComponent() {
    }
    return UIComponent;
}());
var Text = /** @class */ (function () {
    function Text(content) {
        this.content = content;
        this.color = "";
        this.font = "";
        this.size = "";
    }
    Text.prototype.setColor = function (color) {
        this.color = color;
    };
    Text.prototype.setFont = function (font) {
        this.font = font;
    };
    Text.prototype.setSize = function (size) {
        this.size = size;
    };
    Text.prototype.draw = function () {
        console.log(this.content + " / " + this.color + " / " + this.font + " / " + this.size);
    };
    return Text;
}());
exports.Text = Text;
var TextComponent = /** @class */ (function (_super) {
    __extends(TextComponent, _super);
    function TextComponent(texts) {
        var _this = _super.call(this) || this;
        _this.texts = texts;
        return _this;
    }
    TextComponent.prototype.draw = function () {
        for (var _i = 0, _a = this.texts; _i < _a.length; _i++) {
            var text = _a[_i];
            text.draw();
        }
    };
    return TextComponent;
}(UIComponent));
exports.TextComponent = TextComponent;
var Decorator = /** @class */ (function (_super) {
    __extends(Decorator, _super);
    function Decorator(component) {
        var _this = _super.call(this) || this;
        _this.component = component;
        return _this;
    }
    Object.defineProperty(Decorator.prototype, "texts", {
        get: function () {
            return this.component.texts;
        },
        enumerable: true,
        configurable: true
    });
    Decorator.prototype.draw = function () {
        this.component.draw();
    };
    return Decorator;
}(UIComponent));
exports.Decorator = Decorator;
var ColorDecorator = /** @class */ (function (_super) {
    __extends(ColorDecorator, _super);
    function ColorDecorator(component, color) {
        var _this = _super.call(this, component) || this;
        _this.color = color;
        return _this;
    }
    ColorDecorator.prototype.draw = function () {
        console.log(this.component);
        console.log(this.texts);
        for (var _i = 0, _a = this.texts; _i < _a.length; _i++) {
            var text = _a[_i];
            text.setColor(this.color);
        }
        _super.prototype.draw.call(this);
    };
    return ColorDecorator;
}(Decorator));
exports.ColorDecorator = ColorDecorator;
var FontDecorator = /** @class */ (function (_super) {
    __extends(FontDecorator, _super);
    function FontDecorator(component, font) {
        var _this = _super.call(this, component) || this;
        _this.font = font;
        return _this;
    }
    FontDecorator.prototype.draw = function () {
        for (var _i = 0, _a = this.texts; _i < _a.length; _i++) {
            var text = _a[_i];
            text.setFont(this.font);
        }
        _super.prototype.draw.call(this);
    };
    return FontDecorator;
}(Decorator));
exports.FontDecorator = FontDecorator;
var SizeDecorator = /** @class */ (function (_super) {
    __extends(SizeDecorator, _super);
    function SizeDecorator(component, size) {
        var _this = _super.call(this, component) || this;
        _this.size = size;
        return _this;
    }
    SizeDecorator.prototype.draw = function () {
        for (var _i = 0, _a = this.texts; _i < _a.length; _i++) {
            var text = _a[_i];
            text.setSize(this.size);
        }
        _super.prototype.draw.call(this);
    };
    return SizeDecorator;
}(Decorator));
exports.SizeDecorator = SizeDecorator;
var texts = new Array();
texts.push(new Text("1"));
texts.push(new Text("2"));
texts.push(new Text("3"));
texts.push(new Text("4"));
var textComponent = new TextComponent(texts);
// Color, Font, Size 모두 Draw할 경우.
var colorFontSize = new ColorDecorator(new FontDecorator(new SizeDecorator(textComponent, '16px'), 'sans-serif'), 'black');
colorFontSize.draw();
var texts2 = new Array();
texts2.push(new Text("5"));
texts2.push(new Text("6"));
texts2.push(new Text("7"));
texts2.push(new Text("8"));
var textComponent2 = new TextComponent(texts2);
// Font, Size를 Draw할 경우
var fontSize = new FontDecorator(new SizeDecorator(textComponent2, '20px'), 'sans-serif');
fontSize.draw();
/*
1 / black / sans-serif / 16px
2 / black / sans-serif / 16px
3 / black / sans-serif / 16px
4 / black / sans-serif / 16px
5 /  / sans-serif / 20px
6 /  / sans-serif / 20px
7 /  / sans-serif / 20px
8 /  / sans-serif / 20px
*/
var AAA = /** @class */ (function () {
    function AAA() {
    }
    return AAA;
}());
exports.AAA = AAA;
var BBB = /** @class */ (function (_super) {
    __extends(BBB, _super);
    function BBB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BBB.prototype.text = function () {
    };
    ;
    return BBB;
}(AAA));
exports.BBB = BBB;
var CCC = /** @class */ (function (_super) {
    __extends(CCC, _super);
    function CCC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CCC.prototype.text = function () {
    };
    ;
    return CCC;
}(AAA));
exports.CCC = CCC;
var DDD = /** @class */ (function () {
    function DDD() {
    }
    DDD.prototype.text = function () {
    };
    ;
    return DDD;
}());
exports.DDD = DDD;
var EEE = /** @class */ (function () {
    function EEE() {
    }
    return EEE;
}());
exports.EEE = EEE;
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.setBBB = function (aaa) {
    };
    return Test;
}());
exports.Test = Test;
//TypeScript에서는 메소드 구조만 객체를 매개변수로 받을 수 있다.
var test = new Test();
test.setBBB(new BBB());
test.setBBB(new CCC());
test.setBBB(new DDD());
// test.setBBB(new EEE()); // error
