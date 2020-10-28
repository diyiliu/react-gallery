import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  width: ${props => props.width + '%'};
  height: 5px;
  background-color: #efb6b2;
  transition: all 0.5s ease-in-out;
`

const ProgressBar = ({width = 0}) => {
    return (
        <Container width={width}>

        </Container>
    );
};

export default ProgressBar;
