import socket from 'socket.io-client';
import Project from '../screens/Project';


let socketInstance = null;

export const initializeSocket = (projectId) =>{
    socketInstance = socket(import.meta.env.VITE_API_URL, {
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
            projectId
        }
    });

    return socketInstance;
}

export const receieveMessage = (eventName,cb) => {
    socketInstance.on(eventName, cb);
}

export const sendMessage = (eventName,cb) => {
    if (!socketInstance) return;
    socketInstance.emit(eventName, cb);
}