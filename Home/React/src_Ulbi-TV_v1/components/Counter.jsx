import React, {useState} from 'react';


const Counter = (props) => {

    const [likes, setLikes] = useState(props.value);

    function increment() {
        // setLikes(++likes); /* Так меняем саму переменную, const не подойдет */

        setLikes(likes + 1);
    }

    function decrement() {
        setLikes(likes - 1);
    }
    return (
        <div>
            <h2>{likes}</h2>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    );
};

export default Counter;