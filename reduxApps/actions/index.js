import { createAction } from "@reduxjs/toolkit";

export const addEmp= createAction("ADD_EMP",(emp)=>{
    emp.EmpName=emp.EmpName.toUpperCase();
    return{
        payload:emp
    }
}) 
export const selEmp= createAction("SEL_EMP",(empDetail)=>{

    return{
        payload:empDetail
    }
}) 
export const clearselEmp= createAction("CLEAR_EMP",(empNo)=>{
    return{
        payload:empNo
    }
}) 
