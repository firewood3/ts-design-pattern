// Subsystem
class Cpu {
  freeze(): void {}
  jump(): void {}
  execute(): void {}
}

// Subsystem
class HardDrive {
  read(): void {}
  save(): void {}
}

// Subsystem
class Memory {
  load(): void {}
}

// Façade
class ComputerFacade {
  processer: Cpu;
  ram: Memory;
  hd: HardDrive;

  constructor() {
    this.processer = new Cpu();
    this.ram = new Memory();
    this.hd = new HardDrive();
  }

  // 컴퓨터가 시작되는 부분은 상위계층의 인터페이스로 제공됨.
  start() {
    this.processer.freeze();
    this.ram.load();
    this.processer.jump();
    this.processer.execute();
  }
}

let computerFacade = new ComputerFacade();
computerFacade.start();
