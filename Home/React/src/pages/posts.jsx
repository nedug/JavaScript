import React, {useEffect, useRef, useState} from 'react';
import {usePosts} from "../components/hooks/usePosts";
import {useFetching} from "../components/hooks/useFetching";
import PostService from "../components/API/PostService";
import {getPagesCount} from "../utils/pages";
import MyButton from "../components/UI/button/MyButton";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import Loader from "../components/UI/Loader/Loader";
import PostList from "../components/PostList";
import Pagination from "../components/pagination/Pagination";
import {useObserver} from "../components/hooks/useObserver";
import NewSelect from "../components/UI/select/NewSelect";


const Posts = () => {
    const [posts, setPosts] = useState([]); /* Хук СОСТОЯНИЯ - Список постов */
    const [filter, setFilter] = useState({sort: '', search: ''}); /* ОБЩИЙ Хук СОСТОЯНИЙ - селект СОРТИРОВКИ и инпут ПОИСКА */
    const [modal, setModal] = useState(false); /* Хук МОДАЛЬНОГО ОКНА */
    const sortAndSearchPosts = usePosts(posts, filter.sort, filter.search); /* Пользовательский ХУК сортировки и поиска */
    const [totalPages, setTotalPages] = useState(0); /* Общее количество страниц */
    const [limit, setLimit] = useState(10); /* Лимит постов */
    const [page, setPage] = useState(1); /* Страницы для постов */
    const lastElem =  useRef();


    const [fetchPosts, postIsLoad, postError] = useFetching(async (limit, page) => { /* Для получения данных и обработки ошибок */
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);

        const totalCountPosts = response.headers['x-total-count'];
        setTotalPages(getPagesCount(totalCountPosts, limit));
    });


    useObserver(lastElem, page < totalPages, postIsLoad, () => {
        setPage(page + 1);
    })

    useEffect(() => { /* Хук для получения данных при монтировании, вызовется только один раз */
        fetchPosts(limit, page);
    }, [page, limit]);


    const createPost = (newPost) => {
        setPosts([...posts, {...newPost, id: Date.now()}]); /* Добавляем новый пост в список */
        setModal(false);
    }


    const removePost = (delPost) => {
        setPosts(posts.filter((elem) => elem.id !== delPost.id)); /* Создаем новый массив, без переданного элемента */
    }


    const changePage = (page) => {
        setPage(page);
    }


    return (
        <div className='App'>

            <MyButton
                style={{marginTop: 15}}
                onClick={() => setModal(true)}
            >
                Создать новый пост
            </MyButton>

            <MyModal
                visible={modal}
                setVisible={setModal}
            >
                <PostForm create={createPost} /> {/* Передаем callback, чтобы вызвать его внутри компонента */}
            </MyModal>

            <hr style={{margin: '15px 0'}} />

            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />

            <NewSelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue={'Кол. элементов на странице'}
                options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: -1, name: 'Показать все'},
                ]}
            />

            {postError &&
                <h1>Произошла ошибка - {postError}!</h1>
            }

            <PostList
                posts={sortAndSearchPosts}
                title={'Посты про JS'}
                remove={removePost}
            />

            <div style={{height: 20, background: 'red'}} ref={lastElem}> </div>

            {postIsLoad &&
                    <div style={{display: 'flex', justifyContent: 'center', margin: 50}} >
                        <Loader />
                    </div>
            }

            <Pagination
                totalPages={totalPages}
                page={page}
                changePage={changePage}
            />

        </div>
    );
};

export default Posts;

