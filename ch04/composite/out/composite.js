"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CompositeHTMLNode = /** @class */ (function () {
    function CompositeHTMLNode(tagName) {
        this.tagName = tagName;
        this.nodes = Array();
    }
    CompositeHTMLNode.prototype.print = function () {
        console.log("<" + this.tagName + ">");
        this.nodes.forEach(function (node) { return node.print(); });
        console.log("</" + this.tagName + ">");
    };
    CompositeHTMLNode.prototype.addNode = function (node) {
        this.nodes.push(node);
    };
    return CompositeHTMLNode;
}());
exports.CompositeHTMLNode = CompositeHTMLNode;
var ImageNode = /** @class */ (function () {
    function ImageNode(imagePath) {
        this.imagePath = imagePath;
    }
    ImageNode.prototype.print = function () {
        console.log("<img src=\"" + this.imagePath + "\"></img>");
    };
    return ImageNode;
}());
exports.ImageNode = ImageNode;
var TextNode = /** @class */ (function () {
    function TextNode(message) {
        this.message = message;
    }
    TextNode.prototype.print = function () {
        console.log(this.message);
    };
    return TextNode;
}());
exports.TextNode = TextNode;
var HTMLDom = /** @class */ (function () {
    function HTMLDom() {
        this.initHTML();
    }
    HTMLDom.prototype.initHTML = function () {
        this.html = new CompositeHTMLNode("html");
        var head = new CompositeHTMLNode("head");
        var body = new CompositeHTMLNode("body");
        var title = new CompositeHTMLNode("title");
        var heading = new CompositeHTMLNode("heading");
        var imageInBody = new ImageNode("src/hello_world.png");
        var textInTitle = new TextNode("Hello world");
        var textInHeading = new TextNode("Welcome to hello world");
        this.html.addNode(head);
        this.html.addNode(body);
        head.addNode(title);
        title.addNode(textInTitle);
        body.addNode(heading);
        body.addNode(imageInBody);
        heading.addNode(textInHeading);
    };
    HTMLDom.prototype.printHtml = function () {
        this.html.print();
    };
    return HTMLDom;
}());
exports.HTMLDom = HTMLDom;
var dom = new HTMLDom();
dom.printHtml();
/*
콘솔 출력

<html>
<head>
<title>
Hello world
</title>
</head>
<body>
<heading>
Welcome to hello world
</heading>
<img src="src/hello_world.png"></img>
</body>
</html>

*/
