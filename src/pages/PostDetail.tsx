import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Post = {
    id: string;
    content: string;
    status: string;
    title: string;
    user: {
        name: string
    }
    userId: string
    createdAt: string
    deletedAt: string
    updatedAt: string
}

export default function PostDetail() {
    const { id } = useParams();
    const [ post, setPost ]   = useState<Post>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/post/${id}`)
            const data = await response.json();
            setPost(data);
        }
        fetchPost();
    }, [id])

    //logic buat backin ke halaman sbelomnya
    const back = () => {
        navigate(-1);
    }

    //kalo gamau pake if langsung aja pake tanda tanya (?)
    return <div>
        <div>title: {post?.title}</div>
        <div>content: {post?.content}</div>
        <div>
            <button onClick={back}>Back</button>
        </div>
    </div>


    // if (!post) {
    //     return <div>Post not found</div>
    // }

    // return <div>
    //     <div>title: {post.title}</div>
    //     <div>content: {post.content}</div>
    // </div>


}