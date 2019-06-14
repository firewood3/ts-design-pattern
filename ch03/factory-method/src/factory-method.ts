class Payload {
  constructor(
      public weight: number
  ) { }
}

class Engine {
  constructor(
      public thrust: number
  ) { }
}

class Stage {
  constructor(
      public engines: Engine[]
  ) { }
}

class Rocket {
  payload!: Payload;
  stages!: Stage[];
}

class RocketFactory {
  buildRocket(): Rocket {
    let rocket = this.createRocket();
    let payload = this.createPayload();
    let stages = this.createStages();
    rocket.payload = payload;
    rocket.stages = stages;
    return rocket;
  }
	
  createRocket(): Rocket {
    return new Rocket();
  }
  
  createPayload(): Payload {
    return new Payload(0);
	}
	
  createStages(): Stage[] {
    let engine = new Engine(1000);
    let stage = new Stage([engine]);
    return [stage];
  }
}

class FreightRocket extends Rocket { }

class Satellite extends Payload {
  constructor(
    public id: number
  ) {
     super(200);
  }
}

class FirstStage extends Stage {
  constructor() {
    super([
      new Engine(1000),
      new Engine(1000),
      new Engine(1000),
      new Engine(1000)
  ]); }
}

class SecondStage extends Stage {
  constructor() {
	super([
		new Engine(1000)
	]); }
}

type FreightRocketStages = [FirstStage, SecondStage];

class FreightRocketFactory extends RocketFactory {
  nextSatelliteId = 0;
  
  createRocket(): FreightRocket {
	  return new FreightRocket();
  }

  createPayload(): Satellite {
	return new Satellite(this.nextSatelliteId++);
  }
  
  createStages(): FreightRocketStages {
	return [
		new FirstStage(),
		new SecondStage()
	];
  } 
}


let rocketFactory = new RocketFactory();
let rocket = rocketFactory.buildRocket();

console.log(rocket);

let freightRocketFactory = new FreightRocketFactory();
let freightRocket = freightRocketFactory.buildRocket();

console.log(freightRocket);

/*
콘솔 출력
Rocket {
  payload: Payload { weight: 0 },  
  stages: [ Stage { engines: [Array] } ] 
}
	

FreightRocket {
  payload: Satellite { weight: 200, id: 0 },
  stages:[
    FirstStage { engines: [Array] },
    SecondStage { engines: [Array] }
  ]
}
*/