export type AsyncDataState = 'pending' | 'loading' | 'fulfilled' | 'error'; 

export interface Post {
    id: string;         
    content: string;    
    status: string;     
    title: string;      
    user: { name: string }; 
    createdAt: string;
}

export type UserInfo = {
    email: string;
    id: string;
    name: string
    role: string
}

export type CreatePostPayload = {
    title: string; 
    content: string; 
};