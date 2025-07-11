import { io } from "socket.io-client";

const SOCKET_SERVER_URL = import.meta.env.VITE_BACKEND_PROD_SERVER_URL!;

export const socket = io(SOCKET_SERVER_URL);
