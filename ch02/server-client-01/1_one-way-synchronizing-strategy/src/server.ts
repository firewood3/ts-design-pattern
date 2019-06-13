export interface DataStore {
    timestamp: number;
    data: string | undefined;
}

export class Server {
    store: DataStore = {
        timestamp: 0,
        data: ''
    };

    // 클라이언트의 타임스템프가 서버의 타임스템프 보다 작으면 서버의 DataStore를 클라이언트에 전달한다.
    getData(clientTimestamp: number): DataStore | undefined {
        if (clientTimestamp < this.store.timestamp) {
            return this.store;
        } else {
            return undefined;
        }
    }
}