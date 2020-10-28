import React from 'react';
import styled from "styled-components";
import {connect} from "react-redux";
import {CHANGE_SELECTED} from "../../redux/action";
import {motion} from "framer-motion";


const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  
  img {
    max-width: 50%;
    max-height: 70%;
    border: 2px solid #fff;
    box-shadow: 0 0 9px rgba(239,182,178,0.9);
  }
`

const Model = ({selected, dispatch}) => {
    const handleClick = e => {
        if (e.target.classList.contains('backdrop')) {
            dispatch({type: CHANGE_SELECTED, payload: null});
        }
    }

    return (
        <Container className="backdrop" onClick={handleClick}>
            <motion.img src={selected.url} alt="selected"
                        initial={{y: '-100%'}}
                        animate={{y: 0}}
            />
        </Container>
    );
};

const mapStateToProps = (state) => {
    const {selected} = state;
    return {selected};
}
export default connect(mapStateToProps)(Model);