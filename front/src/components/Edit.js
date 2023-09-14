import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './edit.module.css';
import BackBtn from './BackBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
const Edit = () => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    const quillRef = useRef();
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
        }
    const handleSubmit = async() => {
        const date = new Date();
        try{
            // await createPost({
            //     title:title,
            //     content,
            //     date,
            // }).then((res) => console.log(res));
        }catch (error){
            console.log(error);
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
                    <input className={styles.inputTitle} id='title' type='text' onChange={handleTitle}  />
                </div>
               <div className={styles.editBox}>
                    <ReactQuill theme="snow" value={value} modules={module} onChange={setValue}
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