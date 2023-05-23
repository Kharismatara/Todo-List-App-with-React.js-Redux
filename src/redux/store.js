import { createStore } from "redux";
import rootReducer from "./reducers/TodoReducer";

const store = createStore(rootReducer);

export default store;
