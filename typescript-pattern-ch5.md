# Behavioral Design Pattern
- Behavioral Design Pattern은 객체나 클래스가 어떻게 서로 상호작용하는가에 대한 것이다. 
- Behavioral Design Pattern의 실행은 보통 특정 데이터 구조를 필요로 한다.
- 패턴이 적용될때, behaviroal design pattern과 structural design pattern은 집중하는 관점이 다르다.
- behavioal Design Pattern은 Structural Design Pattern과 비교하면 보다 쉽고 좀더 직관적이다.

behavioral patterns
- Chain of Responsibility: 다른 범위의 행동을 조직한다.
- Command: 내부의 캡슐화된 문맥으로부터 명령들을 드러낸다.
- Memento: 세부적인 실행을 드러내는 것 없이 상태관리접을을 제공하는것.
- Iterator:
- Mediator:


## Chain of Responsibility pattern
- 목적에 따라 수행해야할 많은 시나리오가 있을 때 이 패턴을 사용할 수 있다.
- 책임연쇄 패턴은 "command object"와 "processing objects"로 이루어 진다.
- "처리 객체"는 "명령 객체"를 처리하는 로직을 가지고, 다음 "처리객체"로 "명령 객체"를 보낸다.(Chain)
- 특정 "처리 객체"가 처리할 수 없는 "명령"은 다음 "처리 객체"로 넘겨진다.(Chain)
- 책임 연쇄 패턴은 if-else if ... else .. else ... endif 문의 객체 지향 버전이다.

### Diagram
![chain of responsibility pattern](/images/chainOfResponsibility-pattern.png)
- Sender는 특정 Reciver를 직접적으로 참조하지 않는다.
- 그대신 Sender는 요청을 처리하기위해 Handler 인터페이스를 참조한다.(handler.handleRequest()) 그러면 Sender는 Receiver 독립적으로 요청을 처리할 수 있다.
- Receiver1, Receiver2, Receiver3은 Handler 인터페이스를 구현하고 요청을 다른 Receiver에게 전달한다.

### Participants
- Handler: next라는 다음 Handler를 지정하는 메소드와 명령을 받아 처리되는 로직을 정의하는 인터페이스
- Concrete Handler: Handler를 구현한 객체
- Client: Handler 체인에게 명령을 전달

### Implementation
```ts
// Help Information이라는 UI에서 Help창과 Feedback창을 선택적으로 나타내줄때.
// Commend Object
export type RequestType = 'help' | 'feedback';

export interface Request {
  type: RequestType;
}

export class Handler {
  private successor!: Handler;

  handle(request: Request): void {
    if (this.successor) {
      this.successor.handle(request);
    }
	}

	setSuccessor(successor: Handler): Handler {
		this.successor = successor;
		return successor;
  }
}

export class HelpHandler extends Handler {
  handle(request: Request): void {
    if (request.type === 'help') {
      console.log("Show help information.");
    } else {
      super.handle(request);
    }
  }
}

export class FeedbackHandler extends Handler {
  handle(request: Request): void {
    if (request.type === 'feedback') {
      console.log("Show feedback");
    } else {
      super.handle(request);
    }
  }
}

let handler = new Handler();
let helpHandler = handler.setSuccessor(new HelpHandler());
let feedbackHandler = helpHandler.setSuccessor(new FeedbackHandler());
// ... 체인..

handler.handle({type: "feedback"}); // Show feedback
handler.handle({type: "help"}); // Show Help Information



// LogLevel이 Notice이하인 경우, 에러 메시지를 이메일 전송, 다른 로그 레벨은 console.log 처리
export enum LogLevel {
	ERR = 1 , NOTICE = 2, DEBUG = 3
}

export abstract class Logger {	
	mask!: LogLevel;
	next!: Logger;

	setNext(logger: Logger) {
		this.next = logger;
		return logger;
	}

	message(msg: string, priority: LogLevel) {
		console.log(this.mask);
		console.log(priority);
		if (priority <= this.mask) {
			this.writeMessage(msg);
		}
		if (this.next != null) {
			this.next.message(msg, priority);
		}
	}

	abstract writeMessage(msg: string):void;
}

export class StdoutLogger extends Logger {
	constructor(mask: LogLevel) {
		super();
		super.mask = mask;
	}

	writeMessage(msg: string) {
		console.log(`stdout log: ${msg}`);
	}
}

export class EmailLogger extends Logger {
	constructor(mask: LogLevel) {
		super();
		super.mask = mask;
	}

	writeMessage(msg: string) {
		console.log(`Sending via email log: ${msg}`);
	}
}

export class StderrLogger extends Logger {
	constructor(mask: LogLevel) {
		super();
		super.mask = mask;
	}

	writeMessage(msg: string) {
		console.log(`stderr log: ${msg}`);
	}
}

// 책임 연쇄를 건설한다.
let logger: Logger,
	   next: Logger;

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
	} else if (value < 0.8) {
			throw new TypeError('Awesome type error');
	}
}

// TypeError 에러를 처리
function bar() {
	try {
			foo();
	} catch (error) {
			if (error instanceof TypeError) {
					console.log('Some type error occurs', error);
			} else {
					throw error;
			}
	}
}

// Error를 처리
function biu() {
	try {
			bar();
	} catch (error) {
			console.log('Some error occurs', error);
	}
}
// biu > bar > foo 순서로 호출됨
biu();
```

### Consequences
- Chain of Responsibility 패턴은 "command objects"를 발행하는 Client와 "processing objects"의 수행간에 연결을 분리한다. 
- Client는 처리 로직의 세부사항을 잘 알지 못해도 되고, Client에 새로운 명령에 따른 로직을 추가하는 것도 쉽다.
- Client의 명령을 처리하는데 상당한 유연성을 제공한다.

## Command Pattern
