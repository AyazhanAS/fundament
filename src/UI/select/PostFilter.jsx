import React from 'react'
import MyInput from '../inputs/MyInput'
import MySelect from './MySelect'

export default function PostFilter({filter, setFilter}) {
    return (
        <div>
               <MyInput
             placeholder="search..."
             value={filter.query}
             onChange={e=>setFilter({...filter, query:e.target.value})}
             />
            <MySelect 
            value={filter.sort}
            onChange={selectedSort=>setFilter({...filter, sort:selectedSort})}
            defaultValue="Сортировка"
            options={[
                {value:"title", name:"по названию"},
                {value:"body", name:"по описанию"}
            ]}
            />
            
        </div>
    )
}
