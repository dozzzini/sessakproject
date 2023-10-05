import React, { useEffect, useState } from 'react';
import styles from './comments.module.css';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import api from '../RefreshToken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEraser, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';


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
	
// 댓글삭제
	const commentTrash = async(commentId) => {
		try{
			const res = await api.delete(`comments/${commentId}>/`,
			{
				headers: {'Authorization': `Bearer ${Cookies.get('access_token')}`}
			});
			setComment(res.data);
			// setLoading(false); 
			console.log(res)
			alert('게시글이 삭제되었습니다.')
			// navigate('/hi') ;
		}catch(error){
			console.log(error, '게시글 삭제 실패' )
		}
	}
	

	return(
		<div className={styles.container}>
			<div className={styles.commentsBox}>
					<input type='text' value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder='댓글을 입력해주세요.' />
					<button onClick={addComment} >
					<FontAwesomeIcon icon= {faSquarePlus} size='2xl' />
					</button>
				</div>
			<div className={styles.wrapper}>
				<div className={styles.commentList}>
					{commentList?.map((comment, index) => (
					<div className={styles.commentItem} key={index}>
						<p className={styles.item} >
							{comment}
						</p>
						<p>{}</p>
						<button><FontAwesomeIcon icon={faEraser} size='xs'/></button>
						<button onClick={commentTrash}><FontAwesomeIcon icon={faTrashCan} size='xs' /></button>
					</div>
					))}
				</div>
				
			</div>
		</div>
	)
};

export default Comments;