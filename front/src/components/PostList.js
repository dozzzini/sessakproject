import React, { useState } from 'react';
import styles from './postList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faCommentDots, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const PostList = ({ posts, selectPost}) => {
    const [heartColors, setHeartColors] = useState({});
	const [count, setCount] = useState(0);


	  // 좋아요 클릭 배경채우기
	const updateHeartColor = (postId) => {
		setHeartColors((prevColors) => ({
		...prevColors,
		[postId]: !prevColors[postId],
		}));
	};  
	const onHeart = (e, postId) => {
		e.stopPropagation(); // 이벤트 버블링 막기
		updateHeartColor(postId)
		// setCount(count + 1);
		// console.log((count));
		const currentLiked = heartColors[postId] || false;

		const likeData = {
			postId: postId,
			liked: !currentLiked, // 클릭 시 좋아요  반대로 토글
		  };
		  // Axios를 사용하여 서버로 POST 요청을 보냅니다.
		axios
			.post(`https://port-0-sessak-back2-cgw1f2almhig6l2.sel5.cloudtype.app/api/v1/posts/like/${postId}/`)
			.then((response) => {
			  // 요청이 성공하면 서버로부터의 응답을 처리할 수 있습니다.
			//   const updatedCount = response.data.updatedCount;
			//   if (!isNaN(updatedCount)) {

			//   setCount(updatedCount);}
			//   else {
				// console.error("업데이트된 카운트가 유효하지 않습니다.");
			//   }

			console.log("좋아요 요청 성공:", response.data);
		
			  // 여기에서 필요한 상태 업데이트를 수행할 수 있습니다.
			  // 예를 들어, 좋아요 카운트를 업데이트하거나, 서버로부터의 응답을 반영할 수 있습니다.
			})
			.catch((error) => {
			  // 요청이 실패한 경우 에러를 처리할 수 있습니다.
			console.error("좋아요 요청 실패:", error);
			});

    };
console.log(posts , '23423');
	return(

	<div className={styles.container} >
		<ul className={styles.postList}>
		{posts?.page_list?.map((post) => (
			<li className={styles.postItem}
			key={post.id} onClick={() => selectPost(post)}>
			{post.title.length > 30 ? `${post.title.slice(0,30)}...` : post.title}
			{post.comment}
				<div className={styles.participation}>
					<div className={styles.postUserId}>
					<p><FontAwesomeIcon icon= {faCircleUser} />{post.author.nickname}</p>
					
					</div>
					<div className={styles.participationItem}>
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
							
					</div>
					
				</div>
			</li>
		))}
    	</ul>
		<div className={styles.commentpagination}>
			{/* < Paging	/> */}
		</div>
	</div>
	)
};

export default PostList;