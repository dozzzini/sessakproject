import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
	const {idx} = useParams();
	const [loading, setLoading] = useState(true);
	const [post, setPost] =useState({});
	const getPosts = async () => {
		const res = (await (axios.get(`/api/feed/${idx}`))).data;
		setPost(res.data);
		setLoading(false);
	};

	useEffect(() => {
		getPosts();
	}, [])
	return(
		<>
		 <div>선택한 게시글 열람중
		 {loading ? (<h2>loading~~</h2>) :
			(<div>
			<h2>{post.title}</h2>
			<p>{post.content}</p>
			</div>
			)
			}
		</div>
		</>
	)
};

export default PostDetail;