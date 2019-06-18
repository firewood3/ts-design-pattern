// js의 의존 관계 선언 패턴: 함수나 모듈 최 상단에 의존관계가 있는 모듈을 선언하는 것.
const hasOwnProperty = Object.prototype.hasOwnProperty;

export class Image {
	constructor(url: string) { }
}

// Flyweight 객체
export class Snowflake {
	// invariant state
	image: Image;

	constructor(
		public style: string
	) {
		let url = style + '.png';
		this.image = new Image(url);
	}

	// x, y, angle => variant state
	render(x: number, y: number, angle: number): void {
		// ... 
		console.log(`Style ${this.style}, x: ${x}, y: ${y}, angle: ${angle}`);
	}
}

// js의 메모제이션(Memoization) 패턴은 함수에 cache 프로퍼티를 사용하여 캐싱함
export class SnowFlakeFactory {
	// style을 key로 하고 Snowflake 객체를 값으로 하는 맵. 
	// A, B, C 스타일의 Snowflake가 캐싱되어 있음.
	cache: {
		[style: string]: Snowflake;
	} = {};

	get(style: string): Snowflake {
		// 전역 변수를 지역변수화 하여 사용하고 있음(js의 의존관계선언 패턴)
		let cache = this.cache;
		let snowflake: Snowflake;

		// 이미 저장되어있는 스타일의 Snowflake는 new를 통해 새로 생성하지 않고 캐싱되어 있는 Snowflake를 캐시에서 꺼내 사용함
		// Snowflake는 get 함수를 호출할때마다 생성되는 것이 아니고, 스타일의 갯수만큼만 생성됨.
		if (hasOwnProperty.call(cache, style)) {
			snowflake = cache[style];
			console.log('cached snowflake');
		} else {
			snowflake = new Snowflake(style);
			cache[style] = snowflake;
			console.log('new snowflake');
		}

		return snowflake;
	}
}

const SNOW_STYLES = ['A', 'B', 'C'];

// client
export class Sky {
	constructor(
		public width: number,
		public height: number
	) { }

	snow(factory: SnowFlakeFactory, count: number) {
		let stylesCount = SNOW_STYLES.length;
		
		for (let i = 0; i < count; i++) {
			let style = SNOW_STYLES[getRandomInteger(stylesCount)];
			let snowflake = factory.get(style);

			let x = getRandomInteger(this.width);
			let y = getRandomInteger(this.height);

			let angle = getRandomInteger(60);

			snowflake.render(x, y, angle);
		}
	}
}

function getRandomInteger(max: number): number {
	return Math.floor(Math.random() * max);
}

let sky = new Sky(10,10);
sky.snow(new SnowFlakeFactory, 100);

/*

new snowflake
Style C, x: 1, y: 2, angle: 59
cached snowflake
Style C, x: 4, y: 2, angle: 44
cached snowflake
Style C, x: 0, y: 8, angle: 10
new snowflake
Style B, x: 3, y: 2, angle: 24
cached snowflake
Style B, x: 8, y: 4, angle: 32
cached snowflake
Style C, x: 6, y: 7, angle: 13
new snowflake
Style A, x: 7, y: 4, angle: 38
cached snowflake
Style C, x: 6, y: 3, angle: 13
cached snowflake

*/