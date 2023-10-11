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
import Playground from './pages/Playground';
import PopularPost from './pages/PopularPost';
import Sooda from './pages/Sooda';
import PostDetail from './components/PostDetail';
import SignUp from './pages/SignUp';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ProtectedRouter } from './ProtectRouter';


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
  const[access_token, setAccess_token] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState('');
  const queryClient = new QueryClient();

  useEffect(() => {
    if(access_token){

    }

  }, [access_token]);


  return (
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <div className='App'>
          <ChakraProvider>
            <UserContext.Provider value= {{access_token, setAccess_token, isLoggedIn, setIsLoggedIn}}>
              <Routes>
                <Route path='/hi' 
                element={<ProtectedRouter>
                  <Home />
                  </ProtectedRouter>} />
                <Route path='/userinfo' element={<ProtectedRouter>
                  <UserPage/>
                  </ProtectedRouter>}  />
                <Route path='/' element={<Login />} />
                <Route path='signup' element={<SignUp />} />
                <Route path='/oauth' element={<GoogleOAuth2RedirectPage  />} />
                <Route path='/oauth' element={<KakaoRedirectPage  />}/>
                <Route path='/edit' element={<ProtectedRouter>
                  <NewPost />
                </ProtectedRouter>}  />
                <Route path='/posts/:id' element={<ProtectedRouter>
                  <PostDetail />
                </ProtectedRouter>} />
                <Route path='/mypostlist' element={<ProtectedRouter>
                  <MyPostLists  />
                </ProtectedRouter>} />
                <Route path='/mycommentlist' element={<ProtectedRouter>
                  <MyComments />
                </ProtectedRouter>} />
                <Route path='/dongnea' element={<ProtectedRouter>
                  <Playground />
                </ProtectedRouter>} />
                {/* <Route path='/인기글' element={<PopularPost  />}/>
                <Route path='/왁자지껄' element={<Sooda  />}/> */}
              </Routes> 
            </UserContext.Provider>   
          </ChakraProvider>
        </div>
      </QueryClientProvider>
    </BrowserRouter>

  );
}

export default App;
