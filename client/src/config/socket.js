import io from "socket.io-client";

let socketInstance = null;

export const initializeSocket = (projectId) => {
    socketInstance = io(import.meta.env.VITE_API_URL, {
        transports: ["websocket"],
        withCredentials: true,
        auth: {
            token: localStorage.getItem("token")
        },
        query: {
            projectId
        }
    });

    return socketInstance;
};

export const receieveMessage = (eventName, cb) => {
    socketInstance.on(eventName, cb);
};

export const sendMessage = (eventName, data) => {
    if (!socketInstance) return;
    socketInstance.emit(eventName, data);
};
