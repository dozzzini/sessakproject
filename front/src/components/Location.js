import axios from "axios";
import { useMemo, useState, useEffect } from "react";
import api from "../RefreshToken";
const {kakao} = window;

const Location = ({onLocationUpdate,}) => {
	const [map, setMap] = useState(null);  
	const [location, setLocation] = useState({ latitude: null, longitude: null });
	const [savedLocation, setSavedLocation] = useState(null); // 저장된 위치 정보
	// const mapContainerRef = useRef(null);

	// 현재위치 세부조정
	const options = useMemo(() =>{
		return {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
		}
	}, []) ;
// useMemo사용해서 무한 루프 빠지지않게 함

	// 현재 위치 가져오기
	 useEffect(() => {
		if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(success, error, options);
		}
		function success(position) {
			setLocation({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
			});
				// console.log("위치 받기 성공", position);
			}
		function error() {
			setLocation({
				latitude: 33.450701,
				longitude: 126.570667,
			});
				// console.log("위치 받기 실패");
			}
	}, [onLocationUpdate]);

 // 카카오지도 API 가져오기
	useEffect(() => {
		// 카카오지도 API 가져오기
		const kakaoMap = () => {
		const container = document.getElementById('map');
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
	
		kakaoMap();

	}, [location,]);


	 // 위치 저장 및 서버로 전송
	const saveLocation = async() => {
		if (location) {
			const dong = extractDongFromLocation(location); 
		  // 위치 정보를 서버로 전송하는 POST 요청 보내기
			await api.post("/url", {
				location: location,
				dong: dong,
			},{
				headers: {
					'Content-Type' : 'application/json',
                    'withCredentials': true,
				}
			}
			)
				.then((response) => {				
					window.alert('동네변경 저장성공')

				console.log("위치 저장 서버 성공", response.data);
				setSavedLocation(location); // 저장된 위치 정보 업데이트
				})
				.catch((error) => {
					window.alert('동네변경 저장실패! 다시 시도해주세요')
				console.error("위치 정보 저장 오류(서버로)", error);
			});
		}
	};
	
	// 위치 정보에서 동 정보 추출하는 함수 (예시)
	const extractDongFromLocation = (location) => {
		// 위치 정보에서 동 정보 추출하는 로직 작성
		// 예: location에서 동 정보가 어떤 속성에 저장되어 있다면 해당 속성을 반환
		// 이 예시에서는 location.latitude와 location.longitude를 이용하여 동 정보를 얻는다고 가정
		const latitude = location.latitude;
		const longitude = location.longitude;
		const dong = getReverseGeocode(latitude, longitude);
		return dong;
	};
	// const getDongFromCoordinates = (latitude, longitude) => {
	// 	// 위도와 경도를 이용하여 동 정보를 얻는 로직 작성
	// 	// 이 예시에서는 하드코딩된 예제를 사용
	// 	// 실제로는 위도와 경도를 이용하여 동 정보를 얻는 방법을 사용해야 함
	// 	return "잠원동"; // 예시: 잠원동을 반환
	// };

	// // 화면에 랜더링
	// useEffect(() => {
	// 	kakaoMap();
	// 	console.log(location);
	// }, [location]);

	// Kakao Maps API 라이브러리 로드
	// 위도와 경도로 주소 가져오기
	const getReverseGeocode = (latitude, longitude) => {
		// Kakao Maps API Geocoder 인스턴스 생성
		const geocoder = new kakao.maps.services.Geocoder();
	
		// 좌표를 주소로 변환
		geocoder.coord2Address(longitude, latitude, (result, status) => {
		if (status === kakao.maps.services.Status.OK) {
			// 변환 성공
			const fullAddress = result[0].address.address_name; // 전체 주소
			// console.log("주소:", fullAddress);
			const regex = /(\S+동)/; // "동"으로 끝나는 문자열을 찾는 정규표현식
			//전체 주소에서 동만 추출
			const match = fullAddress.match(regex);

			if (match) {
			  const dongWithNumbers = match[1].trim();
			  const dong = dongWithNumbers.replace(/[0-9-]/g, ''); // 숫자와 하이픈 제거
			//   console.log("동:", dong);
			  onLocationUpdate(dong);
	  
			  // 동 정보를 화면에 표시
			  const dongDiv = document.getElementById('dongDiv');
			  if (dongDiv) {
				dongDiv.textContent = `현재 위치 : ${dong}`;
			  }
		} else {
			// "동"이 없는 경우 '읍'
			const regexEup = /(\S+읍)/;
        	const matchEup = fullAddress.match(regexEup);
			if (matchEup) {
				const eupWithNumbers = matchEup[1].trim();
				const eup = eupWithNumbers.replace(/[0-9-]/g, '');
				// console.log("읍:", eup);
				onLocationUpdate(eup);
				const dongDiv = document.getElementById('dongDiv');
				if (dongDiv) {
				  dongDiv.textContent = `현재 위치 : ${eup}`;
				}
			  } 
			}
		} 
		});
	};
	
	// 위도와 경도를 이용하여 주소 정보 얻기
	getReverseGeocode(location.latitude, location.longitude);
	const refresh = () => {
		window.location.reload();
	}
	return(
		<>
			<div >
				<div id='dongDiv'>현재 우리 동네 :</div>
					<div id='map' ></div>
				{/* {savedLocation && (
				<div>
					저장된 위치: 위도 {savedLocation.latitude}, 경도 {savedLocation.longitude}
				</div>
				)} */}
			</div>
		</>
	)
};

export default Location;

