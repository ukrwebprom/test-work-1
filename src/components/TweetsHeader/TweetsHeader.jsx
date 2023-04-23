import { Link } from "react-router-dom"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './tweetsheader.scss';
import { useState } from "react";

export const TweetsHeader = ({onFilter}) => {
    const [showMode, setShowMode] = useState('Show All')

    const handleChange = (e) => {
        setShowMode(e.target.value);
        onFilter(e.target.value);
    }
    
    return(
    <div className="tweetsheader">
        <Link to='/' className="linkBtn">Back</Link>
        <FormControl  sx={{ m: 1, width:150, minWidth: 100 }} size="small">
        <Select
          id="demo-simple-select-standard"
          value={showMode}
          onChange={handleChange}
        >
            <MenuItem value="Show All">Show All</MenuItem>
            <MenuItem value="Follow">Follow</MenuItem>
            <MenuItem value="Followings">Followings</MenuItem>
{/*             {filter.map(f => (
                <MenuItem value={f} key={f}>{f}</MenuItem>
            ))} */}
        </Select>
      </FormControl> 
    </div>
    )
}