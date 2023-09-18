import axios from 'axios';
import styles from './playground.module.css';
import React, { useEffect, useMemo, useState } from 'react';
import BackBtn from '../components/BackBtn';

const {kakao} = window;

const Playground = () => {
	const [map, setMap] = useState(null);  
	const [location, setLocation] = useState("");
	const [savedLocation, setSavedLocation] = useState(null); // 저장된 위치 정보

	// 현재위치 세부조정
	const options = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};
	// 현재 위치 가져오기
	useMemo(() => {
		if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error, options);
		}
	function success(position) {
		setLocation({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude,
		});
			console.log("위치 받기 성공", position);
		}
	function error() {
		setLocation({
			latitude: 33.450701,
			longitude: 126.570667,
		});
			console.log("위치 받기 실패");
		}
	}, [navigator.geolocation.getCurrentPosition]);

 // 카카오지도 API 가져오기
		const kakaoMap = () => {
			const container = document.getElementById("map");
			const options = {
			center: new kakao.maps.LatLng(location.latitude, location.longitude),
			level: 3,
			};
			const mapInstance = new kakao.maps.Map(container, options);

		// 현재 위치에 마커 추가
			const markerPosition = new kakao.maps.LatLng(location.latitude, location.longitude);
			const marker = new kakao.maps.Marker({
				position: markerPosition,
			});
			marker.setMap(mapInstance);
			setMap(mapInstance);
		};

	 // 위치 저장 및 서버로 전송
	const saveLocation = () => {
		if (location) {
		  // 위치 정보를 서버로 전송하는 POST 요청 보내기
			axios.post("/api/save-location", location)
				.then((response) => {
				console.log("위치 저장 서버 성공", response.data);
				setSavedLocation(location); // 저장된 위치 정보 업데이트
				})
				.catch((error) => {
				console.error("위치 정보 저장 오류(서버로)", error);
			});
		}
	};

	// 화면에 랜더링
	useEffect(() => {
		kakaoMap();
		console.log(location);
	}, [location]);
	


	return(
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<div className={styles.back}><BackBtn /></div>
					<div className={styles.title}>우리 동네 인증</div>
				</div>
				
				<div id='map' className={styles.mapBox} >
				</div>
				<button onClick={saveLocation} className={styles.btn}>
				<span>저장하기</span>
				<div className={styles.dot}></div>
				</button>
				{savedLocation && (
				<div className={styles.savedLocation}>
					저장된 위치: 위도 {savedLocation.latitude}, 경도 {savedLocation.longitude}
				</div>
				)}
			</div>
		</div>
	)
	};

export default Playground;

