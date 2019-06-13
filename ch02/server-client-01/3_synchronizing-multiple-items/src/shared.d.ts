export interface SyncingRequest {
    timestamp: number;
}

export interface SyncingResponse {
    timestamp: number;
    changes: {
        [id: string]: string;
    };
}