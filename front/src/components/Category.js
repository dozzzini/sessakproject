import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import api from "../RefreshToken";
import Cookies from "js-cookie";
import { useCategory } from "../CategoryContext";


const SettingBtn =styled.div`
    /* cursor: pointer; */
    width: 30px;
    height: 30px;
    border: none;
    background-color:wheat;
`;
const Nav = styled.div`
    height: 90vh;
`

// const PageNation = styled.div`
//     margin-top: 50px;
// `;
const NewCategoryItem = styled.input`
    width: 150px;
    height: 30px;
    padding: 5px;
    text-align: center;
    margin-bottom: 10px;
    border: none;
    border-radius: 5px;
    font-size: 14px;

`
const AddCategoryBtn = styled.button`
    cursor: pointer;
    width: 50px;
    height: 40px;
    border: none;
    border-radius: 15px;
    font-size: 16px;
    &:hover{
        background-color: #ff5f2e;
    }
`
const Sidebar = styled.div`
    margin-top: -10px;
    margin-left: -250px;
    display: flex;
    height: 95vh;
    width: 360px;
    /* border: 12px solid purple; */
    /* background-color: #004e66; */
    /* border: 2px solid red; */
    /* cursor: pointer; */
    overflow-x: hidden;
    
    .title{
        font-weight: 100;
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        background-color: #fcbe32;
        width: 250px;
        /* border: 2px solid violet; */
        
    }
  
    .categoryBox{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: start;
        /* align-items: start; */
        border-radius: 0%;
        z-index: 99;
        font-size: 30px;
        /* border: 2px springgreen solid; */
    }
    .categoryItem{
        /* border: 2px solid darkblue; */
        margin-top: 10px;
    }
    @media screen and (min-width: 414px) and (max-width: 700px){

        margin-top: -10px;
        margin-left: -250px;
        display: flex;
        height: 910px;
        width: 310px;
        background-color: #004e66;
        border-radius: 5px;
    }
    div{      
        display: flex;
        flex-direction: column; 
        align-items: center;
        justify-content: center;
        background-color: #fcbe32;
        width: 310px;
    }
    .title{
        display: flex;
        flex-direction: row;
        /* justify-content: start; */
        background-color: #004e66;
        /* border: 2px solid red; */
        color: white;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        span{
            margin:0 auto;
            font-size: 40px;
            font-family: 'Giants-Regular';    

        }
    }
    .categoryBox{
        /* border: 2px solid darkblue; */
        /* height: 800px; */
        /* display: flex; */
        align-items: start;
        border-radius: 0%;
        /* overflow-y: scroll; */
        /* overflow-x: hidden; */
    }
     .categoryItem{
        /* text-decoration: none; */
        text-align: center;
        /* width: 280px; */
        /* background-color: saddlebrown; */
        padding: 8px;
        font-family: 'omyu_pretty';
        font-size: 20px;
        cursor: pointer;
        &:hover{
            background-color: whitesmoke;
            opacity: 0.73;
            color: black;
        }
    }
    .categoryAdd{
        /* margin-left: 7px; */
        margin: 10px auto;
        text-align: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
    }
    .categoryAdd:hover{
        background-color:  #ff5f2e ;
    }
`

const Category = ({ onSelectCategory }) => {
    const [open, setOpen] = useState(true);
    const [newCategory, setNewCategory] = useState(""); // 새 카테고리를 저장할 state 추가
    const [isInputVisible, setInputVisible] = useState(false); // 입력 창의 가시성을 관리하는 state
    const [categories, setCategories] = useState([]); // 기존 카테고리 목록을 저장할 state 추가
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const {id} = useParams();
    const { selectedCategory, setSelectedCategory } = useCategory();
    const location = useLocation();

    useEffect(() => {
        getCategory()
    }, [ ])

    const getCategory = async() => {
        const category = new URLSearchParams(location.search).get('category');
        // console.log(category);
        try{
            // console.log(categories,'categories')
            const response = await api.get(`categories/categorylist/`, {
                params: {category}
            })
            setCategories((prev)=>[...prev,...response.data])
        }catch(error){
            // console.log('카테고리에러', error)
            alert('권한이 없습니다.')
        }
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    }
    // 입력 폼이 열렸을 때 외부 클릭을 감지하여 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
            setOpen(false);
            setInputVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
        }, []);

   
    
    const handleCategoryItemClick = (data) => {
        // 카테고리 항목을 클릭했을 때의 로직 추가
        // 예를 들어, 해당 카테고리 페이지로 이동하도록 설정
        // navigate(`?category=${data.name}`);
        // onSelectCategory(data.name);
        setSelectedCategory(data.name);
        // console.log(data.name)
        navigate(`?category=${data.name}`)
        
    };

    return( 
        
        <SettingBtn onClick={() => {
            setOpen(!open)
        }}>
        {open ?
            <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" height={'28px'} aria-hidden="true" style={{cursor:'pointer'}}>
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" />
            </svg>
            : 
            <Sidebar>
                <Nav className={open ? 'active' : ''}> 
                    <div className='title'>
                        <FontAwesomeIcon 
                        style={{cursor:'pointer'}}
                        icon= {faCircleXmark} 
                        onClick={ () => {
                            setOpen(true); // "X" 버튼을 누르면 사이드바를 열고
                            setInputVisible(false); // 입력 창을 숨김
                        }}
                        />
                        <span style={{fontSize: '30px'}}>카테고리</span>
                    </div>
                    <div className='categoryBox'>
                    {categories?.map((category, index) => (
                    <div
                        key={index}
                        className="categoryItem"
                        onClick={() => {
                        handleCategoryItemClick(category);
                        }}
                    >
                <Link to={`/?category=${category.name}`}>{category.name}</Link>
                </div>
            ))}
            {/* <div style={{width:'260px'}}>
            {!isInputVisible ? (
                <button
                    onClick={(e) =>
                       { e.stopPropagation(); // 이벤트 버블링 막음

                        setInputVisible(true)}}
                    className="categoryAdd"
                >
                +
                </button>
                ) : (
                <div style={{ width:'260px'}}
                ref={inputRef}>
                    <NewCategoryItem
                    type="text"
                    placeholder="새 카테고리"
                    value={newCategory}
                    onChange={(e) =>{
                        setNewCategory(e.target.value)}}
                        onClick={(e) => 
                            e.stopPropagation()}
                    />
                    <AddCategoryBtn onClick={(e) => {
                        e.stopPropagation();
                        addCategory()}}>추가
                    </AddCategoryBtn>
                </div>
                )}
             </div> */}
                    </div>
                </Nav>
            </Sidebar>
        }
        </SettingBtn> 
    );
};

export default Category;