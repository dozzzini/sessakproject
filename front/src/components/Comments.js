import React, { useEffect, useState } from 'react';
import styles from './comments.module.css';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import api from '../RefreshToken';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEraser, faTrashCan, faX} from '@fortawesome/free-solid-svg-icons';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';


const Comments = ({comments}) => {
	const [comment, setComment] = useState('');
	const [commentList, setCommentList] = useState([]); 
	const [editingComment, setEditingComment] = useState(null); // 수정 중인 댓글  상태 변수
	const [editedFixComment, setEditedFixComment] = useState(''); // 수정 중인 댓글 텍스트를 저장할 상태 변수
	const {id} = useParams();




	//댓글 가져오기
	// const callComment = async () =>{
	// 	try{
	// 		const response = await api.get(
	// 			`posts/${id}/`,
	// 			{headers: {
	// 				Authorization: `Bearer ${Cookies.get('access_token')}`,
	// 				'Content-Type': 'application/json',
	// 			},
	// 				withCredentials: true,
	// 			},
				
	// 		);
			// if (response.data.post_comments) {
			// 	const comments= response.data.post_comments.map((postComment) => postComment);
			// 	setCommentList(comments);
			// 	console.log('1', comments);
			// } else {
			// 	setCommentList([]);
			// }
	// 	}catch(error){
	// 		console.error('댓글을 불러오는 데 실패했습니다:', error);
	// 	}
	// };

	useEffect(()=>{
			// callComment()
			setCommentList(comments);
			
		}, [id,comments]);

	//댓글 보내기
	const addComment = async(comment) => {
		if (comment.trim() !== '') {
		const newComment = comment;
		
		console.log('add')
		try{
			// await addCommentMutation.mutateAsync(newComment);
			const response = await api.post('comments/newcomment/',
			{
				comment : comment,
				post_id: id
			},
			{
				headers: {
				Authorization: `Bearer ${Cookies.get('access_token')}`,
				'Content-Type': 'application/json',
				},
			withCredentials: true,
			},
		);
		setCommentList((prev)=>[...prev, response.data]);
		setComment('');
		}catch(error){
			alert('댓글을 입력해주세요!')
		}	
	}
	};
	
 // 수정할 댓글을 선택하고 수정 입력 필드를 표시하는 함수
 const startEditingComment = (commentId, currentComment) => {
    setEditingComment(commentId);
    setEditedFixComment(currentComment);
  };
   // 수정을 취소하고 이전 상태로 돌아가는 함수
   const cancelEditingComment = () => {
    setEditingComment(null);
    setEditedFixComment('');
  };

// 댓글 수정
	const commentModify = async(id, editedFixComment) => {
		try{
			const response = await api.put(`comments/${id}/`, {
				comment : editedFixComment
			},
			{headers: {'Authorization' : `Bearer ${Cookies.get('access_token')}`}
			});
			// setComment(res.data);
			// alert('댓글이 수정되었습니다.')
			// 수정된 댓글로 댓글 목록 업데이트
			const updatedComments = commentList.map((comment) => {
				if (comment.id === id) {
				return {
					...comment,
					comment: editedFixComment,
				};
				}
				return comment;
			});
		
			setCommentList(updatedComments);
			setEditingComment(null); // 편집 상태 초기화
			// setEditedFixComment(updatedComments); 
		}catch(error){
			console.log(error, '댓글 수정 실패')
			alert('유저정보가 일치하지 않아 수정할 수 없습니다.')

		}
	}

// 댓글삭제
	const commentTrash = async(id) => {
		console.log(id,'dd')
		try{
			const response = await api.delete(`comments/${id}/`,
			{
				headers: {'Authorization': `Bearer ${Cookies.get('access_token')}`}
			}, {
				withCredentials: true
			},
			);
			setComment(response.data);
			alert('댓글이 삭제되었습니다.')

			setCommentList((prev) => prev.filter((item)=> item.id !== id));

			console.log(response,'ㄴㅁㅇ')
		}catch(error){
			console.log(error, '댓글 삭제 실패' )
			alert('유저정보가 일치하지 않아 삭제할 수 없습니다.')

		}
	};
	
console.log(commentList,'commentlist')
	return(
		<div className={styles.container}>
			<div className={styles.commentsBox}>
					<input type='text' value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder='댓글을 입력해주세요.' />
					<button onClick={() => addComment(comment)} >
					<FontAwesomeIcon icon= {faSquarePlus} size='2xl' />
					</button>
				</div>
			<div className={styles.wrapper}>
				<div className={styles.commentList}>
					{commentList?.map((item, index) => (
					<div className={styles.commentItem} key={index}>
						{/* 유저 아이디 */}
						<p className={styles.itemId}> {item.author?.nickname} </p>
						{editingComment === item.id ? (
							<>
							<input
							className={styles.item}
								type="text"
								value={editedFixComment}
								onChange={(e) => setEditedFixComment(e.target.value)}
							/>
							<button onClick={() => commentModify(item.id, editedFixComment)}>
								<FontAwesomeIcon icon={faCheck}/>
							</button>
							<button onClick={cancelEditingComment}><FontAwesomeIcon icon={faX} size='xs'/></button>

							</>
						) : (
							<>
							<p className={styles.item}>{item.comment}</p>
							<button onClick={() => startEditingComment(item.id, item.comment)}>
							<FontAwesomeIcon icon={faEraser}	/>
							</button>
							<button onClick={() => commentTrash(item.id)}>
								<FontAwesomeIcon icon={faTrashCan} size="xs" />
							</button>
							</>
						)
						}
					</div>
					))}
				</div>
			</div>
		</div>
	)
};

export default Comments;