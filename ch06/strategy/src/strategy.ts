interface BillingStrategy {
	getActPrice(rawPrice: number): number;
}

// 할인 없음
class NormalBillingStrategy implements BillingStrategy {
	getActPrice(rawPrice: number): number {
		return rawPrice;
	}	
}

// 50% 할인
class HappHourStrategy implements BillingStrategy {
	getActPrice(rawPrice: number): number {
		return rawPrice;
	}	
}

class Customer {
	// 고객이 주문한 음료의 가격을 저장하는 배열
	drinks: number[] = [];
	calcStrategy: BillingStrategy;

	constructor(strategy :BillingStrategy) {
		this.calcStrategy = strategy;
	}

	add(price: number) {
		this.drinks.push(this.calcStrategy.getActPrice(price));
	}

	printBill() {
		let total = this.drinks.reduce((a,b)=>a + b);
		console.log("Total due: " + total);
		this.drinks = [];
	}
}

// 전략을 런타임시에 결정할 수 있다.
let customer = new Customer(new HappHourStrategy());
customer.add(100);
customer.add(200);
customer.add(300);

customer.printBill();

/*
Total due: 600
*/
