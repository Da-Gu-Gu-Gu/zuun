import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SocketContext, socket } from "./socket/socket";

// persistor.purge();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SocketContext.Provider value={socket}>
        <App />
      </SocketContext.Provider>
    </PersistGate>
  </Provider>
);
