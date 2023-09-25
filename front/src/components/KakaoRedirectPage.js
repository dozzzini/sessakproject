import { useNavigate } from "react-router-dom";
import React, { useEffect }  from "react";

const KakaoRedirectPage = () => {
	const navigate = useNavigate();

	const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
	// console.log('1', KAKAO_REST_API_KEY);
    const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;


	const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;


    const onKakaoSocialLogin = () => {
		window.location.href = KAKAO_URL;

		const isSuccess = true;
		if(isSuccess){
			// navigate('/hi');
		}else{
			alert('카카오 로그인 실패');
			navigate('/');
		}

		//나중에 백서버랑 연결하고 then처리로 페이지 이동처리(홈으로)
    }; 

// 인가 코드 추출
	const code= new URL(window.location.href).searchParams.get('code');
	// console.log('code', code);
	
	useEffect(() => {
        if (code) {
            // 인가 코드가 존재하면 로그인이 성공한 것으로 처리
            // 서버로 인가 코드를 전송하고, 서버에서 사용자 인증 및 처리를 수행할 수 있습니다.
            
            // 예: axios.post('/api/login', { code })
            //     .then((response) => {
            //         // 로그인 성공 후 이동할 페이지를 지정
			// 			console.log('로그인 성공');
            //         navigate('/hi');
            //     })
            //     .catch((error) => {
            //         console.error('로그인 실패:', error);
            //         alert('카카오 로그인 실패');
            //         navigate('/');
            //     });
        }
    }, [code, navigate]);



	return(
		<>
			<button onClick={onKakaoSocialLogin}>카카오</button>
		</>
	)
}

export default KakaoRedirectPage;