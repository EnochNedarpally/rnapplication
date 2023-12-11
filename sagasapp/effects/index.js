import {takeLatest, call, put,all} from 'redux-saga/effects';

import { ADD_CATEGORY, ADD_CATEGORY_SUCCESS, DELETE_CATEGORY, DELETE_CATEGORY_SUCCESS, LIST_CATEGORIES, LIST_CATEGORIES_SUCCESS, UPDATE_CATEGORY, UPDATE_CATEGORY_SUCCESS } from '../constants';

import { HttpService } from '../../services/httpServices';
 
function loadCategories (){
    let serv = new HttpService();
    let response = serv.getCategories().then(resp => resp.data);
    return Promise.resolve(response);
}

function updateCategory (category){
  let serv = new HttpService();
  let response = serv.putCategories(category.CategoryId,category).then(resp => resp.data);
  return Promise.resolve(response);
}

function saveCategory(category) {
    let serv = new HttpService();
    let response = serv.postCategory(category).then(resp => resp.data);
    return Promise.resolve(response);
}

function deleteCategoryList(categoryId) {

  let serv = new HttpService();
  let response = serv.deleteCategory(categoryId).then(resp => resp.data);
  return Promise.resolve(response);
}

function* addCategorySuccessOutputGeneraor(action){
  try {
    const category = action.payload;
    const cat ={...cat,CategoryId:parseInt(category.CategoryId)}
    const response = yield call(saveCategory, category);
    yield put({
        type: ADD_CATEGORY_SUCCESS,
        payload: response
    });
  }catch(e){
  }
}

function* addCategoryInputGenerator(){
     yield takeLatest(ADD_CATEGORY, addCategorySuccessOutputGeneraor);
} 


function* getCategoriesSuccessOutputGenerator(){
  
  try{
    const response = yield call(loadCategories);
    yield put ({
        type: LIST_CATEGORIES_SUCCESS,
        payload: response
    })
  }catch(e){
    console.log("error",e)
  }
}
function* updateCategorySuccessOutputGenerator(action){
  try{
    const response = yield call(updateCategory(action.payload));
    yield put ({
        type: UPDATE_CATEGORY_SUCCESS,
        payload: response
    })
  }catch(e){
    console.log("error",e)
  }
}
function* deleteCategorySuccessOutputGenerator(action){
  try{
    const response = yield call(deleteCategoryList(action.payload));
    yield put ({
        type: DELETE_CATEGORY_SUCCESS,
        payload: response
    })
  }catch(e){

  }
}
function* getCategoriesInputGenerator(){
  yield takeLatest(LIST_CATEGORIES, getCategoriesSuccessOutputGenerator);
}
function* deleteCategoryInputGenerator(){
  yield takeLatest(DELETE_CATEGORY, deleteCategorySuccessOutputGenerator);
}
function* updateCategoryInputGenerator(){
  yield takeLatest(UPDATE_CATEGORY, updateCategorySuccessOutputGenerator);
}

export default function* rootSaga(){
  yield all([getCategoriesInputGenerator(), addCategoryInputGenerator(),deleteCategoryInputGenerator(),updateCategoryInputGenerator()]);
} 