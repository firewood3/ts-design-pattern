import { Server } from './server';
import { Client } from './client';

let server = new Server();

console.log(server);

let client = new Client(server);

console.log(client);