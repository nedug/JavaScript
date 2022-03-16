import React from 'react';
import MyButton from "./UI/button/MyButton";
import {useNavigate } from "react-router-dom";

const PostItem = ({post, index, remove}) => {

    const router = useNavigate();

    const removeCurrentPost = () => {
        remove(post); /* Удалем текущий пост */
    }

    return (
        <div className="post">
            <div className="post__content">
                <strong>{post.id}. {post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton
                    // onClick={() => router.push(`/posts/${post.id}`)}>
                    onClick={() => router(`/posts/${post.id}`)}>
                    Открыть
                </MyButton>
                <MyButton
                    onClick={removeCurrentPost}>
                        Удалить
                </MyButton>
            </div>
        </div>
    );
};

export default PostItem;