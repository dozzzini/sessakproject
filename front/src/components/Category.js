import React, { useState } from "react";
import { styled } from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";


const SettingBtn =styled.div`
    /* cursor: pointer; */
    width: 30px;
    height: 30px;
    border: none;
    /* padding-bottom:5px; */
    border-radius: 5px;
    background-color:wheat;
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: center;  */
   
`;

// const PageNation = styled.div`
//     margin-top: 50px;
// `;

const Sidebar = styled.div`
    margin-top: -10px;
    margin-left: -300px;
    display: flex;
    height: 910px;
    width: 360px;
    background-color: #C8E6C9;
    cursor: pointer;

    @media screen and (min-width: 414px)and (max-width: 700px){
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
        background-color: #fcbe32	;
        width: 360px;

    };
    .title{
        display: flex;
        flex-direction: row;
        /* justify-content: start; */
        background-color: #004e66;
        color: white;
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        span{
            margin:0 auto;
            font-size: 40px;
        }
    };
    .categoryBox{
        /* border: 2px solid darkblue; */
        /* height: 800px; */
        /* display: flex; */
        align-items: start;
        border-radius: 0%;

     .categoryItem{
        /* text-decoration: none; */
        padding: 8px;
        font-size: 18px;
        cursor: pointer;
        &:hover{
            background-color: whitesmoke;
            opacity: 0.73;
            color: black;
        }
    };   
    .categoryAdd{
        /* margin-left: 7px; */
        margin: 10px auto;
        text-align: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        cursor: pointer;
    };
    .categoryAdd:hover{
        background-color:  #ff5f2e ;
    }
    }
`;

const Category = () => {
    const [open, setOpen] = useState(true);

    return  (
            
                        
                        <SettingBtn onClick={() => {
                            setOpen(open => !open)
                        }}>
                            {open ?
                             <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" height={'28px'} aria-hidden="true" style={{cursor:'pointer'}}>
                            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" />
                            </svg>
                            : 
                            <Sidebar>
                                <nav className={open ? 'active' : ''}> 
                                <div className='title'>
                                    <FontAwesomeIcon icon= {faCircleXmark} size='xl' />
                                    <span>카테고리</span>
                                </div>
                                <div className='categoryBox'>
                                    <div className='categoryItem'>
                                        인기글 
                                    </div>
                                    <div className='categoryItem'>
                                        왁자지껄
                                    </div>
                                    <div><button className="categoryAdd">+</button></div>
                                </div>
                                </nav>
                                </Sidebar>
                                }
                        </SettingBtn> 
    );
};

export default Category;