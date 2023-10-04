import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Category from './Category';


const HeaderBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Giants-Regular';    
    font-size: 40px;
    /* border: 2px solid darkblue; */
    img{
        border-radius: 5px;
    }
     @media screen and (min-width: 414px) and (max-width: 700px){
        img{
            width: 30px;
            height: 50px;

        }
        font-size: 25px;
        }    
`
const Header1 = styled.div`
    background-color: #fcbe32;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    margin-top: 10px;
`
const SearchBox = styled.div`
    width: 50%;
    display: flex;
    justify-content:space-around; 
    align-items: center;

    .plus{
    margin-left: -50px ;
    width: 30px;
    height: 30px;
    color: #004e66;
    &:hover{
        background-color:whitesmoke ;
        border-radius: 5px;
    }
    }
`
const SearchInput = styled.input`
    background-color: whitesmoke;
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    width: 80%;
    height: 35px;
    border: none;
    font-size: 14px;
`
const SearchBtn = styled.div`
    background-color: #fcbe32;
    width: 25px;
    height: 25px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    margin-left: 5px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover{
        background-color: whitesmoke;
    }

`
const SettingBox = styled.div`
    display: flex;
    width: 70px;
    justify-content: space-between;
    position: absolute;
    top: 90px;
    right: 30px;
    
    @media screen and (min-width: 414px) and (max-width: 700px){
        top: 70px;
        right: 30px;
        }
    
`;
const User = styled.button`
    cursor: pointer;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 5px;
    background-color: #fcbe32;

    &:hover{
        background-color: whitesmoke;
    }
    
`;
const Header = () => {
	const navigate = useNavigate();
	const [search, setSearch] = useState('');

    const addEdit = () =>{
        navigate('/edit')
    }

    const searchingBtn = () => {
    };

	return(
		<>
		 <HeaderBox>
                    <img src={process.env.PUBLIC_URL + 'logo.png'} 
                    onClick={(e)=>navigate('/hi')}
                    style={{
                    width:'70px', marginRight:'10px', cursor:'pointer'}}/>
                    <span className='headerBox'>지금 우리 동네는?</span>
                </HeaderBox>
                
                <Header1>
                    <SearchBox>
                    <FontAwesomeIcon className='plus' 
                    icon={faPlus} size='xs' 
                    onClick={addEdit}
                    />
                        <SearchInput
                        
                        placeholder='검색어를 입력하세요.'  />
                        <SearchBtn 
                        onClick={searchingBtn}
                        className='search'>
                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" height={'20px'} aria-hidden="true">
                        <path clipRule="evenodd" fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" />
                        </svg>
                        </SearchBtn>
                    </SearchBox>
                    <SettingBox>
                        <User
                         onClick={() => navigate('/userinfo')}>
                            <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                            </svg>
                        </User>
						<Category   />
						</SettingBox>
						</Header1>
	
		</>
	)
}
export default Header;