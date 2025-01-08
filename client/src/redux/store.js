import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
   
  })


const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: () => new Tuple( logger),
  
});

export const persistor = persistStore(store);