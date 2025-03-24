import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import '../../App.css';

function ConfirmBox(props) {
    const [checkbox, setCheckbox] = useState(props.checkbox);
    const handleChange = (event) => {
        setCheckbox(event.target.checked);
        props.onCheckboxChange(event.target.checked);
    }
    return ( 
        <div className='d-flex flex-row justify-content-center'>
            <Checkbox style={{color: 'red'}} checked={checkbox} onChange={handleChange}></Checkbox>
            <p className='question_unit'>I confirm that the data already exists and I would like to modify the previously submitted data.</p>
        </div>
     );
}

export default ConfirmBox;