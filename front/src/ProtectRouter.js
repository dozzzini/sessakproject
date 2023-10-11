import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";


export function ProtectedRouter({ children }) {
	const cookie = Cookies.get('access_token');

  if (!cookie) {
    alert("로그인 후 이용 가능한 서비스입니다.");
    return <Navigate to={'/'} replace />;
  }

  return children;
}