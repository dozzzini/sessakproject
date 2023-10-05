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
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SignUp = () => {
	const navigate = useNavigate();
	const [locationInfo, setLocationInfo] = useState(''); // 위치 정보 상태 추가
	const { register, handleSubmit,  errors  } = useForm();
	const { isOpen, onOpen, onClose } = useDisclosure()

	const onSubmit = async(data) => {
		const formData = { ...data, location: locationInfo };
		console.log('signup', formData);

		try{
			const response = await axios.post('https://port-0-sessak-back2-cgw1f2almhig6l2.sel5.cloudtype.app/api/v1/users/signup/', formData);
			console.log('서버 전송 성공' , response.data);
			window.alert('회원가입 성공! 로그인해주세요!');
			navigate('/');

		} catch (error) {
			console.log('서버 전송실패', error);
		}
	}

	const handleSave = () => {
		console.log('1');
		console.log('location info', locationInfo?.dong || '동 정보 없음');
    onClose(); // 모달 창 닫기
  };
	return(
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h2>회원가입</h2>
				<label>이메일</label>
				<input
					type='email'
					name='email' 
					 {...register("email",{ required: true, pattern: /^\S+@\S+$/i  })} // 중괄호의 위치를 수정해야 합니다.

				/>
				{errors?.email && <p>올바른 이메일 주소를 입력하세요.</p>}

				<label>비밀번호</label>
				<input
					type='password'
					name='password'
					{...register('password', { required: true })}
				/>
				{errors?.password && <p>비밀번호 오류</p>}
			
				<label>이름</label>
				<input 
					type='text'
					name='name'
					{...register('name' , {
						required: true
					})}
				/>
				<label>위치</label>
				<p>현재 나의 동네: {locationInfo || '없음'}</p>
					<Button onClick={onOpen}>위치인증</Button>
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
							
							<Button onClick={handleSave} variant='ghost'>저장하기</Button>
						</ModalFooter>
						</ModalContent>
					</Modal>

			<button type='submit'>가입하기</button>
			</form>
		</div>
	)
};

export default SignUp;