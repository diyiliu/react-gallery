import React from 'react';
import styled from "styled-components";
import ImageItem from "./ImageItem";

const Container = styled.div`
  margin: 20px auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 40px;
`

const ImageGrid = ({imgList = []}) => {
    return (
        <Container>
            {imgList.length > 0 && imgList.map(img => {
              return  <ImageItem key={img.id} image={img} />
            })}
        </Container>
    );
};

export default ImageGrid;
