// Context, Receiver
class TextContext {
    content = 'text content';

    print() {
     console.log(this.content);
    }
}

// Command
abstract class TextCommand {
    constructor(
        public context: TextContext
    ) { }

    abstract execute(...args: any[]): void;
}

// ConcreteCommand
class ReplaceCommand extends TextCommand {
    execute(index: number, length: number, text: string): void {
        let content = this.context.content;

        this.context.content =
            content.substr(0, index) +
            text +
            content.substr(index + length);
    }
}

// ConcreteCommand
class InsertCommand extends TextCommand {
    execute(index: number, text: string): void {
        let content = this.context.content;

        this.context.content =
            content.substr(0, index) +
            text +
            content.substr(index);
    }
}

// invoker
class TextCommandInvoker {
    constructor(
        private replaceCommand: ReplaceCommand,
        private insertCommand: InsertCommand
    ) { }

    replace(index: number, length: number, text: string): void {
        this.replaceCommand.execute(index, length, text);
    }
    
    insert(index: number, text: string): void {
        this.insertCommand.execute(index, text);
    }
}

// client
class Client {
    context: TextContext;
    textCommandInvoker: TextCommandInvoker;

    constructor() {
        this.context = new TextContext();
        this.textCommandInvoker = new TextCommandInvoker(new ReplaceCommand(this.context), new InsertCommand(this.context));
    }
    
    test() {
        this.context.print();
        this.textCommandInvoker.replace(0, 4, 'the');
        this.context.print();
        this.textCommandInvoker.insert(0, 'awesome ');
        this.context.print();
    }
}

let client = new Client();
client.test();
/*
text content
the content
awesome the content
*/