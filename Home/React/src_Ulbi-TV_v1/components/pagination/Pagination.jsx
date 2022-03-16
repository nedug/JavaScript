import React from 'react';
import MyButton from "../UI/button/MyButton";
import {getPagesArray} from "../../utils/pages";

const Pagination = ({totalPages, page, changePage}) => {

    const pagesArray = getPagesArray(totalPages); /* Массив страниц */

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>

            {pagesArray.map((pageP) =>
                <MyButton
                    key={pageP}
                    className={pageP === page ? 'MyBtn__active' : ''}
                    onClick={() => changePage(pageP)}
                >
                    {pageP}
                </MyButton>
            )}
        </div>
    );
};

export default Pagination;