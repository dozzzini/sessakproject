import styled from "styled-components";

function Gg() {
	// const code = new URL(window.location.href).searchParams.get("code");

	// const REST_API_KEY = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    //     const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
    //     const SECRET_KEY = process.env.REACT_APP_GOOGLE_SECRET_KEY;
	const Google_URI = `https://port-0-sessak-back2-cgw1f2almhig6l2.sel5.cloudtype.app/api/v1/users/google/login`;
  
	return (
	  <a href={Google_URI}>
		<GGLoginBtn src={'https://w7.pngwing.com/pngs/506/509/png-transparent-google-company-text-logo.png'} alt="구글구글"></GGLoginBtn>
	  </a>
	);
  }
  
  const GGLoginBtn = styled.img`
	width: 50px;
	height: 50px;
	border-radius: 50%;
  `;
  
  export default Gg;