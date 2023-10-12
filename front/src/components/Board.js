import { styled } from "styled-components";
import PostDetail from "./PostDetail";
import PostList from "./PostList";
import React, { useEffect, useState } from "react";
import {  useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../RefreshToken";
import Pagination from "./Pagination";
import Category from "./Category";
import { useCategory } from "../CategoryContext";

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




const Board = () => { 

    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [date, setDate] = useState();
    const [totalPage, setTotalPage] = useState([]);
    
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    //검색어 조회, 
    const [searchValue, setSearchValue] = useState('');
    // const [selectedCategory, setSelectedCategory] = useState(''); // 선택한 카테고리 저장
    const {category} =params;
    // const handleSelectCategory = (category) => {
    //     setSelectedCategory(category);
    // };
    // 선택한 카테고리 
    const { selectedCategory } = useCategory(category);


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
                    params: { page:currentPage, category: selectedCategory},
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
    }, [searchParams, selectedCategory]);


    const selectPost = (posts) => {
        
        const id = posts.id;
        navigate(`/posts/${id}`);
        setSelectedPost(posts);
    };
  
    return(
        <FeedBox>
            {/* <Category   onSelectCategory={handleSelectCategory}/> */}
        <PostList posts={posts} key={posts} selectPost={selectPost} selectedCategory={selectedCategory}
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