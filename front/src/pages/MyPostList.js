import React, { useEffect, useState } from "react";
import api from "../RefreshToken";

const MyPostLists = () => {
	const [post, setPost] =useState({});
	const [nickname, setNickname] = useState(""); 


	const getMyPostList = async() => {
		try{
			const response = await api.get('users/userinfo/',)
			setNickname(response.data.nickname); 

			console.log('내가쓴글성공',response)		}catch(error){
			console.log( '내가쓴글실패', error)
		}
	}
	useEffect(() => {
		getMyPostList()
	}, [])



	return(
		<>내가 쓴 
		<div>
				{nickname}
			</div>
			<div>
				Title: {post.post && post.post.title}
			</div>
			<div>
				Content: {post.post && post.post.content} 
			</div>
		</>
	)
};

export default MyPostLists;