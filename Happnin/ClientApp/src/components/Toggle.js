import React from 'react';
import { func, string } from 'prop-types';
// the icons for the dark/light mode toggler (have to make sure they're imported as React Components so we can change styling)
import {ReactComponent as Moon} from '../images/moon.svg';
import {ReactComponent as Sun} from '../images/sun.svg';
import ToggleContainer from './Toggle.styled';

//using hook to toggle between moon and sun images
const Toggle = ({theme, toggleTheme}) => {
    let isLight = theme === 'light';
    return(
        <ToggleContainer onClick={toggleTheme}>
            <Sun/>
            <Moon/>
        </ToggleContainer>
    );
};


Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}

export default Toggle;

