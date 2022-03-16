import React from 'react';
import PostItem from "./PostItem";
import {TransitionGroup, CSSTransition} from "react-transition-group";

const PostList = ({posts, title, remove}) => {
    if (!posts.length) {
        return <h1 style={{textAlign: 'center'}}>Постов нет!</h1>
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>
                {title}
            </h1>

            <TransitionGroup>
                {posts.map((elem, index) =>

                    <CSSTransition
                        key={elem.id}
                        timeout={400}
                        classNames="post"
                    >
                        <PostItem post={elem} index={index} remove={remove} />
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;