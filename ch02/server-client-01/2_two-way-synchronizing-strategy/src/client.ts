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