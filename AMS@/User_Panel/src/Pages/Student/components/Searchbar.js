import React, { useState } from 'react';

const Searchbar = (props) => {
    const [term,setTerm] = useState("")

   const handleChange = (event) => {
        setTerm({
            term: event.target.value
        });

    };
   const handleSubmit = (event) => {
        event.preventDefault();
        props.handleFormSubmit(term);
    }

    return (
        <>
            <h2 style={{ textAlign: "center" }}><img style={{ width: '200px', height: '100px', justifyContent: 'center' }} src='https://www.thatitguy.net/wp-content/uploads/2018/08/1280px-Logo_of_YouTube_2015-2017.svg.png' alt="youtube logo"></img></h2>
            <div className='search-bar ui segment'>
                <form onSubmit={handleSubmit} className='ui form'>
                    <div className='field'>
                        <label htmlFor="video-search">Video Search</label>
                        <input onChange={handleChange} name='video-search' type="text" placeholder="Search.." />
                    </div>
                </form>
            </div>
        </>
    )
}
export default Searchbar;