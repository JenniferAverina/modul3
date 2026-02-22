import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AsyncDataState, Post } from "../types";

interface PostState {
    items: Post[]
    state: AsyncDataState
}

const initialState: PostState = {
    items: [],
    state: 'pending',
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setLoading(state) {
            state.state = 'loading'
        },
        setPosts(state, action: PayloadAction<Post[]>) {
            state.items = action.payload;
            state.state = 'fulfilled'
        },
        setError(state) {
            state.state = 'error';
        },
        deletePost(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updatePost(state, action: PayloadAction<Post>) {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        }
    }
});

export const { setLoading, setPosts, setError, deletePost, updatePost } = postSlice.actions;
export default postSlice.reducer;