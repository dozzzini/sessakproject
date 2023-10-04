import React, { useState } from 'react';
import styles from './postList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const PostList = ({ posts, selectPost, }) => {
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
			{post.title.length > 35 ? `${post.title.slice(0,35)}...` : post.title}
			{post.comment}
			<div className={styles.participation}>
				<span count={count} onClick={(e) =>  onHeart(e, post.id)}>
					{heartColors[post.id] ?
					(<FontAwesomeIcon
						icon={faHeart}
						style={{color:'red'}}/>) : 
						(<FontAwesomeIcon
						icon={faHeart}
						style={{color:'black'}}/>)}
					{post.like_nums}</span>

				<span><svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{width: '20px'}} aria-hidden="true">
                <path clipRule="evenodd" fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" />
                </svg>{post.userId}</span>
				
				<span><svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style={{width: '20px'}}  aria-hidden="true">
                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                <path clipRule="evenodd" fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>{post.view_num}</span>
			</div>
			</li>
		))}
    	</ul>
	</div>
	)
};

export default PostList;