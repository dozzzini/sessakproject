import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';
import styles from './postdetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser, faL, faTrashCan } from '@fortawesome/free-solid-svg-icons';



const PostDetail = () => {
	const {id} = useParams();
	// const params = useParams();
	// console.log(params, '1231')
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [post, setPost] =useState({});
	const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);

	const getPosts = async () => {
		try{
			const res = await axios.get(`https://port-0-sessak-back2-cgw1f2almhig6l2.sel5.cloudtype.app/api/v1/posts/${id}`,
			{headers: {'Authorization': `Bearer ${Cookies.get('access_token')}`}});
			setPost(res.data);
			setLoading(false);
			console.log('서버로부터 데이터 가져오기 성공');
			
		}catch(error){
			console.log(error, '게시글 가져오기 실패');
			setLoading(false);
			console.log(post.title, '1');
		}
	};

	useEffect(() => {
		getPosts();
	}, [id]);


	const postModifyFinish= async() => {
		try{
			const updatedPost = {
				title:  "",
				content: "",
			};
			const res = await axios.put(`
			https://port-0-sessak-back2-cgw1f2almhig6l2.sel5.cloudtype.app/api/v1/posts/${id}/`, updatedPost, 
			{
				headers: {'Authorization' : `Bearer ${Cookies.get('access_token')}`}
			});
			setPost(res.data);
			setLoading(false);
			console.log('게시글 수정 성공');
		}catch(error){
			console.log(error, '게시글 수정에 오류가 있어요.')
		}
	}
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
		}
	};
	 const postPreModify = () => {
		navigate(`/post/update/${id}`)
	 }
	const postCancel = () => {

	}
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
								<button onClick={postModifyFinish}><FontAwesomeIcon icon={faEraser} />
								</button>
								<button onClick={postCancel}>취소</button>
							</>
							:
							<>
								<button onClick={postPreModify}><FontAwesomeIcon icon={faEraser} />
								</button>
								<button onClick={postDelete}><FontAwesomeIcon icon={faTrashCan} /></button>
							</>
							}
							
						</div>
						{post.title ? (
							<>
							<div className={styles.userPost}>
								<div className={styles.TitleId}>
									<p>제목 : {post.title}</p>
									<span>id : {post.id} </span>
								</div>
								<p>{post.content}</p>
							</div>
							
							</>
						) : (
							<h2>No content available</h2>
						)}
					</div>
				)}
				
				
			</div>
		</div>
	)
};

export default PostDetail;