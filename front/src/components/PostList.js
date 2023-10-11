import React, { useEffect, useState } from 'react';
import styles from './postList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faCommentDots, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import api from '../RefreshToken';


const PostList = ({ posts, selectPost}) => {
    const [heartColors, setHeartColors] = useState({});
	const [count, setCount] = useState({});
	const [isLiked, setIsLiked] = useState({});

	const myLocation = posts?.page_list?.[0]?.author?.location || '' ;

	// function toggleLike() {
	// 	setIsLiked(!isLiked);
	//   }
	  // 좋아요 클릭 배경채우기
	const updateHeartColor = (postId) => {
		setHeartColors((prevColors) => ({
		...prevColors,
		[postId]: !prevColors[postId],
		}));
	};  
	useEffect(() => {
        // 포스트 목록이 변경될 때, 각 포스트의 좋아요 상태 및 개수를 초기화합니다.
        const initialIsLiked = {};
        const initialCount = {};

        posts?.page_list?.forEach((post) => {
            initialIsLiked[post.id] = post.is_like;
            initialCount[post.id] = post.like_nums;
        });

        setIsLiked(initialIsLiked);
        setCount(initialCount);
    }, [posts]);

    // ...

	const onHeart = (e, postId) => {
		e.stopPropagation(); // 이벤트 버블링 막기
		updateHeartColor(postId)
		
		const currentLiked = isLiked[postId] || false;
		setIsLiked({ ...isLiked, [postId]: !currentLiked });
        setCount({ ...count, [postId]: currentLiked ? count[postId] -1  : count[postId] +1 });

		const likeData = {
			postId: postId,
			is_like: !currentLiked, // 클릭 시 좋아요  반대로 토글
		  };
		  // Axios를 사용하여 서버로 POST 요청을 보냅니다.
		api
			.post(`posts/like/${postId}/`, likeData)
			.then((response) => {

			// console.log("좋아요 요청 성공:", response.data);
		
			  // 여기에서 필요한 상태 업데이트를 수행할 수 있습니다.
			  // 예를 들어, 좋아요 카운트를 업데이트하거나, 서버로부터의 응답을 반영할 수 있습니다.
			})
			.catch((error) => {
			  // 요청이 실패한 경우 에러를 처리할 수 있습니다.
			// console.error("좋아요 요청 실패:", error);
			});

    };
// console.log(posts , '23423');
	return(

	<div className={styles.container} >
			<div className={styles.myLocation}><p>내 동네 : {myLocation}</p></div>
		<ul className={styles.postList}>
		{posts?.page_list?.map((post) => (
			<li className={styles.postItem}
			key={post.id} onClick={() => selectPost(post)}>
				<div className={styles.contents}>
					<p>{post.title.length > 30 ? `${post.title.slice(0,30)}...` : post.title}
					</p>
					<p>{post.created_at.length > 0 ? `${post.created_at.slice(0,10)}` : post.created_at}</p>
				</div>
			
				<div className={styles.participation}>
					<div className={styles.postUserId}>
					<p><FontAwesomeIcon icon= {faCircleUser} />{post.author.nickname}</p>
					
					</div>
					<div className={styles.participationItem}>
						<span count={count} onClick={(e) =>  {onHeart(e, post.id)}}>
						{isLiked[post.id] ? (
                                <FontAwesomeIcon icon={faHeart} style={{ color: 'red' }} />
                            ) : (
                                <FontAwesomeIcon icon={faHeart} style={{ color: 'black' }} />
                            )}
        					<p>{count[post.id]}</p>

						{/* <p>{post.like_nums}</p> */}
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
	</div>
	)
};

export default PostList;