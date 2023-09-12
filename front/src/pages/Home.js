import {styled} from 'styled-components'
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Feeds from '../components/Feeds';
import Category  from '../components/Category';

const Container = styled.div`
    text-align: center;
    font-size: 30px;
    padding-top: 30px;
    background-color: #e1eef6;
    margin: 0px 50px;

@media screen and (min-width: 414px)and (max-width: 700px){
    background-color: #e1eef6;
    width: 100%;
    height: 100vh;
    text-align: center;
    font-size: 30px;
    padding-top: 30px;
    margin:  0px;
}
`;
const Wrapper = styled.div`
    background-color: #e1eef6;
    margin-top: 20px;
    width: 100%;
    height: 100vh;
    cursor: pointer;
    position: relative;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
    
`;
const Header = styled.div`
    background-color: #fcbe32;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    margin-top: 10px;
`;
const SearchBox = styled.div`
    width: 40%;
    display: flex;
    justify-content:center; 
    align-items: center;
`;
const SearchInput = styled.input`
    background-color: whitesmoke;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
    width: 80%;
    height: 35px;
    border: none;
   
`;
const SearchBtn = styled.div`
    background-color: #fcbe32;
    width: 25px;
    height: 25px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    margin-left: 5px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover{
        background-color: whitesmoke;
    }

`;
const SettingBox = styled.div`
    display: flex;
    width: 70px;
    justify-content: space-between;
    position: absolute;
    top: 50px;
    right: 30px;
    
    @media screen and (min-width: 414px)and (max-width: 700px){
        top: 50px;
        right: 30px;
        }
    
`;
const User = styled.button`
 cursor: pointer;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: #fcbe32;

    &:hover{
        background-color: whitesmoke;
    }
    
`;
const Main = styled.div`
    display: flex;
    flex-direction: column;
    /* border: 4px solid red; */
    width: 100%;
    height: 85%;
`;

const Home = () => {
    const navigate = useNavigate();
    
    // 햄버거바 세팅
    // const onMySetting = () => {
    //         return (
    //             <div>
                    
    //             </div>
    //         );
    // };
    // 좋아요 클릭 배경채우기
    const onHeart = () => {
        return(
            <div style={{color:'red'}}>
                <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                </svg>
            </div>
        )
    }

    return(
        <Container>
            <Wrapper >
                지금 우리 동네는?
                <Header>
                    <SearchBox>
                        <SearchInput  placeholder='검색어를 입력하세요.'  />
                        <SearchBtn className='search'>
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" height={'20px'} aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" />
                        </svg>
                        </SearchBtn>
                    </SearchBox>
                    <SettingBox>
                        <User
                         onClick={() => navigate('/userinfo')}>
                            <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                            </svg>
                        </User>
                         <Category   />
                    </SettingBox>  

                </Header>
                <Main>
                    <Feeds  />
                    <Pagination />
                </Main>
            </Wrapper>
        </Container>
    )
}
export default Home;
