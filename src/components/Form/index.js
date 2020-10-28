import React, {useState} from 'react';
import styled from "styled-components";
import ProgressBar from "./ProgressBar";
import Config from "../../config";
import axios from 'axios'
import {connect} from "react-redux";
import {UPLOAD_IMAGE} from "../../redux/action";

const Container = styled.div`
  form {
    display: flex;
    justify-content: center;
  }
`

const AddIcon = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 1px solid #efb6b2;
  color: #efb6b2;
  opacity: 0.75;
  cursor: pointer;
  position: relative;
  
  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: -1;
  }
  
  &::after {
    content: '+';
    font-size: 2.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -52%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Form = ({dispatch}) => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState('');

    const upload = file => {
        const fd = new FormData();
        fd.append("file", file);

        axios.post(Config.uploadUrl, fd, {
            onUploadProgress: progressEvent => {
                let uploadPercentage = Math.round(progressEvent.loaded / progressEvent.total) * 100;
                setProgress(uploadPercentage);
            }
        })
            .then(res => res.data)
            .then(res => {
                const {success, message, data} = res;
                if (success) {
                    console.log(message);
                    setFile(null);
                    dispatch({type: UPLOAD_IMAGE, payload: data});
                }
            })
            .catch(err => {
                console.log(err);
                setError(err);
            });
    }

    const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/bmp'];

    const changeHandler = event => {
        const selected = event.target.files[0];
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError(null);
            // 上传图片
            upload(selected);
        } else {
            alert(selected.type);
            setFile(null);
            setError('Please select an image file (png jpg/jpeg or gif)');
        }
    }

    return (
        <Container>
            {file && <ProgressBar width={progress}/>}
            <form action="#">
                {
                    !file &&
                    <AddIcon>
                        <input type="file" onChange={changeHandler}/>
                    </AddIcon>
                }
            </form>
        </Container>
    );
};
const mapStateToProps = () => {
    return {};
}
export default connect(mapStateToProps)(Form);
