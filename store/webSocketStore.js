import { create } from "zustand";

export const useWebSocketStore = create((set, get) => ({
  socket: null,
  connected: false,
  lastMessage: null,
  url: `ws://10.26.22.21:8000/ws`,

  connect: () => {
    
    const socket = new WebSocket(get().url);

    socket.onopen = () => {
      console.log("WebSocket conectado");
      set({ connected: true });
    };

    socket.onmessage = (event) => {
      console.log("Mensaje recibido:", event.data);
      set({ lastMessage: JSON.parse(event.data) });
    };

    socket.onerror = (error) => {
      console.log("Error WebSocket:", error.message);
    };

    socket.onclose = () => {
      console.log("WebSocket cerrado");
      set({ connected: false });
    };

    set({ socket });
  },

  send: (msg) => {
    const socket = get().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(msg);
    } else {
      console.log("No se puede enviar, socket no conectado");
    }
  },

  disconnect: () => {
    const socket = get().socket;
    if (socket) socket.close();
    set({ socket: null, connected: false });
  },
}));
