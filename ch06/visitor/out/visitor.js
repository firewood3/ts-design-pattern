"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Concrete Element
var Text = /** @class */ (function () {
    function Text(content) {
        this.content = content;
    }
    Text.prototype.appendTo = function (visitor) {
        visitor.appendText(this);
    };
    return Text;
}());
exports.Text = Text;
// Concrete Element
var BoldText = /** @class */ (function () {
    function BoldText(content) {
        this.content = content;
    }
    BoldText.prototype.appendTo = function (visitor) {
        visitor.appendBold(this);
    };
    return BoldText;
}());
// Concrete Element
var UnorderedList = /** @class */ (function () {
    // UnorderedList는 자식 Element[]를 Composite하고 있음
    function UnorderedList(items) {
        this.items = items;
    }
    UnorderedList.prototype.appendTo = function (visitor) {
        visitor.appendUnorderedList(this);
    };
    return UnorderedList;
}());
// Concrete Element
var ListItem = /** @class */ (function () {
    function ListItem(content) {
        this.content = content;
    }
    ListItem.prototype.appendTo = function (visitor) {
        visitor.appendListItem(this);
    };
    return ListItem;
}());
// Concrete Visitor
var HTMLVisitor = /** @class */ (function () {
    function HTMLVisitor() {
        // 각 Element가 실행될때마다 output을 추가함
        this.output = '';
    }
    // 각 Element에 맞는 실행을 구현함
    HTMLVisitor.prototype.appendText = function (text) {
        this.output += text.content;
    };
    HTMLVisitor.prototype.appendBold = function (text) {
        this.output += "<b>" + text.content + "</b>";
    };
    HTMLVisitor.prototype.appendUnorderedList = function (list) {
        this.output += '<ul>';
        for (var _i = 0, _a = list.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.appendTo(this);
        }
        this.output += '</ul>';
    };
    HTMLVisitor.prototype.appendListItem = function (item) {
        this.output += "<li>" + item.content + "</li>";
    };
    return HTMLVisitor;
}());
// Concrete Visitor
var MarkdownVisitor = /** @class */ (function () {
    function MarkdownVisitor() {
        // 각 Element가 실행될때마다 output을 추가함
        this.output = '';
    }
    MarkdownVisitor.prototype.appendText = function (text) {
        this.output += text.content;
    };
    MarkdownVisitor.prototype.appendBold = function (text) {
        this.output += "**" + text.content + "**";
    };
    MarkdownVisitor.prototype.appendUnorderedList = function (list) {
        this.output += '\n';
        for (var _i = 0, _a = list.items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.appendTo(this);
        }
    };
    MarkdownVisitor.prototype.appendListItem = function (item) {
        this.output += "- " + item.content + "\n";
    };
    return MarkdownVisitor;
}());
// 모든 Node를 composite하는 객체
var nodes = [
    new Text('Hello, '),
    new BoldText('TypeScript'),
    new Text('! Popular editors:\n'),
    new UnorderedList([
        new ListItem('Visual Studio Code'),
        new ListItem('Visual Studio'),
        new ListItem('WebStorm')
    ])
];
var htmlVisitor = new HTMLVisitor();
var markdownVisitor = new MarkdownVisitor();
// 모든 노드를 순회하면서 appendTo 명령을 실행함 
for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
    var node = nodes_1[_i];
    node.appendTo(htmlVisitor);
    node.appendTo(markdownVisitor);
}
console.log(htmlVisitor.output);
/*
Hello, <b>TypeScript</b>! Popular editors:
<ul><li>Visual Studio Code</li><li>Visual Studio</li><li>WebStorm</li></ul>
*/
console.log(markdownVisitor.output);
/*
Hello, **TypeScript**! Popular editors:

- Visual Studio Code
- Visual Studio
- WebStorm
*/ 
