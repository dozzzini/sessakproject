import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
	const {id} = useParams();
	const [loading, setLoading] = useState(true);
	const [post, setPost] =useState({});

	const getPosts = async () => {
		try{
			const res = await axios.get(`/posts/${id}`);
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

	return(
		<>
		<div>선택한 게시글 열람중
				{loading ? (
					<h2>loading~~</h2>
				) : (
					<div>
						{post.title ? (
							<h2>title : {post.title}</h2>
						) : (
							<h2>No title available</h2>
						)}
						{/* <p>content : {post.content}</p> */}
					</div>
				)}
			</div>
		</>
	)
};

export default PostDetail;