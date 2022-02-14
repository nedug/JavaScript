import React, {useState} from 'react';
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import  "./styles/App.css";
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";

const App = () => {

    // let likes = 0;
    // const [value, setValue] = useState('Текст в input');

    const [posts, setPosts] = useState([
        {id: 1, title: 'JavaScript 1', body: 'Description 1'},
        {id: 2, title: 'JavaScript 2', body: 'Description 2'},
        {id: 3, title: 'JavaScript 3', body: 'Description 3'},
        ]);

    // const [posts2, setPosts2] = useState([
    //     {id: 1, title: 'Python 1', body: 'DescriptionP 1'},
    //     {id: 2, title: 'Python 2', body: 'DescriptionP 2'},
    //     {id: 3, title: 'Python 3', body: 'DescriptionP 3'},
    // ]);




    return (
        <div className='App'>
            <form>
                <input type="text" placeholder='Название поста' />
                <input type="text" placeholder='Описание поста' />
                <MyButton>
                    Создать
                </MyButton>
            </form>

            <PostList posts={posts} title={'Посты про JS'}/>



            {/*<PostList posts={posts2} title={'Посты про Python'}/>*/}

            {/*<Counter value={0}/>*/}
            {/*<Counter value={5}/>*/}
            {/*<Counter value={13}/>*/}

            {/*<h2>{value}</h2>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}/> <br/>*/} {/* Управляемый компонент формы*/}
        </div>
    );
};

export default App;