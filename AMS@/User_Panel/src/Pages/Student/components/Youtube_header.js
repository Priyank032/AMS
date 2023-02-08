import React,{useState} from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import tags from '../../../Data';

const Youtube_header = (props) => {
    const [term,setTerm] = useState("")

   const handleChange = (event) => {
        setTerm({
            term: event.target.value
        });

    };
    const data = tags.Class5.tag;
    console.log(data);
   const handleSubmit = (event) => {
        event.preventDefault();
        props.handleFormSubmit(term);
    }

    const handleChange3 = (e) => {
        // event.preventDefault()
        console.log(e.target.value)
        // setValue(event.target.value);
        setTerm({
            term: e.target.value
        });
        props.handleFormSubmit(e.target.value);

        
      };
    const [value, setValue] = React.useState(0);

    const handleChange2 = (event, newValue) => {
    console.log(event.target.value);
        //   setValue(newValue);
    };
    // console.log(value);
    return (
        <div>
            <div className='container border-bottom border-dark pb-2'>
                
                    <div className='row'>
                        <div className='col-md-7 d-none d-md-block'>
                            <h2 className=''>YouTube Videos Recommendation</h2>
                        </div>
                        <div className='col-md-5 col-sm-12'>
                            <form  onSubmit={handleSubmit} class="form-inline ">
                                <input class="py-2 pl-3 border-0 rounded-left shadow-sm" onChange={handleChange}  name='video-search' type="text" placeholder="Search.."></input>
                                <button class="Student_search_button rounded-right shadow-sm" type="submit"><AiOutlineSearch className='Student_Search_button_icon' /></button>
                            </form>
                        </div>
                    </div>
                </div>

                <Box sx={{ maxWidth: 900, bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange2}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
           <div>
            {data.map((tag)=>{
                return <button className='btn btn-primary mx-2' value={tag} onClick={(e)=>handleChange3(e)}  >{tag}</button>
            })}
        </div>
      </Tabs>
    </Box>

       

            </div>

    )
}

export default Youtube_header
