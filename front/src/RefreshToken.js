import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
	baseURL : 'https://sessak.store/api/v1/',
	headers: {'Content-Type' : 'application/json'},
	'withCredentials': true,
});

api.interceptors.request.use(
	function (config) {
	  const access_token = Cookies.get("access_token");
  
	  //요청시 AccessToken 계속 보내주기
	  if (access_token) {
		  config.headers.Authorization = `Bearer ${access_token}`;
	  }
  
	//   if (config.headers && token) {
	// 	const { accessToken, refreshToken } = JSON.parse(token);
	// 	config.headers.authorization = `Bearer ${accessToken}`;
	// 	config.headers.refreshToken = `Bearer ${refreshToken}`;
	// 	return config;
	//   }
	  // Do something before request is sent
	//   console.log("request start", config);
		return config
	},
	function (error) {
	  // Do something with request error
	//   console.log("request error", error);
	  return Promise.reject(error);
	}
  );
  
  // Add a response interceptor
  api.interceptors.response.use(
	function (response) {
	  // Any status code that lie within the range of 2xx cause this function to trigger
	  // Do something with response data
	//   console.log("get response", response);
	  return response;
	},
	// error시
	async (error) => {
	  
	  if (error.response?.status === 401) {
		
		  const originalRequest = error.config;
		  const refresh_token = await Cookies.get("refresh_token");
		  // token refresh 요청
		 try{ const res = await api
			.post(
			`users/refresh/`, // token refresh api
			{refresh:refresh_token},
		  );
		 
			// 새로운 토큰 저장
		  // dispatch(userSlice.actions.setAccessToken(data.data.accessToken)); store에 저장
		  const { access: newAccessToken, refresh: newRefreshToken } =
			res.data;
		  await Cookies.set(
			"access_token", newAccessToken,
		  );
		  await Cookies.set('refresh_token', newRefreshToken);

		  originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
		  // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
		  return axios(originalRequest);
		}catch(error){
			Cookies.remove('access_token');
			Cookies.remove('refresh_token');
		} 
		 }

	  // Any status codes that falls outside the range of 2xx cause this function to trigger
	  // Do something with response error
	//   console.log("response error", error);
	  return Promise.reject(error);
	}
  );
  
  export default api;
