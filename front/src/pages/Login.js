import { styled } from "styled-components";
import { GoogleOAuthProvider,  } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from "react";
import axios from 'axios';
import jwtDecode from "jwt-decode";
import KakaoRedirectPage from "../components/KakaoRedirectPage";
import styles from './login.module.css';


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
    font-family: 'Giants-Regular';    
    font-size: 40px;
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
    /* border: 2px solid darkblue; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

`
const SocialBtnBox = styled.div`
   
    padding: 5px;
    margin: 0 auto;
`
// const NaverBtn = styled.button`
//     width: 80px;
//     text-align: center;
//     cursor: pointer;
// `
const KAKAOBtn = styled.div`
    width: 180px;
    text-align: center;
    cursor: pointer;
    
`
const GoogleBtn = styled.button`
    width: 80px;
    text-align: center;
    cursor: pointer;
`



const Login = () => {
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(null);
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
    const scope = ['email'];

    // const onGoogleSocialLogin = () => {
    //     window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID }&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=token&scope=openid email`;
    // };


    // const responseGoogle = (response) => {
    //     if (response.accessToken) {
    //         // 클라이언트에서 받은 액세스 토큰을 상태 변수에 저장
    //         setAccessToken(response.accessToken);

    //         // 서버로 액세스 토큰 전송 로직을 추가
    //         sendAccessTokenToServer(response.accessToken);

    //         // 로그인 성공 후 이동할 페이지로 네비게이션
    //         navigate('/hi');
    //     } else {
    //         console.log('구글 로그인 실패', response);
    //     }
    // };

    const sendAccessTokenToServer = async(accessToken) => {
        // 액세스 토큰을 서버로 전송
        try {
            const response = await axios.post('/api/login', { accessToken }, {
                headers: { accept: 'application/json' },
            });
            console.log('서버 응답:', response.data);
            // 서버에서의 응답을 처리하거나 필요한 작업을 수행
            // navigate 함수 사용해서 페이지 이동하기
            navigate('/hi');
        } catch (error) {
            console.error('서버 요청 실패:', error);
        }
    };

 

	const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    
    const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;


	const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;


    const onKakaoSocialLogin = () => {
        // window.location.href=`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
		window.location.href = KAKAO_URL;
        console.log('kako');
        // const isSuccess = true;
		// if(isSuccess){
		// 	navigate('/hi');
		// }else{
		// 	alert('카카오 로그인 실패');
		// 	navigate('/');
		// }
    }; 
    

    return(
        <Container>
            <Wrapper>
                <Title>지금 우리 동네는
                    <TitleImg src="https://modo-phinf.pstatic.net/20190104_252/154656769119680glg_JPEG/mosa5BMDm6.jpeg?type=f320_320"  />
                </Title>
                <SocialBox className={styles.sub}>지우동을 이용하려면 소셜로그인을 이용해주세요!
                    <SocialBtnBox>
                        {/* <NaverBtn>네이버</NaverBtn> */}
                        {/* <KAKAOBtn style={{width: '100px', backgroundColor:'yellow'}} onClick={onKakaoSocialLogin}>카카오</KAKAOBtn> */}
                        <div><KakaoRedirectPage  /></div>
                        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                            scope={scope}
                            onSuccess={(credentialResponse ) => {
                               
                                // credentialResponse 객체에서 액세스토큰 추출!
                                const accessToken = credentialResponse.credential.accessToken;
                                // //  accessToken을 얻은 후 상태 변수에 저장
                                setAccessToken(accessToken);

                                //서버로 엑세스 토큰 전송
                                sendAccessTokenToServer(accessToken);
                                console.log('accessToken', accessToken);

                                console.log(jwtDecode(credentialResponse.credential))
                                console.log('성공', credentialResponse);
                               
                            }}
                            onError={(error) => {
                                console.log('Login Failed', error);
                            }}
                            />
                        </GoogleOAuthProvider>
                        
                    </SocialBtnBox>
                </SocialBox>
            </Wrapper>
        </Container>
    )
}

export default Login;