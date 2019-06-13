import {SyncingRequest, SyncingResponse} from '../src/shared';

export interface ServerDataItem {
    id: string;
    timestamp: number;
    value: string;
}

export interface ServerDataStore {
    items: {
        [id: string]: ServerDataItem;
    };
}

export class Server {

    store: ServerDataStore;

    constructor() {
        this.store = {
            items: {
                item1: {id: '1', timestamp: 2018, value: '123' },
                item2: {id: '2', timestamp: 2019, value: '123' },
            }
        };
    }

    synchronize(request: SyncingRequest): SyncingResponse {
        let lastTimestamp = request.timestamp;
        let now = Date.now();
        let serverChanges : {[id: string]: any} = Object.create(null);

        let items = this.store.items;

        for (let id of Object.keys(items)) {
            let item = items[id];
            if (item.timestamp > lastTimestamp) {
              serverChanges[id] = item.value;
            }
        }

        return {
            timestamp: now,
            changes: serverChanges
        };
    }
}