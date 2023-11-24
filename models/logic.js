import { posts } from "./collections";

export class Blogger{
    constructor(){
        this.posts = posts;
    }
    getPosts(){
        return this.posts;
    }

    createNewPost(post){
        this.posts.push(post)
        return this.posts
    }
    deletPost(post){
        this.posts.filter(p=> {post.id!==post.id})
    }
    updatePost(post){
        this.post.map(p=>{
            if(p.id == post.id){
                return post
            }
            return p
        })
    }
}