import React, {useEffect} from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';
import axios from "axios";
import Config from "../../config";
import {LOADING_IMAGE} from "../../redux/action";

const Container = styled.div`
  margin: 50px 0;
  display: flex;
  justify-content: center;
  overflow: hidden;
`

const LoadBtn = styled.div`
  cursor: pointer;
  color: white;
  font-size: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  line-height: 2rem;
  width: 30%;
  height: 2rem;
  background-color: #efb6b2;
  border-radius: 0.2rem;
  opacity: 0.65;
  transition: all 0.25s ease-in-out;
  position: relative;
  
  &:hover {
    opacity: 1;
  }
  
  ::before, ::after  {
    content: '';
    position: absolute;
    top: 50%;
    width: 200%;
    border: 1px dashed #efb6b2;
  }
  
  ::before{
    right: 100%;
    margin-right: 0.5rem;
  }
  
  ::after  {
    left: 100%;
    margin-left: 0.5rem;
  }
`

const LoadingBar = ({page, size, dispatch}) => {

    useEffect(() => {
        load();
    }, [])

    const load = () => {
        axios.get(`${Config.listUrl}?page=${page + 1}&size=${size}`)
            .then(res => res.data)
            .then(res => {
                const {success} = res;
                if (success) {
                    const {data, page, totalPage} = res.data;
                    const payload = {imgList: data, page, totalPage}
                    dispatch({type: LOADING_IMAGE, payload});
                }
            })
    }

    return (
        <Container>
            <LoadBtn onClick={load}>load more</LoadBtn>
        </Container>
    );
};

const mapStateToProps = state => {
    const {page, size} = state;
    return {page, size};
}
export default connect(mapStateToProps)(LoadingBar);
