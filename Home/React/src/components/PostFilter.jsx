import React from 'react';
import MyInput from "./UI/input/MyInput";
import NewSelect from "./UI/select/NewSelect";

const PostFilter = ({filter, setFilter}) => {
    return (

        <div>
            <MyInput
                value={filter.search}
                // onChange={(e) => setInputSearch(e.target.value)}
                onChange={(e) => setFilter({...filter, search: e.target.value})}
                placeholder={'Поиск...'} />

            <NewSelect
                value={filter.sort}
                // changeSelect={sortPosts}
                changeSelect={(select) => setFilter({...filter, sort: select})}
                options={[
                    {value: "title", name: "По названию"},
                    {value: "body", name: "По описанию"}
                ]}
                defaultValue={"Сортировка:"} />
        </div>
    );
};

export default PostFilter;