import styled from "styled-components";

import { useNavigate } from 'react-router-dom';
import { deleteAccount } from "../../api/auth-controller";
import useAuthStore from "../../store/authStore";


function MyPage() {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다');
    navigate('/login');
  };

  const handleWithdraw = async () => {
    const confirmed = window.confirm('정말로 회원 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.');

    if (!confirmed) {
      return; // 사용자가 취소한 경우 아무 작업도 하지 않음
    }
    try {
      await deleteAccount();

      logout();
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/signup');
    } catch (err) {
      console.error(err);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <h2>마이페이지</h2>
      <button onClick={handleLogout}>로그아웃</button>
      <button onClick={handleWithdraw}>회원 탈퇴</button>
    </Container>
  );
}

export default MyPage;

const Container = styled.div`
      /* 화면 범위 */

    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;

    min-height: 950px;
    
    /* Primary/Light */
    background: #FEFBEA;
`
