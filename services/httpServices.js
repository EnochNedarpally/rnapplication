import axios from 'axios';

export class HttpService{
    constructor(){
        this.url = "https://catprdapi.azurewebsites.net/api/category";
    }
    getCategories(){
        let response = axios.get(this.url)   
        return response;
    }
    getCategoryById(id){
        let response = axios.get(`${this.url}/${id}`)  
        return response;
    }
    postCategory(cat){
        let response = axios.post(this.url,cat,{
            headers:{
                'Content-Type':'application/json', 
            }
        })  
        return response;
    }
    putCategories(id,cat){
        let response = axios.put(`${this.url}/${id}`,cat,{
            headers:{
                'Content-Type':'application/json', 
            }
        })  
        return response;
    }
    deleteCategory(id){
        let response = axios.delete(`${this.url}/${id}`);
        return response
    }
}