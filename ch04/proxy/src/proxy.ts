

interface Storage {
    get<T>(key: string): Promise<T>;
    set<T>(key: string, value: T): Promise<void>;
}

interface Permission {
    write: boolean;
    read: boolean;
}
// @ts-ignore
class IndexedDBStorage implements Storage {
    // @ts-ignore
    private dbPromise: Promise<IDBDatabase>;

    constructor(
        public name: string,
        public permission: Permission,
        public storeName = 'default'
    ) { }

    private get dbReady(): Promise<IDBDatabase> {
        if (!this.dbPromise) {
            // @ts-ignore
            this.dbPromise = new Promise<IDBDatabase>((resolve, reject) => {
                let request = indexedDB.open(name);

                request.onsuccess = event => {
                    resolve(request.result);
                };

                request.onerror = event => {
                    reject(request.error);
                };
            });
        }

        return this.dbPromise;
    }

    get<T>(key: string): Promise<T> {
        if (!this.permission.read) {
            // @ts-ignore
            return Promise.reject<T>(new Error('Permission denied'));
        }

        return this
            .dbReady
            // @ts-ignore
            .then(db => new Promise<T>((resolve, reject) => {
                let transaction = db.transaction(this.storeName);
                let store = transaction.objectStore(this.storeName);

                let request = store.get(key);

                request.onsuccess = event => {
                    resolve(request.result);
                };

                request.onerror = event => {
                    reject(request.error);
                };
            }));
    }

    set<T>(key: string, value: T): Promise<void> {
        if (!this.permission.write) {
            // @ts-ignore
            return Promise.reject(new Error('Permission denied'));
        }

        return this
            .dbReady
            // @ts-ignore
            .then(db => new Promise<void>((resolve, reject) => {
                let transaction = db.transaction(this.storeName, 'readwrite');
                let store = transaction.objectStore(this.storeName);
                // @ts-ignore
                let request = store.put(key, value);

                request.onsuccess = event => {
                    resolve();
                };

                request.onerror = event => {
                    reject(request.error);
                };
            }));
    }
}

let storage = new IndexedDBStorage('foo', {
    read: true,
    write: true
});