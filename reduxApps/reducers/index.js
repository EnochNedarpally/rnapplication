const { createReducer } = require("@reduxjs/toolkit");
const { addEmp, selEmp, clearselEmp } = require("../actions");


const initialState={
    emps:[],
    selEmp:{}
}

const reducer = createReducer(initialState,(builder)=>{
    builder.addCase(addEmp,(state,action)=>{
        state.emps=[...state.emps,action.payload]
        return state    
    })
    builder.addCase(selEmp,(state,action)=>{
        state.selEmp = action.payload
        return state    
    })
    builder.addCase(clearselEmp,(state,action)=>{
        state.selEmp = {}
        return state    
    })
})
export default reducer