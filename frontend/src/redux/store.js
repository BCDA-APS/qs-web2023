import { applyMiddleware, configureStore } from '@reduxjs/toolkit'
import serverReducer from "./serverSlice";
import thunk from "redux-thunk" 

export default configureStore({
  reducer: {
    server: serverReducer,
  },
}, applyMiddleware(thunk));