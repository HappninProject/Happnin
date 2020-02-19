import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';

const Wrapper = styled.div`
    width: 100%;
    padding; 32px;
`;

const Page = styled.div`
    width: 100%;
`;
export class slideShow extends React.Component {
    render () {
        return (
                    <Slider
                    speed = {500}
                    slidesToShow={1}
                    sidesToScroll={3}
                    infinate={false}
                    >
                    <Page class = 'header'>page 1</Page>  
                    <Page>page 2</Page> 
                    <Page>page 3</Page>   

                    </Slider>
        );

    }

}