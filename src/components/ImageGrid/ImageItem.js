import React from 'react';
import styled from "styled-components";
import {connect} from 'react-redux'
import {CHANGE_SELECTED, REMOVE_IMAGE} from "../../redux/action";
import {motion} from "framer-motion";
import {FaTrash} from "react-icons/all";
import axios from 'axios';
import Config from "../../config";

const Container = styled(motion.div)`
  overflow: hidden;
  height: 0;
  padding-bottom: 100%;
  position: relative;
  
  &::after {
     content: '${props => props.name}';
     position: absolute;
     left: 0;
     top: 0;
     width: 100%;
     height: 100%;
     background: rgba(0,0,0,0.5);
     display: flex;
     justify-content: center;
     align-items: center;
     color: white;
     opacity: 0;
     transition: all 0.2s ease-in-out;
  }
  
  &:hover img{
    transform: scale(1.5);
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.5s ease-in-out;
    cursor: pointer;
    opacity: 0.9;
  }
`

const RemoveBtn = styled(motion.div)`
  width: 2.5rem;
  height: 2rem;
  background: #efb6b2;
  position: absolute;
  top: 0;
  right: -100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  border-bottom-left-radius: 30%;
  transition: all 0.3s ease-in;
  
  &:hover, ${Container}:hover & {
    right: 0;
    z-index: 1;
  }
`

const ImageItem = ({image, dispatch}) => {

    const selectedHandler = e => {
        if (e.target.classList.contains('imgItem')) {
            dispatch({type: CHANGE_SELECTED, payload: image});
        }
    }

    const removeHandler = id => {
        removeImg(id).then(res => {
            console.log(res)
            dispatch({type: REMOVE_IMAGE, payload: id});
        });
    }

    const removeImg = async (id) => {
        try {
            // fetch data from a url endpoint
            const res = await axios.delete(`${Config.removeUrl}/${id}`);
            const {data} = res;
            return data;
        } catch (error) {
            alert(error); // catches both errors
        }
    }

    return (
        <Container className="imgItem" name={image.name.length > 20? image.name.substr(0, 20): image.name} onClick={selectedHandler} layout>
            <img src={image.url} alt="gallery item"/>
            <RemoveBtn onClick={() => removeHandler(image.id)}><FaTrash/></RemoveBtn>
        </Container>
    );
};

const mapStateToProps = () => {
    return {};
}
export default connect(mapStateToProps)(ImageItem);
