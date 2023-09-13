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
          <Route path='/edit' element={<NewPost />}  />
          
        </Routes> 
    </UserContext.Provider>           
    </BrowserRouter>

  );
}

export default App;
