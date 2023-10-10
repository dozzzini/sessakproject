import React, { useEffect, useState } from "react";
import api from "../RefreshToken";
import styles from './mycomments.module.css';

import Header from "../components/Header";


const MyComments = () => {
	const [commentData, setCommentData] =useState([]);
	const [userInfo, setUserInfo] = useState({}); 


	const getMyPostList = async() => {
		try{
			const response = await api.get('users/userinfo/');
			console.log('api응답데이터', response.data);

			const {data, comment} = response.data;
			setUserInfo(data);
			setCommentData(comment);

			console.log('내가쓴글성공',response)		
		}catch(error){
			console.log( '내가쓴글실패', error)
		}
	}
	useEffect(() => {
		getMyPostList()
	}, [])



	return(
		<>
		<div className={styles.container}>
				{/* nickname: {userInfo.nickname} */}
				<Header	/>
				<p>내가 작성한 댓글</p>
				<ul className={styles.postList}>
				{commentData.map((comment, index) => (
				<li className={styles.postItem}
				key={index}>
					<div>댓글 : { comment.comment} </div>
					<div className={styles.participation}>
					{/* <div className={styles.postUserId}>
					<p><FontAwesomeIcon icon= {faCircleUser} />{post.nickname}</p>
					
					</div> */}
					{/* <div className={styles.participationItem}>
						<span count={count} onClick={(e) =>  onHeart(e, post.id)}>
						{heartColors[post.id] ?
						(
						<FontAwesomeIcon
							icon={faHeart}
							style={{color:'red'}}/>) : 
							(<FontAwesomeIcon
							icon={faHeart}
							style={{color:'black'}}/>)}
						<p>{post.like_nums}</p>
						</span>
						<div><FontAwesomeIcon icon={faCommentDots} flip="horizontal" />
							<p>{post.comment_nums}</p>
						</div>
						<div>
						<FontAwesomeIcon icon={faEye} />
						<p>{post.view_num}</p>
						</div>
							
					</div> */}
					
				</div>
				</li>
				
				))}
				</ul>
				
			</div>
			<div>
				
		</div>

	</>
	)
};

export default MyComments;