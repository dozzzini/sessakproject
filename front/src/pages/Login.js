import { styled } from "styled-components";
import { GoogleOAuthProvider,  } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import jwtDecode from "jwt-decode";
import KakaoRedirectPage from "../components/KakaoRedirectPage";
import styles from './login.module.css';
import Gg from "../components/Gg";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import api from "../RefreshToken";


const SocialBtnBox = styled.div`
   
    padding: 5px;
    margin: 0 auto;
`
const Id = styled.div`
`
const Pw = styled.div`
`
const Form = styled.form`
`
const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [accessToken, setAccessToken] = useState(null);
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const GOOGLE_REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
    const scope = ['email'];



  

    const sendAccessTokenToServer = async(accessToken) => {
        // 액세스 토큰을 서버로 전송
        try {
            const response = await api.post('api/login', { accessToken }, {
                headers: { accept: 'application/json' },
            });
            // console.log('서버 응답:', response.data);
            // 서버에서의 응답을 처리하거나 필요한 작업을 수행
            // navigate 함수 사용해서 페이지 이동하기
            navigate('/hi');
        } catch (error) {
            // console.error('서버 요청 실패:', error);
        }
    };

 
    // const gg = () => {`https://port-0-sessak-back2-cgw1f2almhig6l2.sel5.cloudtype.app/api/v1/users/google/login`}

	// const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
    
    // const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;


	// const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;


    // const onKakaoSocialLogin = () => {
    //     // window.location.href=`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
	// 	window.location.href = KAKAO_URL;
    //     console.log('kako');
    //     // const isSuccess = true;
	// 	// if(isSuccess){
	// 	// 	navigate('/hi');
	// 	// }else{
	// 	// 	alert('카카오 로그인 실패');
	// 	// 	navigate('/');
	// 	// }
    // }; 
    const  {register, handleSubmit,  errors}   = useForm();

    const handleLogin = async(data) => {
    //     console.log({
    //     email:data.email,
    //     password:data.password
    // }
    // )
        const response = await api.post('users/login/', 
        {
            email:data.email,
            password:data.password
        },{
            headers: {
                'Content-Type': 'application/json',       
            },
                'withCredentials': true,
        }        
    )
        Cookies.set('access_token', response.data.access)
        Cookies.set('refresh_token', response.data.refresh)
        navigate('/hi');
    }

    const pathSignUp = () => {
        navigate('/signup')
    }
    return(
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.title}>지금 우리 동네는
                    <img src=" https://i.pinimg.com/564x/38/35/9a/38359a83e8df8b0a0eb77b0aee69e448.jpg" />
                </div>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className={styles.loginBox}>
                        <div>
                            <div className={styles.userBox}>
                                <span>이메일</span>
                                <input
                                    className={styles.inputText}
                                    type="email"
                                    name="이메일"
                                        {...register("email",{ required: true, pattern: /^\S+@\S+$/i})}
                                    />
                            </div>
                            <div className={styles.userBox}>
                                <span>비밀번호</span>
                                <input
                                    className={styles.inputText}
                                    type="password"
                                    name="password"  
                                    {...register('password', { required: true })}   
                                />
                            </div>
                        </div>
                        
                        <div>
                            <button className={styles.loginBtn} type="submit">Go</button>
                        </div>
                    </div>
                    
                </form>
                <div className={styles.sub}>
                    <p>지우동을 이용하려면 소셜로그인을 이용해주세요!</p>
                <div
                className={styles.joinus} 
                onClick={pathSignUp}>회원가입</div>
                    <div className={styles.socialBtnBox}>
                        {/* <NaverBtn>네이버</NaverBtn> */}
                        {/* <KAKAOBtn style={{width: '100px', backgroundColor:'yellow'}} onClick={onKakaoSocialLogin}>카카오</KAKAOBtn> */}
                        {/* <div><KakaoRedirectPage  /></div> */}
                        {/* <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}> */}
                        {/* <GoogleLogin
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
                        /> */}
                            {/* <button onClick={()=>{
                                
                            }}>123</button>
                        </GoogleOAuthProvider> */}
                        <Gg />
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;