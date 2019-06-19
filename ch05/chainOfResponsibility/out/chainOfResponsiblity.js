"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Handler {
    handle(request) {
        if (this.successor) {
            this.successor.handle(request);
        }
    }
    setSuccessor(successor) {
        this.successor = successor;
        return successor;
    }
}
exports.Handler = Handler;
class HelpHandler extends Handler {
    handle(request) {
        if (request.type === 'help') {
            console.log("Show help information.");
        }
        else {
            super.handle(request);
        }
    }
}
exports.HelpHandler = HelpHandler;
class FeedbackHandler extends Handler {
    handle(request) {
        if (request.type === 'feedback') {
            console.log("Show feedback");
        }
        else {
            super.handle(request);
        }
    }
}
exports.FeedbackHandler = FeedbackHandler;
let handler = new Handler();
let helpHandler = handler.setSuccessor(new HelpHandler());
let feedbackHandler = helpHandler.setSuccessor(new FeedbackHandler());
// ... 체인..
handler.handle({ type: "feedback" }); // Show feedback
handler.handle({ type: "help" }); // Show Help Information
// LogLevel이 Notice이하인 경우, 에러 메시지를 이메일 전송, 다른 로그 레벨은 console.log 처리
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERR"] = 1] = "ERR";
    LogLevel[LogLevel["NOTICE"] = 2] = "NOTICE";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class Logger {
    setNext(logger) {
        this.next = logger;
        return logger;
    }
    message(msg, priority) {
        console.log(this.mask);
        console.log(priority);
        if (priority <= this.mask) {
            this.writeMessage(msg);
        }
        if (this.next != null) {
            this.next.message(msg, priority);
        }
    }
}
exports.Logger = Logger;
class StdoutLogger extends Logger {
    constructor(mask) {
        super();
        super.mask = mask;
    }
    writeMessage(msg) {
        console.log(`stdout log: ${msg}`);
    }
}
exports.StdoutLogger = StdoutLogger;
class EmailLogger extends Logger {
    constructor(mask) {
        super();
        super.mask = mask;
    }
    writeMessage(msg) {
        console.log(`Sending via email log: ${msg}`);
    }
}
exports.EmailLogger = EmailLogger;
class StderrLogger extends Logger {
    constructor(mask) {
        super();
        super.mask = mask;
    }
    writeMessage(msg) {
        console.log(`stderr log: ${msg}`);
    }
}
exports.StderrLogger = StderrLogger;
// 책임 연쇄를 건설한다.
let logger, next;
logger = new StdoutLogger(LogLevel.DEBUG);
next = logger.setNext(new EmailLogger(LogLevel.NOTICE));
next = next.setNext(new StderrLogger(LogLevel.ERR));
logger.message("debug", LogLevel.DEBUG);
logger.message("notice", LogLevel.NOTICE);
logger.message("err", LogLevel.ERR);
/*

// DEBUG 명령 => stdout 책임 처리
stdout log: debug

// notice 명령 => stdout, email 책임 처리
stdout log: notice
sending via email log: notice

// err 명령 => stdout, email, err 책임 처리
stdout log: err
sending via email log: err
stderr log: err

*/
// try..catch도 책임 연쇄 패턴의 예이다.
// TypeError나 Error를 생성
function foo() {
    let value = Math.random();
    if (value < 0.5) {
        throw new Error('Awesome error');
    }
    else if (value < 0.8) {
        throw new TypeError('Awesome type error');
    }
}
// TypeError 에러를 처리
function bar() {
    try {
        foo();
    }
    catch (error) {
        if (error instanceof TypeError) {
            console.log('Some type error occurs', error);
        }
        else {
            throw error;
        }
    }
}
// Error를 처리
function biu() {
    try {
        bar();
    }
    catch (error) {
        console.log('Some error occurs', error);
    }
}
// biu > bar > foo 순서로 호출됨
biu();
