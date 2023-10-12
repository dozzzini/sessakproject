import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Text,
	Button,
  } from '@chakra-ui/react'
import Location from '../components/Location';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './signup.module.css';
import api from '../RefreshToken';

const SignUp = () => {
	const navigate = useNavigate();
	const [locationInfo, setLocationInfo] = useState(''); // 위치 정보 상태 추가
	const { register, handleSubmit, formState: { errors },
	} = useForm();
	const { isOpen, onOpen, onClose } = useDisclosure()

	const onSubmit = async(data) => {
		const formData = { ...data, location: locationInfo };
		// console.log('signup', formData);

		try{
			const response = await api.post('users/signup/', formData);
			// console.log('서버 전송 성공' , response.data);
			window.alert('회원가입 성공! 로그인해주세요!');
			navigate('/');

		} catch (error) {
			// console.log('서버 전송실패', error);
			// alert('회원가입 실패! 다시 시도해주세요.')
		}
	}

	const handleSave = () => {
		// console.log('1');
		// console.log('location info', locationInfo?.dong || '동 정보 없음');
    onClose(); // 모달 창 닫기
  };
	return(
		<div className={styles.container}>
					
			<div className={styles.wrapper}>
				<div className={styles.box}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.title}>지금우리동네는<p>회원가입</p></div>
					<div><label>이메일</label>
					<input              
				
						type='email'
						name='email' 
						{...register("email", {
							required: '이메일은 필수 입력 항목입니다.',
							pattern: {
							value: /^\S+@\S+$/i,
							message: '올바른 이메일 주소를 입력하세요.',
							},
						})}
					/>
					{errors?.email && <p style={{color: 'red', fontSize:'16px'}}>{errors.email.message}</p>}

					<label >비밀번호</label>
					<input 
						
						type='password'
						name='password'
						{...register("password", {
							required: '비밀번호는 필수 입력 항목입니다.',
							minLength: {
							value: 8,
							message: '비밀번호는 최소 8자 이상이어야 합니다.',
							},
							pattern: {
							value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
							message: '영문, 숫자, 특수기호를 포함한 8자 이상의 비밀번호를 입력하세요.',
							},
						})}
					/>
					{errors?.password && <p style={{color: 'red', fontSize:'16px'}}>{errors.password.message}</p>}
				
					<label >이름</label>
					<input 
						
						type='text'
						name='name'
						{...register("name", {
							required: '이름은 필수 입력 항목입니다.',
							minLength: {
							value: 2,
							message: '이름은 최소 2자 이상이어야 합니다.',
							},
							pattern: {
							value: /^[가-힣a-zA-Z\s]+$|[^\\s]/,
							message: '한글, 영어, 공백만 입력하세요.',
							},
						})}
					/>
					    {errors.name && <p style={{color: 'red', fontSize:'16px'}}>{errors.name.message}</p>}

					<label>위치</label>
					<div>현재 나의 동네: <span className={styles.mylocation}>{locationInfo || '-'}</span></div>
						<div className={styles.btn}
						onClick={onOpen}>위치 인증하기</div>
						<Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
							<ModalOverlay />
							<ModalContent>
							<ModalHeader>지금우리동네 </ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Text fontWeight='bold' mb='1rem'>
								위치 인증
								<Location 
								onLocationUpdate={setLocationInfo}	/>
								</Text>
								{/* <Lorem count={2} /> */}
							</ModalBody>

							<ModalFooter>
								<Button  mr={3} onClick={onClose}>
								Close
								</Button>
								<Button  type='text'
								onClick={handleSave} variant='ghost'>저장하기</Button>
							</ModalFooter>
							</ModalContent>
						</Modal>
						<button 
						className={styles.btn} type='submit'>가입하기</button>
						</div>
			</form>
			</div>
		</div>
	</div>
	)
};

export default SignUp;