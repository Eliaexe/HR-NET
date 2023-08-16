
import { combineReducers } from "redux";
import { employeeReducer } from "./reducer.jsx"; 

const rootReducer = combineReducers({
  employees: employeeReducer, 
});

export default rootReducer;
