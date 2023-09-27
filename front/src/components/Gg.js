import styled from "styled-components";

function Gg() {
	// const code = new URL(window.location.href).searchParams.get("code");

	// const REST_API_KEY = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    //     const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
    //     const SECRET_KEY = process.env.REACT_APP_GOOGLE_SECRET_KEY;
	const Google_URI = `https://port-0-sessak-back2-cgw1f2almhig6l2.sel5.cloudtype.app/api/v1/users/google/login`;
  
	return (
	  <a href={Google_URI}>
		<NaverLoginBtn src={"/naverlogin.png"} alt="구글구글"></NaverLoginBtn>
	  </a>
	);
  }
  
  const NaverLoginBtn = styled.img`
	width: 50px;
	height: 50px;
  `;
  
  export default Gg;