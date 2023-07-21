
import { combineReducers } from "redux";
import { employeeReducer } from "./reducer"; 

const rootReducer = combineReducers({
  employees: employeeReducer, 
});

export default rootReducer;
