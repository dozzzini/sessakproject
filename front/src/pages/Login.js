import { styled } from "styled-components";

const Container = styled.div`
@media screen and (min-width: 414px)and (max-width: 700px){
    width: 100vw;
    height: 100vh;
    background-color: seashell;
    /* display: flex;
    justify-content: center;
    align-items: center; */
}
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 80vh;
    /* border: 1px solid gray; */
`
const Title = styled.div`
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    text-align: center;
    margin: 0 auto;
`
const TitleImg = styled.img`
    width: 300px;
    height: 300px;
    border-radius: 25px;
    margin: 20px auto;
    /* border: 2px solid firebrick; */
`
const SocialBox = styled.div`
    width: 100%;
    border: 2px solid darkblue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`
const SocialBtnBox = styled.div`
   
    padding: 5px;
    margin: 0 auto;
`
const NaverBtn = styled.button`
    width: 80px;
    text-align: center;
    cursor: pointer;
`
const KAKAOBtn = styled.button`
    width: 80px;
    text-align: center;
    cursor: pointer;
`
const GoogleBtn = styled.button`
    width: 80px;
    text-align: center;
    cursor: pointer;
`



const Login = () => {

    return(
        <Container>main
            <Wrapper>
                <Title>지금 우리 동네는
                    <TitleImg src="https://modo-phinf.pstatic.net/20190104_252/154656769119680glg_JPEG/mosa5BMDm6.jpeg?type=f320_320"  />
                </Title>
                <SocialBox>소셜 로그인을 이용해보세요~
                    <SocialBtnBox>
                        <NaverBtn>네이버</NaverBtn>
                        <KAKAOBtn>카카오</KAKAOBtn>
                        <GoogleBtn>구글</GoogleBtn>
                    </SocialBtnBox>
                </SocialBox>
            </Wrapper>
        </Container>
    )
}

export default Login;