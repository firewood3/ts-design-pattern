// element
interface Node {
  appendTo(visitor: NodeVisitor): void;
}

// visitor
interface NodeVisitor {
  appendText(text: Text): void;
  appendBold(text: BoldText): void;
  appendUnorderedList(list: UnorderedList): void;
  appendListItem(item: ListItem): void;
}

// Concrete Element
export class Text implements Node {
  constructor(
    public content: string
	) { }
	
  appendTo(visitor: NodeVisitor): void {
    visitor.appendText(this);
  }
}

// Concrete Element
class BoldText implements Node {
  constructor(
    public content: string
  ) { }

  appendTo(visitor: NodeVisitor): void {
    visitor.appendBold(this);
  }
}

// Concrete Element
class UnorderedList implements Node {
	// UnorderedList는 자식 Element[]를 Composite하고 있음
  constructor(
    public items: ListItem[]
  ) { }

  appendTo(visitor: NodeVisitor): void {
    visitor.appendUnorderedList(this);
  }
}

// Concrete Element
class ListItem implements Node {
  constructor(
    public content: string
  ) { }

  appendTo(visitor: NodeVisitor): void {
    visitor.appendListItem(this);
  }
}

// Concrete Visitor
class HTMLVisitor implements NodeVisitor {
	// 각 Element가 실행될때마다 output을 추가함
  output = '';

	// 각 Element에 맞는 실행을 구현함
  appendText(text: Text) {
    this.output += text.content;
  }

  appendBold(text: BoldText) {
    this.output += `<b>${text.content}</b>`;
  }

  appendUnorderedList(list: UnorderedList) {
		this.output += '<ul>';
			
    for (let item of list.items) {
      item.appendTo(this);
		}
			
    this.output += '</ul>';
  }

  appendListItem(item: ListItem) {
    this.output += `<li>${item.content}</li>`;
  }
}

// Concrete Visitor
class MarkdownVisitor implements NodeVisitor {
	// 각 Element가 실행될때마다 output을 추가함
  output = '';

  appendText(text: Text) {
    this.output += text.content;
  }

  appendBold(text: BoldText) {
    this.output += `**${text.content}**`;
  }

  appendUnorderedList(list: UnorderedList) {
		this.output += '\n';
			
    for (let item of list.items) {
      item.appendTo(this);
    }
  }

  appendListItem(item: ListItem) {
    this.output += `- ${item.content}\n`;
  }
}

// 모든 Node를 composite하는 객체
let nodes: Node[] = [
  new Text('Hello, '),
  new BoldText('TypeScript'),
  new Text('! Popular editors:\n'),
  new UnorderedList([
    new ListItem('Visual Studio Code'),
    new ListItem('Visual Studio'),
    new ListItem('WebStorm')
  ])
];

let htmlVisitor = new HTMLVisitor();
let markdownVisitor = new MarkdownVisitor();

// 모든 노드를 순회하면서 appendTo 명령을 실행함 
for (let node of nodes) {
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