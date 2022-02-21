import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../components/hooks/useFetching";
import PostService from "../components/API/PostService";
import {getPagesCount} from "../utils/pages";
import Loader from "../components/UI/Loader/Loader";

const PostIdPages = () => {

    const params = useParams();

    const[post, setPost] = useState({});
    const[comment, setComment] = useState([]);

    const [fetchPostByID, postIsLoad, postError] = useFetching(async (id) => {
        const response = await PostService.getByID(id);
        setPost(response.data);

    });

    const [fetchPosCommentByID, commIsLoad, commError] = useFetching(async (id) => {
        const response = await PostService.getCommentsByPostId(id);
        setComment(response.data);

    });


    useEffect(() => {
        fetchPostByID(params.id);
        fetchPosCommentByID(params.id);
    }, [])

    return (
        <div>
            <h2>Вы открыли страницу поста c ID = {params.id}</h2>

            {postIsLoad
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            <br/>
            <div>
                Комментарии:
                {commIsLoad
                    ? <Loader/>

                    : <div>{comment.map(comm =>

                        <div key={comm.id} style={{marginTop: 15}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )

                    }</div>



                    // : <div>{comment.name}. {comment.email}</div>
                }
            </div>

        </div>
    );
};

export default PostIdPages;