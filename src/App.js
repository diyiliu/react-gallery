import React from 'react';
import './App.css';
import Header from "./components/Header";
import Form from "./components/Form";
import ImageGrid from "./components/ImageGrid";

import {connect} from "react-redux";
import LoadingBar from "./components/LoadingBar";
import Model from "./components/Model";

function App({imgList, page, totalPage, selected}) {

    return (
        <div className="container">
            <Header/>
            <Form/>
            <ImageGrid imgList={imgList}/>
            {
                page < totalPage &&
                <LoadingBar />
            }
            {
                selected && <Model />
            }
        </div>
    );
}

const mapStateToProps = state => {
    const {imgList, page, totalPage, selected} = state;
    return {imgList, page, totalPage, selected};
}
export default connect(mapStateToProps)(App);
