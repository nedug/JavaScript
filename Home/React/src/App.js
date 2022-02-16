import React, {useMemo, useRef, useState} from 'react';
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import  "./styles/App.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import NewSelect from "./components/UI/select/NewSelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";

const App = () => {

    const [posts, setPosts] = useState([ /* Хук СОСТОЯНИЯ - Список постов */
        {id: 1, title: 'JavaScriptt 1.', body: 'Yescription 1'},
        {id: 2, title: 'PavaScriptt 2', body: 'Gescription 2'},
        {id: 3, title: 'BavaScript 3', body: 'Lescription 3'},
        ]);

    // const [selectSort, setSelectSort] = useState(''); /* Хук СОСТОЯНИЯ - селект СОРТИРОВКИ */
    // const [inputSearch, setInputSearch] = useState(''); /* Хук СОСТОЯНИЯ - инпут ПОИСКА */

    const [filter, setFilter] = useState({sort: '', search: ''}); /* ОБЩИЙ Хук СОСТОЯНИЙ - селект СОРТИРОВКИ и инпут ПОИСКА */

    const [modal, setModal] = useState(false);

    const sortedPost = useMemo(() => { /* Используется для кэширования, МЕМОИЗАЦИИ сортировки ПОСТОВ */
        // console.log('memo');

        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort])); /* Сортировка списка постов по названию и описанию */
        }
        return posts;
    }, [filter.sort, posts]);


    const sortAndSearchPosts = useMemo(() => { /* Используется для кэширования, МЕМОИЗАЦИИ поиска по сортированным ПОСТам */
        return sortedPost.filter(elem => elem.title.toLowerCase().includes(filter.search.toLowerCase()));
    }, [filter.search, sortedPost]);


    const createPost = (newPost) => {
        setPosts([...posts, {...newPost, id: Date.now()}]); /* Добавляем новый пост в список */
        setModal(false);
    }


    const removePost = (delPost) => {
        setPosts(posts.filter((elem) => elem.id !== delPost.id)); /* Создаем новый массив, без переданного элемента */
    }


    // const sortPosts = (sort) => {
    //     setSelectSort(sort);
    //     SetFilter({...filter, sort})
    // }


    return (
        <div className='App'>
            <MyButton
                style={{marginTop: 15}}
                onClick={() => setModal(true)}>
                    Создать новый пост
            </MyButton>

            <MyModal
                visible={modal}
                setVisible={setModal} >

                <PostForm create={createPost} /> {/* Передаем callback, чтобы вызвать его внутри компонента */}
            </MyModal>

            <hr style={{margin: '15px 0'}} />

            <PostFilter
                filter={filter}
                setFilter={setFilter} />


            <PostList
                posts={sortAndSearchPosts}
                title={'Посты про JS'}
                remove={removePost} />
        </div>
    );
};

export default App;