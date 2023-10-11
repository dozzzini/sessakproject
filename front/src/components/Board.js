import { styled } from "styled-components";
import PostDetail from "./PostDetail";
import PostList from "./PostList";
import React, { useEffect, useState } from "react";
import {  useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../RefreshToken";
import Pagination from "./Pagination";

const FeedBox  = styled.div`
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    width: 100%;
    height: 100%;
    padding: 20px 30px 0px 30px;
    /* border: 4px solid darkblue; */
    margin-bottom: 20px;
    
    /* overflow-y: scroll; */
    /* y축 스크롤 바 가리기 */
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
    display: none;
    };
    scrollbar-width: none;

`;
// const Feed = styled.div`
//     background-color: whitesmoke;
//     width: 100%;
//     height: 100%;
//     font-size: 20px;
//     border: 1px solid white;
//     border-radius: 15px;
//     margin-bottom: 20px;
//     text-align: start;
//     display: flex;
//     flex-direction: column;
    
// `;
// const TextBox = styled.div`
//     background-color: #FAEBCD;
//     width: 100%;
//     height: 90px;
//     padding: 10px;
//     border-radius: 15px;
//     cursor: pointer;
//     margin-bottom: 20px;
//     /* .tt{
//         height: 100%;
//         background-color: aqua;
//         font-size:10px;
//     } */
   
// `
// const Participation = styled.div`
//     display: flex;
//     justify-content: flex-end;
//     padding: 2px;
//     margin-right: 10px;
//     background-color: #FAEBCD;
//     /* position: relative; */
// `
// const Likes = styled.button`
//     border: none;
//     /* background-color: whitesmoke; */
//     background-color: #FAEBCD;

//     margin-right: 15px;
//     margin-top: 10px;
//     cursor: pointer;
//     svg{
//         width: 20px;
//         color: red;
//     };
//     p{
//     background-color: #FAEBCD;

//         margin: 0px;
//     };
// `
// const Comments = styled.button`
//     border: none;
//     /* background-color: whitesmoke; */
//     background-color: #FAEBCD;
//     margin-right: 15px;
//     margin-top: 10px;
//     cursor: pointer;
//     svg{
//         width: 20px;
//     };
//     p{
//         margin: 0px;
//     };
// `
// const Views = styled.button`
//     border: none;
//     /* background-color: whitesmoke; */
//     background-color: #FAEBCD;
//     margin-right: 10px;
//     margin-top: 10px;
//     cursor: pointer;
//     svg{
//         width: 20px;
//     };
//     p{
//         margin: 0px;
//     };
// `
// const UserDate = styled.div`
//     /* position: absolute;
//     left: 30px;
//     top: 20px; */
//     margin-top: 10px;
//     font-size: 10px;
// `



const Board = () => { 

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [date, setDate] = useState();
    const [totalPage, setTotalPage] = useState([]);
    // const [currentPage, setCurrentPage] = useState(1); // 현재 페이지를 상태로 관리합니다.
    // const [page, setPage] = useState(1); // 현재 페이지 상태 추가
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    //검색어 조회
    const [searchValue, setSearchValue] = useState('');

// useSearchParams를 사용하여 URL 쿼리값 가져오기
const [searchParams, setSearchParams] = useSearchParams();

// page 값이 존재한다면 해당 값을 사용하고, 그렇지 않다면 1을 사용합니다.
const currentPage = searchParams.get('total_page') || '1';
const keywordSearch = searchParams.get(`keyword`)

    useEffect(() => {
        
        
        
        // 현재 페이지를 쿼리 매개변수 'page'에서 가져옵니다 (기본값은 1로 설정됩니다).
        const searchParams = new URLSearchParams(location.search);
        // const currentPage = parseInt(searchParams.get("page")) || 1;
        
        // 게시글 목록을 불러오기
        const getPosts = async() => {
            try {
                const response = await api.get('posts/postlist/',{
                    params: { page:currentPage},
                })
                setPosts(response.data);
                setTotalPage(response.data.total_page);
                
                // setCurrentPage(currentPage);
                // setPage(currentPage); // 현재 페이지를 설정합니다.
            } catch (error) {
                // console.log("게시글 목록을 불러오는 데 실패했습니다.", error);
            }
        }
        if(!keywordSearch){

            getPosts();
        }
        if(keywordSearch){
             
                     api.get('posts/post_search/', {
                        params : {keyword : keywordSearch},
                    }
                    ).then((response)=>{  // 검색 결과 저장\
                    setPosts({page_list:response.data})},   
                    ).catch((error) => {
                    alert('검색어를 다시 입력해주세요.');
                    // console.log(error, '검색에러')
                }
                    )
        }
    }, [searchParams]);

    const selectPost = (posts) => {
        
        const id = posts.id;
        navigate(`/posts/${id}`);
        setSelectedPost(posts);
    };
  
    return(
        <FeedBox>
        <PostList posts={posts} key={posts} selectPost={selectPost}
         />
         
        {selectedPost ? (
            <PostDetail 
            post={selectedPost} 
            />
        ) : (
        null
        )}
           {keywordSearch ? (null) :
           ( <Pagination 
            // 현재 페이지 값을 숫자로 변환합니다.
           totalPage={totalPage.length}
           pageList={totalPage}
           currentPage={currentPage}
            />)}
      </FeedBox>
    )
};

export default Board;