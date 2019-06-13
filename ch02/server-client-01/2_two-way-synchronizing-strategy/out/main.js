"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var client_1 = require("./client");
var server = new server_1.Server();
console.log(server);
var client = new client_1.Client(server);
console.log(client);
