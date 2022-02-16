import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: ''}); /* Новый пост */

    const addNewPost = (e) => {
        e.preventDefault();

        create(post); /* Вызываем callback 'create' для создания нового элемента списка */
        setPost({title: '', body: ''}); /* Очищаем инпуты */
    }

    return (
        <form>
            <MyInput
                type="text"
                placeholder='Название поста'
                value={post.title}
                onChange={(e) => setPost({...post, title: e.target.value})} />

            <MyInput
                type="text"
                placeholder='Описание поста'
                value={post.body}
                onChange={(e) => setPost({...post, body: e.target.value})} />

            <MyButton onClick={addNewPost}>
                Создать
            </MyButton>
        </form>
    );
};

export default PostForm;