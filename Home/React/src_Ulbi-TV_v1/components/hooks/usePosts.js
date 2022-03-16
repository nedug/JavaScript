import {useMemo} from "react";

/* Пользовательские ХУКИ */

const useSortedPost = (posts, sort) => {

    const sortedPost = useMemo(() => { /* Используется для кэширования, МЕМОИЗАЦИИ сортировки ПОСТОВ */

        if (sort) {
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort])); /* Сортировка списка постов по названию и описанию */
        }
        return posts;
    }, [sort, posts]);

    return sortedPost;
}


const usePosts = (posts, sort, search) => {

    const sortedPost = useSortedPost(posts, sort);

    return useMemo(() => { /* Используется для кэширования, МЕМОИЗАЦИИ поиска по сортированным ПОСТам */

        return sortedPost.filter(elem => elem.title.toLowerCase().includes(search.toLowerCase()));
    }, [search, sortedPost]);
}


export {useSortedPost, usePosts};