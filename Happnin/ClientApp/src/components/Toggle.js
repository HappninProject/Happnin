import React from 'react';
import { func, string } from 'prop-types';
import ToggleContainer from './Toggle.styled';

//using hook to toggle between moon and sun images
const Toggle = ({theme, toggleTheme}) => {
    let isLight = theme === 'light';
    return(
        <ToggleContainer onClick={toggleTheme}>
            <p style={{'text-align': 'center',
margin: 'auto', color: 'green'}}>
Light/Dark Mode</p> 
        </ToggleContainer>
    );
};


Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;

