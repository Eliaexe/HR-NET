
const initialEmployeeState = {
  employees: [], 
};

export const employeeReducer = (state = initialEmployeeState, action) => {
  if (action.type === 'employee/saveEmployee') {
    return {
      ...state,
      employees: [...state.employees, action.payload] 
    };
  } else {
    return state;
  }
};
