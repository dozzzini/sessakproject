import React, { useEffect, useState } from 'react';
import styles from './comments.module.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import api from '../RefreshToken';

const Comments = () => {
	const [comment, setComment] = useState('');
	const [commentList, setCommentList] = useState([]); 
	const {id} = useParams();

	//댓글 가져오기
	const callComment = async () =>{
		try{
			const response = await api.get(
				`posts/${id}/`,
				{headers: {
					Authorization: `Bearer ${Cookies.get('access_token')}`,
					'Content-Type': 'application/json',
				  },
				  withCredentials: true,
				},
				
			);
			if (response.data.post_comments) {
				const comments = response.data.post_comments.map((postComment) => postComment.comment);
				setCommentList(comments);
			  } else {
				setCommentList([]);
			  }

		}catch(error){
			console.error('댓글을 불러오는 데 실패했습니다:', error);

		}
	};

	useEffect(()=>{
			callComment()
		}, [id])

	//댓글 보내기
	const addComment = async() => {
		if (comment.trim() !== '') {
		const newComment = comment;
		setComment(''); 
		setCommentList([...commentList, newComment])
		}
		console.log('add')
		try{
			const response = await api.post('comments/newcomment/',
		{comment : comment,
		post_id: id
		},
		{headers: {
			  Authorization: `Bearer ${Cookies.get('access_token')}`,
			  'Content-Type': 'application/json',
			},
			withCredentials: true,
		  },
		);
		setCommentList([...commentList, response.data.comment]);
		setComment('');
		}catch(error){
			alert('댓글을 입력해주세요!')
		}	
	};

	

	return(
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.commentList}>
				{commentList?.map((comment, index) => (
				<div key={index}>{comment}</div>
				))}
				</div>
				<div className={styles.commentsBox}>
					<input type='text' value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder='댓글을 입력해주세요.' />
					<button onClick={addComment} >추가</button>
				</div>
			</div>
		</div>
	)
};

export default Comments;