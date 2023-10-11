import React, {  useState } from 'react';
import styles from './edit.module.css';
import BackBtn from './BackBtn';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import QuillEdit from './QuillEdit';
import api from '../RefreshToken';


const Edit = () => {
    const [editvalue, setEditValue] = useState('');
    const [title, setTitle] = useState("");
    // console.log(editvalue);

    const removeHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };
    //edit 속 컨텐츠 저장하는 state
    // const quillRef = useRef(null);

    // 이 함수는 HTML 태그를 제거하는 역할을 합니다.

    // const handleEditChange = (editvalue) => {
    //     const cleanedValue = removeHtmlTags(editvalue);
    //     setEditValue(cleanedValue);
    //   };
    
        // edit 커스텀
    // const toolbarOptions = [  
    //         [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    //         [{ 'font': [] }],
    //         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    //         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    //         [{ 'align': [] }],
    //         [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    //         ['link', 'image', 'video']
    //     ];
    
    
        // const module = useMemo(() => (  {   toolbar: toolbarOptions,
        //     clipboard: {
        //                 matchVisual: false,
        //             },         
        // })) 

    

    const handleTitle = (e) => {
        setTitle(e.target.value);
        // console.log(e.target.title);
    };
    const navigate = useNavigate();

    const handleSubmit = async() => {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리 숫자로 포맷팅합니다.
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        // const seconds = date.getSeconds().toString().padStart(2, '0');

        const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;
        // console.log(formattedDate);

        try {
            const response = await api.post('posts/newpost/', {
                title: title,
                content: removeHtmlTags(editvalue), // ReactQuill의 내용을 사용합니다.
                // date: date // 날짜를 ISO 형식으로 변환하여 보낼 수 있습니다.
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access_token')}`       
                },
                'withCredentials': true,

            });

            // 서버 응답 확인
            // console.log(response.data);
            navigate(`/posts/${response.data.id}`);


            // 서버로 데이터를 보낸 후에 필요한 작업을 수행할 수 있습니다.
        } catch (error) {
            // console.error('서버로 데이터를 보내는 중 오류 발생:', error);
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
                    {/* <ReactQuill theme="snow" 
                        value={editvalue} 
                        modules={module} 
                        ref={quillRef}
                        onChange={setEditValue}
                        className={styles.editTool}
                        placeholder='내용을 입력하세요.'
                    /> */}
                    <QuillEdit
                         value={editvalue}
                        //  ref={quillRef}
                         onChange={setEditValue}
                         className={styles.editTool}

                         />
                         {/* <div>카테고리</div> */}
                </div>
                <form>카테고리
                    <input type='radio' name='sooda' value='snack'  />tmsor
                    <input type='radio' name='goodE' value=''  />
                    <input type='radio' name='' value=''  />
                    <input type='radio' name='' value=''  />
                </form>
                <div className={styles.btnBox}>
                    <button type='submit'
                    className={styles.submitBtn} 
                    onClick={handleSubmit}>
                        <span>저장하기</span>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Edit;