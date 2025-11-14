import { Server } from 'socket.io';

export function connectToSocket(server) {
    const io = new Server(server);
    return io;
}