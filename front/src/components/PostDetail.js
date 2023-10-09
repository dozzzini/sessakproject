import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import styles from './postdetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import Comments from './Comments';
import BackBtn from './BackBtn';
import api from '../RefreshToken';

import QuillEdit from './QuillEdit';

const PostDetail = () => {
	const {id} = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [post, setPost] =useState({});
	const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);
	const [editingPost, setEditingPost] = useState(null);
	const [editFixPost, setEditFixPost] = useState({title: '',
	content:''});
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	// HTML 태그를 제거하는 역할을 합니다.
    const removeHtmlTags = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

	// 게시글가져오기
	const getPosts = async () => {
		try{
			const res = await api.get(`posts/${id}/`,
			);
			setPost(res.data);
			setLoading(false);
			console.log('서버로부터 데이터 가져오기 성공',res.data);
			
		}catch(error){
			console.log(error, '게시글 가져오기 실패');
			setLoading(false);
			console.log(post.title, '1');
		}
	};

	useEffect(() => {
		getPosts();
	}, [id]);
	
	//게시글 수정클릭시
	 const postPreModify = (id, title, content) => {
		setEditingPost(id);
		setEditFixPost({
			title: title,
			content: content,
		  });		
		  setIsEdit(true);

	 };

	 //게시글 수정 취소
	const postCancel = () => {
		setEditingPost(null);
		setEditFixPost({title:title, content: content});
		setIsEdit(false);

	}
	// 게시글 수정완료보내기
	const postModifyFinish= async() => {
		try{
			const updatedPost = {
				title:  editFixPost.title , //변경된 제목
				content: removeHtmlTags(editFixPost.content) 	//변경된 내용
			};
			const res = await api.put(`
			posts/${id}/`, updatedPost, 
			);
			setPost(res.data.data);
			setLoading(false);
			setIsEdit(false);
			console.log('게시글 수정 성공');
			console.log('태그제거',removeHtmlTags(editFixPost.content) )
		}catch(error){
			console.log(error, '게시글 수정에 오류가 있어요.')
			alert('유저정보가 일치하지 않아 수정할 수 없습니다.')

		}
	}
	// 게시글 삭제
	const postDelete = async() => {
		try{
			const res = await axios.delete(`https://port-0-sessak-back2-cgw1f2almhig6l2.sel5.cloudtype.app/api/v1/posts/${id}/`,
			{
				headers: {'Authorization': `Bearer ${Cookies.get('access_token')}`}
			});
			setPost(res.data);
			setLoading(false); 
			console.log(res)
			alert('게시글이 삭제되었습니다.')
			navigate('/hi') ;
		}catch(error){
			console.log(error, '게시글 삭제 실패' )
			alert('유저정보가 일치하지 않아 삭제할 수 없습니다.')
		}
	};
	return(
		<div className={styles.container}>
			<Header   />
			<div className={styles.wrapper}>
				{loading ? (
					<h2>loading~~</h2>
				) : (
					<div className={styles.postBox}>
						<div className={styles.BtnBox}>
							{isEdit ? 
							<> 
								<button onClick={postModifyFinish}>
								<FontAwesomeIcon icon={faCircleCheck }/>
								</button>
								<button onClick={postCancel}><FontAwesomeIcon icon={faXmark}/></button>
							</>
							:
							<>
								<button onClick={() => postPreModify(post.id, post.title, post.content )}><FontAwesomeIcon icon={faEraser} />
								</button>
								<button onClick={postDelete}><FontAwesomeIcon icon={faTrashCan} /></button>
							</>
							}
							
						</div>
						{post.title ? (
						<div className={styles.mainContents}>
							<div className={styles.userPost}>
								<div className={styles.back}>
									<BackBtn	/>
								</div>
							<div className={styles.TitleId}>
								{isEdit ? (
								<>
								<input
									type="text"
									placeholder="제목"
									defaultValue={post.title}
									onChange={(e) => setEditFixPost({ ...editFixPost, title: e.target.value })}
								/>
								</>
								) : (
								<p> 제목 : {post.title}</p>
								)}
								<span>닉네임 : {post.author.nickname} </span>
							</div>
							{isEdit ? (
							<div className={styles.quilllBox}>
							<QuillEdit
								placeholder="내용"
								value={editFixPost.content || ''}
								onChange={(newContent) => setEditFixPost({ ...editFixPost, content: newContent })}
							/>
							</div>
							) : (
							<>
							<div className={styles.showContent}>
								{/* {removeHtmlTags(editFixPost.content) } */}
								<p>{post.content}</p>
								</div>
							<div className={styles.comments}>
								<p>댓글</p>
								<Comments comments={post?.post_comments} key={post?.post_comments}	/>
							</div>
							</>
							)
							}
							</div>
						</div>
							) : (
								<h2>No content available</h2>
						)
						}
					</div>
				)}
			</div>
		</div>
	)
};

export default PostDetail;