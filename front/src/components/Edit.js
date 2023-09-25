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
    // 이 함수는 HTML 태그를 제거하는 역할을 합니다.
    const removeHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    const handleEditChange = (value) => {
        const cleanedValue = removeHtmlTags(value);
        setEditValue(cleanedValue);
      };
    
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
                clipboard: {
                    matchVisual: false,
                },
        };
    const handleTitle = (e) => {
        setTitle(e.target.value);
        console.log(e.target.title);
    };
    
    const handleSubmit = async() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리 숫자로 포맷팅합니다.
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
        console.log(formattedDate);

        try {
            const response = await axios.post('https://port-0-sessak-back2-cgw1f2almhig6l2.sel5.cloudtype.app/api/v1/posts/newpost/', {
                title: title,
                content: editvalue, // ReactQuill의 내용을 사용합니다.
                // date: date // 날짜를 ISO 형식으로 변환하여 보낼 수 있습니다.
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'withCredentials': true,

                }
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
                <div className={styles.backBtn}>
                    <div className=
                    {styles.bak}>
                    <BackBtn  />
                    </div>
                    <div className={styles.hdTitle}>새글 작성하기</div>
                </div>
                    <div className={styles.titleBox}>
                        <label className={styles.titleTag} htmlFor='title'>제목</label>
                        <input className={styles.inputTitle} 
                        id='title' 
                        type='text'
                        value={title} 
                        onChange={handleTitle} 
                        placeholder='제목을 입력하세요.' />
                    </div>
               <div className={styles.editBox}>
                    <ReactQuill theme="snow" 
                    value={editvalue} 
                    modules={module} 
                    onChange={handleEditChange}

                    className={styles.editTool}
                    placeholder='내용을 입력하세요.' />
                </div>
                <div className={styles.btnBox}>
                    <button 
                    className={styles.submitBtn} 
                    onClick={handleSubmit}>
                        <span>저장하기</span>
                       {/* <FontAwesomeIcon icon={faUpload} size='2xl'/> */}
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Edit;