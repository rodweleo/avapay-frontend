
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = "https://avapay-backend.fly.dev";

export const socket = io(SOCKET_SERVER_URL);