import React from 'react';
import styled from "styled-components";

const Logo = styled.h1`
  text-transform: uppercase;
`

const Title = styled.h2`
  text-transform: capitalize;
`

const SubTitle = styled.p`
  
`
const Header = () => {
    return (
        <div className="title">
            <Logo>react gallery</Logo>
            <Title>your pictures</Title>
            <SubTitle>Lorem ipsum dolor sit amet, consectetur adipiscing elit. </SubTitle>
        </div>
    );
};

export default Header;
