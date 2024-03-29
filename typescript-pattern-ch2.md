# The Callenge of Increasing Complexity
프로그램의 본질은 선택(상태에 기반한)과 브런치(로직)의 조합이다.

프로그램이 진화하는 동안, 브런치와 상태가 증가한다. 하지만 이것은 위험하다. 왜냐하면 사람의 두뇌에는 용량의 제한이 있기때문에..

간단한 서버-클라이언트 프로그램을 실행해보고 이 프로그램에 나타난 복잡성을 어떻게 줄여나갈지 생각해본다. (이 서버-클라이언트 프로그램은 HTTP나 Socket을 사용하지 않고 함수를 사용하여 직접 통신한다.)


client.ts
```ts
import { Server, DataStore } from '../src/server';

export class Client {
    store: DataStore = {
        timestamp: 0,
        data: undefined
    };

    constructor (public server: Server) {}

    // 클라이언트의 DataStore와 서버의 DataStore의 동기를 맞춘다.
    synchronize() : void {
        let updatedStore = this.server.synchronize(this.store);

        if (updatedStore) {
            this.store = updatedStore;
        }
    }

    update(data: string): void {
        this.store.data = data;
        this.store.timestamp = Date.now();
    }
}
```

server.ts
```ts
export interface DataStore {
    timestamp: number;
    data: string | undefined;
}

export class Server {
    store: DataStore = {
        timestamp: 0,
        data: ''
    };

    // 클라이언트의 DataStore와 서버의 DataStore의 동기를 맞춘다.
    synchronize(clientDataStore: DataStore): DataStore | undefined {
        if (clientDataStore.timestamp > this.store.timestamp) {
            this.store = clientDataStore;
            return undefined;
        } else if (clientDataStore.timestamp < this.store.timestamp) {
            return this.store;
        } else {
            return undefined;
        }
    }
}
```