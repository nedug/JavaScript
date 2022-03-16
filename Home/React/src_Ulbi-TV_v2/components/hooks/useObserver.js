import {useEffect, useRef} from "react";

export const useObserver = (ref, canLoad, isLoading, callback) => {

    const observer =  useRef();

    useEffect(() => {

        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        const cb = function(entries, observer) {
            if (entries[0].isIntersecting && canLoad) { /* Проверка на видимость */

                callback();
            }
        };
        observer.current = new IntersectionObserver(cb); /* Создаем объект-наблюдатель */
        observer.current.observe(ref.current) /* даем наблюдателю целевой элемент для просмотра */

    }, [isLoading]);





}