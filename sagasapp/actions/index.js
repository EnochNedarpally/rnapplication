/* Define Initiate and Success Actions */
import { createAction } from "@reduxjs/toolkit";
import { ADD_CATEGORY,DELETE_CATEGORY,LIST_CATEGORIES, UPDATE_CATEGORY} from "../constants";


export const addCategory = createAction(ADD_CATEGORY,(category) => {
    console.log("add category")
    return {
        payload: category
    };
});

export const listCategory = createAction(LIST_CATEGORIES,() => {
    
    return {
        payload: 'List Category Request is initiated'
    };
});
export const deleteCategory = createAction(DELETE_CATEGORY,(categoryId) => {
    // console.log("Actions",categoryId)
    return {
        payload: categoryId
    };
});
export const updateCategory = createAction(UPDATE_CATEGORY,(category) => {
    console.log("Actions",category)
    
    return {
        payload: category
    };
});

