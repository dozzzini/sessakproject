import React, { useEffect, useState } from "react";
import api from "../RefreshToken";
import styles from './mypostlist.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faCommentDots, faEye } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";


const CategorisView = () => {
	const [postData, setPostData] =useState([]);
	const [userInfo, setUserInfo] = useState({}); 


	const getMyPostList = async() => {
		try{
			const response = await api.get('users/userinfo/');
			// console.log('api응답데이터', response.data);

			const {data, post} = response.data;
			setUserInfo(data);
			setPostData(post);

			// console.log('내가쓴글성공',response)		
		}catch(error){
			// console.log( '내가쓴글실패', error)
		}
	}
	useEffect(() => {
		getMyPostList()
	}, [])



	return(
		<>
		<div className={styles.container}>
				nickname: {userInfo.nickname}
				<Header	/>
				<p>내가 작성한 게시글</p>
				<ul className={styles.postList}>
				{postData.map((post, index) => (
				<li className={styles.postItem}
				key={index}>
					<div className={styles.numIdx}>{index+1}.
					</div>
					<div>
						<div className={styles.postTitle}>제목 : { post.title.length > 30? `post.title.slice(0, 30)}...` : post.title}</div>
						<div className={styles.postContent}> 내용 : { post.content.length >150? `${post.content.slice(0,120)}...` : post.content} </div>
					</div>
					<div className={styles.participation}>
					{/* <div className={styles.postUserId}>
					<p><FontAwesomeIcon icon= {faCircleUser} />{post.nickname}</p>
					
					</div> */}
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
				
			</div>
			<div>
				
		</div>

	</>
	)
};

export default CategorisView;