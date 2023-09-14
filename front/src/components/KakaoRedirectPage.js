import { useNavigate } from "react-router-dom";
import React from "react";

const KakaoRedirectPage = () => {
	const navigate = useNavigate();

	const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
	console.log('1', KAKAO_REST_API_KEY);
    const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;


	const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;


    const onKakaoSocialLogin = () => {
        // window.location.href=`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;
		window.location.href = kakaoURL;

		const isSuccess = true;
		if(isSuccess){
			navigate('/hi');
		}else{
			alert('카카오 로그인 실패');
			navigate('/');
		}

		//나중에 백서버랑 연결하고 then처리로 페이지 이동처리(홈으로)
    }; 

// 인가 코드 추출
	const code= new URL(window.location.href).searchParams.get('code');
	// console.log('code', code);
	
	return(
		<></>
	)
}

export default KakaoRedirectPage;