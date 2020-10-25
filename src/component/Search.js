import React from 'react'

function Search({placeHolder, onChangeHandler}){
    return(
        <input
            className='search'
            placeholder={placeHolder}
            onChange={onChangeHandler}
        />
    );
}

export default Search;