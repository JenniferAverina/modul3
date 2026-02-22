import { useCallback, useMemo } from "react";
import { useAppDispatch } from "./useAppDispatch"; 
import { useAppSelector } from "./useAppSelector"; 
import { setLoading, setPosts, setError } from "../store/postSlice";

export function usePosts() {
    const dispatch = useAppDispatch();

    //ini kl gapake hooks 
    // Inisialisasi state untuk menyimpan array posts 
    // const [posts, setPosts] = useState<Post[]>([]);
    // // Inisialisasi state untuk status data dengan nilai awal 'pending' 
    // const [state, setState] = useState<AsyncDataState>('pending');
    
    const items = useAppSelector((state) => state.posts.items) 
    const status = useAppSelector((state) => state.posts.state) 

    const reload = useCallback(async () => {
        dispatch(setLoading())

        try {
            const response = await fetch("http://localhost:5173/api/post")
            const data = await response.json()

            dispatch(setPosts(data.records))
        } catch (err) {
            dispatch(setError())
            console.error(err)
        }
    }, [dispatch])

  // Mengembalikan object yang berisi posts, reload, dan state
  return useMemo(() => ({
    posts: items,
    reload,
    state: status,
}), [items, reload, status]); 
}