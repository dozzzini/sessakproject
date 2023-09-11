import {styled} from 'styled-components'


const Container = styled.div`
    text-align: center;
    font-size: 30px;
    padding-top: 30px;

@media screen and (min-width: 414px)and (max-width: 700px){
    background-color: cadetblue;
    width: 100vw;
    height: 100vh;
    text-align: center;
    font-size: 30px;
    padding-top: 30px;
}
`;
const Wrapper = styled.div`
    /* background-color: darkgray; */
    /* margin-top: 20px; */
    width: 100%;
    height: 100vh;
    position: relative;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
    
`;
const Header = styled.div`
    background-color: salmon;
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
    align-self: center; 
`;
const SearchInput = styled.input`
    /* background-color: whitesmoke; */
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
    width: 80%;
    border: none;
   
`;
const SearchBtn = styled.button`
    /* background-color: saddlebrown; */
    width: 25px;
    height: 25px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: salmon;
    margin-left: 5px;
    &:hover{
        background-color: red;
        /* opacity: 0.8; */
    }

`
const SettingBtn =styled.button`
    cursor: pointer;
    position: absolute;
    width: 30px;
    height: 30px;
    top: 50px;
    right: 10px;
    border: none;
    border-radius: 5px;

    @media screen and (min-width: 414px)and (max-width: 700px){
        top: 50px;
        right: 20px;
    }
`;
const Main = styled.div`
    display: flex;
    flex-direction: column;
    /* border: 4px solid red; */
    width: 100%;
    height: 80%;

`
const Feeds = styled.div`
    /* display: flex;
    flex-direction: column;
    align-items: center; */
    width: 100%;
    height: 800px;
    padding: 20px 30px 0px 50px;
    /* border: 4px solid darkblue; */
    
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
    height: 120px;
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
    height: 60px;
    padding: 10px;
    border-radius: 15px;
    cursor: pointer;
`
const Participation = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 2px;
    margin-right: 10px;
`
const Likes = styled.button`
    border: none;
    background-color: whitesmoke;
    margin-right: 15px;
    margin-top: 10px;
    cursor: pointer;
    svg{
        width: 20px;
        color: red;
    };
    p{
        margin: 0px;
    };
`
const Comments = styled.button`
    border: none;
    background-color: whitesmoke;
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
    background-color: whitesmoke;
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
const PageNation = styled.div`
    margin-top: 50px;
`;



const Home = () => {

    // 햄버거바 세팅
    const onMySetting = () => {
            return (
                <div>
                    
                </div>
            );
    };
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
            <Wrapper>지금 우리 동네는?
                <Header>
                    <SearchBox>
                        <SearchInput  placeholder='검색어를 입력하세요.'  />
                        <SearchBtn className='search'>
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" height={'20px'} aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" />
                        </svg>
                        </SearchBtn>
                    </SearchBox>
                    <SettingBtn onClick={onMySetting}>
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" height={'15px'} aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" />
                        </svg>
                    </SettingBtn>
                </Header>
                <Main>
                    <Feeds>
                        <Feed>
                            <TextBox>게시글1</TextBox>
                            <Participation>
                                <Likes onClick={onHeart}>
                                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 018-2.828A4.5 4.5 0 0118 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 01-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
                                    </svg>
                                    <p>777</p>
                                </Likes>
                                <Comments>
                                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" />
                                    </svg>
                                    <p>777</p>
                                </Comments>
                                <Views>
                                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                    <path clipRule="evenodd" fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <p>777</p>
                                </Views>
                            </Participation>
                        </Feed>
                        <Feed>게시글2</Feed>
                        <Feed>게시글3</Feed>
                        
                    </Feeds>
                    <PageNation>123</PageNation>
                </Main>
            </Wrapper>
        </Container>
    )
}
export default Home;
