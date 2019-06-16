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
    function Text(c) {
        this.c = c;
        this.content = "";
        this.content = c;
    }
    Text.prototype.setColor = function (color) {
        this.content += color + " ";
    };
    Text.prototype.setFont = function (font) {
        this.content += font + " ";
    };
    Text.prototype.setSize = function (size) {
        this.content += size + " ";
    };
    Text.prototype.draw = function () {
        console.log(this.content);
    };
    return Text;
}());
exports.Text = Text;
var TextComponent = /** @class */ (function (_super) {
    __extends(TextComponent, _super);
    function TextComponent() {
        var _this = _super.call(this) || this;
        _this.texts = new Array();
        _this.texts.push(new Text("1"));
        _this.texts.push(new Text("2"));
        _this.texts.push(new Text("3"));
        _this.texts.push(new Text("4"));
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
var decoratedComponent = new ColorDecorator(new FontDecorator(new SizeDecorator(new TextComponent(), '10px'), 'sans-serif'), 'black');
decoratedComponent.draw();
var AAA = /** @class */ (function () {
    function AAA() {
    }
    return AAA;
}());
var BBB = /** @class */ (function (_super) {
    __extends(BBB, _super);
    function BBB() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BBB;
}(AAA));
var CCC = /** @class */ (function (_super) {
    __extends(CCC, _super);
    function CCC(bbb) {
        var _this = _super.call(this) || this;
        _this.bbb = bbb;
        return _this;
    }
    return CCC;
}(AAA));
var DDD = /** @class */ (function (_super) {
    __extends(DDD, _super);
    function DDD() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DDD;
}(CCC));
var EEE = /** @class */ (function (_super) {
    __extends(EEE, _super);
    function EEE() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return EEE;
}(CCC));
var FFF = /** @class */ (function (_super) {
    __extends(FFF, _super);
    function FFF() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FFF;
}(AAA));
var ABC = /** @class */ (function () {
    function ABC() {
    }
    ABC.prototype.setABC = function (bbb) {
    };
    return ABC;
}());
var ddd = new DDD(new EEE(new DDD(new BBB)));
var abc = new ABC();
abc.setABC(new FFF());
