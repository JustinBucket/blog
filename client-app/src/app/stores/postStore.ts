import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Post } from "../models/post";

export default class PostStore {
    postRegistry: Map<string, Post> = new Map<string, Post>();
    types: string[] = [];
    selectedPost: Post | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this);
    }

    get postsByDate() {
        return Array.from(this.postRegistry.values()).sort((a, b) => Date.parse(a.creationDate) - Date.parse(b.creationDate));
    }

    loadPosts = async () => {
        this.setLoadingInitial(true);

        try {
            const posts = await agent.Posts.list();
            this.types = await agent.Posts.types();

            posts.forEach((post) => {
                this.setPost(post);
            });

            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    loadPost = async (id: string) => {
        
        let post = this.getPost(id);

        if (post) {
            this.selectedPost = post;
            return post;
        } else {
            this.loadingInitial = true;
            try {
                post = await agent.Posts.details(id);
                this.setPost(post);
                runInAction(() => {
                    this.selectedPost = post;
                });
                this.setLoadingInitial(false);
                return post;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setPost = (post: Post) => {
        post.creationDate = post.creationDate.split("T")[0];
        this.postRegistry.set(post.id, post);
    }

    private getPost = (id: string) => {
        return this.postRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    createPost = async (post: Post) => {
        this.loading = true;

        try {
            await agent.Posts.create(post);

            runInAction(() => {
                this.postRegistry.set(post.id, post);
                this.selectedPost = post;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };

    updatePost = async (post: Post) => {
        this.loading = true;

        try {
            await agent.Posts.update(post);
            runInAction(() => {
                this.postRegistry.set(post.id, post);
                this.selectedPost = post;
                this.editMode = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);

            runInAction(() => {
                this.loading = false;
            });
        }
    };

    deletePost = async (id: string) => {
        this.loading = true;

        try {
            await agent.Posts.delete(id);
            runInAction(() => {
                this.postRegistry.delete(id);
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}
