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
// Context, Receiver
var TextContext = /** @class */ (function () {
    function TextContext() {
        this.content = 'text content';
    }
    TextContext.prototype.print = function () {
        console.log(this.content);
    };
    return TextContext;
}());
// Command
var TextCommand = /** @class */ (function () {
    function TextCommand(context) {
        this.context = context;
    }
    return TextCommand;
}());
// ConcreteCommand
var ReplaceCommand = /** @class */ (function (_super) {
    __extends(ReplaceCommand, _super);
    function ReplaceCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReplaceCommand.prototype.execute = function (index, length, text) {
        var content = this.context.content;
        this.context.content =
            content.substr(0, index) +
                text +
                content.substr(index + length);
    };
    return ReplaceCommand;
}(TextCommand));
// ConcreteCommand
var InsertCommand = /** @class */ (function (_super) {
    __extends(InsertCommand, _super);
    function InsertCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InsertCommand.prototype.execute = function (index, text) {
        var content = this.context.content;
        this.context.content =
            content.substr(0, index) +
                text +
                content.substr(index);
    };
    return InsertCommand;
}(TextCommand));
var TextCommandInvoker = /** @class */ (function () {
    function TextCommandInvoker(replaceCommand, insertCommand) {
        this.replaceCommand = replaceCommand;
        this.insertCommand = insertCommand;
    }
    TextCommandInvoker.prototype.replace = function (index, length, text) {
        this.replaceCommand.execute(index, length, text);
    };
    TextCommandInvoker.prototype.insert = function (index, text) {
        this.insertCommand.execute(index, text);
    };
    return TextCommandInvoker;
}());
var Client = /** @class */ (function () {
    function Client() {
        this.context = new TextContext();
        this.textCommandInvoker = new TextCommandInvoker(new ReplaceCommand(this.context), new InsertCommand(this.context));
    }
    Client.prototype.test = function () {
        this.context.print();
        this.textCommandInvoker.replace(0, 4, 'the');
        this.context.print();
        this.textCommandInvoker.insert(0, 'awesome ');
        this.context.print();
    };
    return Client;
}());
var client = new Client();
client.test();
/*
text content
the content
awesome the content
*/ 
