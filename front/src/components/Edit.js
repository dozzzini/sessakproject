import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './edit.module.css';
import BackBtn from './BackBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const Edit = () => {
    const [editvalue, setEditValue] = useState('');
    const [title, setTitle] = useState("");
    console.log(editvalue);
    const quillRef = useRef(null);
        // edit 커스텀
    const toolbarOptions = [  
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            ['link', 'image', 'video']
        ];
    const module = {
                toolbar: toolbarOptions,
        };
        const handleTitle = (e) => {
            setTitle(e.currentTarget.value);
            console.log(title);
        }
    const handleSubmit = async() => {
        const date = new Date();
        try {
            // Axios를 사용하여 서버로 데이터를 보냅니다.
            const response = await axios.post('서버_API_URL', {
                title: title,
                content: editvalue, // ReactQuill의 내용을 사용합니다.
                date: date.toISOString(), // 날짜를 ISO 형식으로 변환하여 보낼 수 있습니다.
            });

            // 서버 응답 확인
            console.log(response.data);

            // 서버로 데이터를 보낸 후에 필요한 작업을 수행할 수 있습니다.
        } catch (error) {
            console.error('서버로 데이터를 보내는 중 오류 발생:', error);
        }
    };

    return(
        <div className={styles.Edit}>
            <div className={styles.container}> 
             {/* <BackBtn /> */}
                <BackBtn className={styles.BackBtn}  />
                <div>새글 작성하기</div>
                <div className={styles.titleBox}>
                    <label className={styles.titleTag} htmlFor='title'>제목</label>
                    <input className={styles.inputTitle} id='title' type='text'value={title} onChange={handleTitle}  />
                </div>
               <div className={styles.editBox}>
                    <ReactQuill theme="snow" 
                    value={editvalue} 
                    modules={module} 
                    onChange={setEditValue}
                    className={styles.editTool} /> 
                    <button 
                    className={styles.submitBtn} 
                    onClick={handleSubmit}>
                       <FontAwesomeIcon icon={faUpload} size='xl'/>
                    </button>
               </div>
            </div>
        </div>
    )
};

export default Edit;