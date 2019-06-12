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