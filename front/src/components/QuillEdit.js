import React, { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillEdit = ({value, onChange}) => {

	 // 이 함수는 HTML 태그를 제거하는 역할을 합니다.
	// const removeHtmlTags = (html) => {
    //     const doc = new DOMParser().parseFromString(html, 'text/html');
    //     return doc.body.textContent || "";
    // };
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
    const quillRef = useRef(null);


const module = useMemo(() => (  {   toolbar: toolbarOptions,
	clipboard: {
				matchVisual: false,
			},         
})) 


	return(
		<>
		 <ReactQuill theme="snow" 
                    value={value} 
                    modules={module} 
                    onChange={onChange}
					ref={quillRef}
                    placeholder='내용을 입력하세요.'
        />
		</>
	)
};

export default QuillEdit;