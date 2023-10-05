import { styled } from "styled-components";
import PostDetail from "./PostDetail";
import PostList from "./PostList";
import Edit from "./Edit";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../RefreshToken";

const FeedBox  = styled.div`
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    width: 100%;
    height: 100%;
    padding: 20px 30px 0px 30px;
    /* border: 4px solid darkblue; */
    margin-bottom: 20px;
    
    overflow-y: scroll;
    /* y축 스크롤 바 가리기 */
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
    display: none;
    };
    scrollbar-width: none;

`;
const Feed = styled.div`
    background-color: whitesmoke;
    width: 100%;
    height: 100%;
    font-size: 20px;
    border: 1px solid white;
    border-radius: 15px;
    margin-bottom: 20px;
    text-align: start;
    display: flex;
    flex-direction: column;
    
`;
const TextBox = styled.div`
    background-color: #FAEBCD;
    width: 100%;
    height: 90px;
    padding: 10px;
    border-radius: 15px;
    cursor: pointer;
    margin-bottom: 20px;
    /* .tt{
        height: 100%;
        background-color: aqua;
        font-size:10px;
    } */
   
`
const Participation = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 2px;
    margin-right: 10px;
    background-color: #FAEBCD;
    /* position: relative; */
`
const Likes = styled.button`
    border: none;
    /* background-color: whitesmoke; */
    background-color: #FAEBCD;

    margin-right: 15px;
    margin-top: 10px;
    cursor: pointer;
    svg{
        width: 20px;
        color: red;
    };
    p{
    background-color: #FAEBCD;

        margin: 0px;
    };
`
const Comments = styled.button`
    border: none;
    /* background-color: whitesmoke; */
    background-color: #FAEBCD;
    margin-right: 15px;
    margin-top: 10px;
    cursor: pointer;
    svg{
        width: 20px;
    };
    p{
        margin: 0px;
    };
`
const Views = styled.button`
    border: none;
    /* background-color: whitesmoke; */
    background-color: #FAEBCD;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;
    svg{
        width: 20px;
    };
    p{
        margin: 0px;
    };
`
const UserDate = styled.div`
    /* position: absolute;
    left: 30px;
    top: 20px; */
    margin-top: 10px;
    font-size: 10px;
`



const Board = () => {    
    // const [ex, setEx] = useState([
    //     { id: 1, title: '프로젝트... ' , likes: 123 , comments: 456, views: 7651},
    //     { id: 2, title: '못하겠다...', likes: 345 , comments: 678, views:3455},
    //     { id: 3, title: 'ㅠㅠㅠㅠㅠㅠ', likes: 975 , comments: 823,  views:4534},
    //     { id: 4, title: '안녕히..', likes: 234 , comments: 234,  views:234},
// ]}

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const navigate = useNavigate();
    const params = useParams();
	// const [heartStates, setHeartStates] = useState(Array(posts.length).fill(false));

    useEffect(() => {
        // 게시글 목록을 불러오기
        const getPosts = async() => {
        try {
            // const response = await axios.get(
            //     // "https://jsonplaceholder.typicode.com/posts", {data:posts.id},
            //     "https://port-0-sessak-back2-cgw1f2almhig6l2.sel5.cloudtype.app/api/v1/posts/postlist/",
            //     {headers: 
            //         {
            //         'Content-Type': 'application/json',
            //         'Authorization':`Bearer ${Cookies.get('access_token')}`
            //         },
            //         'withCredentials': true,
            //     }
            // ); //더미데이터 url
            // setHeartStates(new Array(response.data.length).fill(false));
            const response = await api.get('posts/postlist/')
            setPosts(response.data);
        } catch (error) {
            console.log("게시글 목록을 불러오는 데 실패했습니다.", error);
        }
        }

        getPosts();
    }, []);

    const selectPost = (posts) => {
        
        const id = posts.id;
        navigate(`/posts/${id}`);
        setSelectedPost(posts);
    };
    
    
   
    return(
        <FeedBox>
        <PostList posts={posts} selectPost={selectPost}
        //  onHeart ={onHeart} 
         />
        {selectedPost ? (
            <PostDetail 
            post={selectedPost} 
            />
        ) : (
        null
        )}
      </FeedBox>
    )
};

export default Board;