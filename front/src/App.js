import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Home from './pages/Home';
import Login from './pages/Login';
import UserPage from './pages/UserPage';
import NewPost from './pages/NewPost';
import { useEffect, useState } from 'react';
import {UserContext} from './context/LoginContext';
import GoogleOAuth2RedirectPage from './components/GoogleOAuth2RedirectPage';
import KakaoRedirectPage from './components/KakaoRedirectPage';
import MyPostLists from './pages/MyPostList';
import MyComments from './pages/MyComments';


const GlobalStyles = createGlobalStyle`
${reset}
*{
  box-sizing : border-box;
  margin: 0;
  padding: 0;
}
body{
  /* background-color: red;
  width:100% */
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
` ;

function App() {
  const[accessToken, setAccessToken] = useState(null);
  const [isLogin, setIsLogin] = useState('');
  
  useEffect(() => {
    if(accessToken){

    }

  }, [accessToken]);


  return (
    <BrowserRouter>
      <GlobalStyles />
      <UserContext.Provider value= {{accessToken, setAccessToken, isLogin, setIsLogin}}>
        <Routes>
          <Route path='/hi' element={<Home />} />
          <Route path='/userinfo' element={<UserPage/>}  />
          <Route path='/' element={<Login />} />
          <Route path='/oauth' element={<GoogleOAuth2RedirectPage  />} />
          <Route path='/oauth' element={<KakaoRedirectPage  />}/>
          <Route path='/edit' element={<NewPost />}  />
          <Route path='/mypostlist' element={<MyPostLists  />} />
          <Route path='/mycommentlist' element={<MyComments />} />
          
        </Routes> 
    </UserContext.Provider>           
    </BrowserRouter>

  );
}

export default App;
