import {styled} from 'styled-components'
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Board from '../components/Board';
import Header from '../components/Header';


const Container = styled.div`
    text-align: center;
    font-size: 30px;
    padding-top: 30px;
    background-color: #e1eef6;
    margin: 0px 50px;

    @media screen and (min-width: 414px) and (max-width: 700px){
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
    margin-top: 10px;
    width: 100%;
    height: 100vh;
    /* cursor: pointer; */
    position: relative;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
    
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
    const [search, setSearch] = useState('');
    // 햄버거바 세팅
    // const onMySetting = () => {
    //         return (
    //             <div>
                    
    //             </div>
    //         );
    // };
  

    const addEdit = () =>{
        navigate('/edit')
    }

    const searchingBtn = () => {
    };

    return(
        <Container>
            <Wrapper >
                <Header />
                         
                <Main>
                    <Board  />
                    
                </Main>
            </Wrapper>
        </Container>
    )
}
export default Home;
