import { Link } from "react-router-dom"
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './tweetsheader.scss';
import { useState } from "react";

export const TweetsHeader = ({filter, onFilter}) => {
    const [showMode, setShowMode] = useState('')
    const handleChange = (e) => {
        setShowMode(e.target.value);
        onFilter(e.target.value);
    }
    return(
    <div className="tweetsheader">
        <h2>Tweets</h2>
        <FormControl  sx={{ m: 1, minWidth: 130 }} size="small">
        <Select
          id="demo-simple-select-standard"
          value={showMode}
          onChange={handleChange}
        >
            <MenuItem value=""><em>None</em></MenuItem>
            {filter.map(f => (
                <MenuItem value={f} key={f}>{f}</MenuItem>
            ))}
        </Select>
      </FormControl>
        <Link to='/' className="mainBtn">Back</Link>
    </div>
    )
}