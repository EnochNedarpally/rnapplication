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
        this.posts = this.posts.filter(p=> {return p.id!==post.id})
        // return this.posts.splice(parseInt(post.id),1)
        return this.posts
    }
    updatePost(post){
        const index = this.posts.findIndex(obj => obj.id === post.id);
        this.posts[index]=post
        return this.posts
    }
}