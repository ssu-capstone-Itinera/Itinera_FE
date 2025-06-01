import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

import useAuthStore from '../store/authStore.js';

import Logo from '../assets/icons/Logo.jsx'
import HomeLogo from '../assets/icons/HomeLogo.jsx';
import CommunityIcon from '../assets/icons/CommunityIcon.jsx';
import DayIcon from '../assets/icons/DayIcon.jsx';
import { useNavigate } from 'react-router-dom';

const Header_f = ({ padding }) => {
  const user = useAuthStore((state) => state.user);

  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const planPath = [
    '/survey/1', '/survey/2', '/survey/3', '/survey/4',
    '/plan/1', '/plan/2', '/plan/3', '/plan/4'
  ];
  const isPlan = planPath.includes(location.pathname);
  const isCommunity = location.pathname === '/community';

  const isLogin = location.pathname === '/login';
  const isSignup = location.pathname === '/signup';
  const isMypage = location.pathname === '/mypage';

  return (
    <HeaderContainer $padding={padding}>
      <HeaderLogo
        onClick={() => { if (!isHome) navigate('/'); }}
        $active={isHome}>
        <Logo />
        <Title> Itinera </Title>
      </HeaderLogo>

      <ClickContainer>
        <Button
          onClick={() => { if (!isHome) navigate('/'); }}
          $active={isHome}>
          <HomeLogo />
          <Text> 홈 </Text>
        </Button>

        <Button
          onClick={() => { if (!isPlan) navigate('/survey/1'); }}
          $active={isPlan}>
          <DayIcon />
          <Text> 일정 생성 </Text>
        </Button>

        <Button
          // onClick={() => { if (!isCommunity) navigate('/community'); }}
          $active={isCommunity}>
          <CommunityIcon />
          <Text> 커뮤니티 </Text>
        </Button>

        <LoginContainer>
          {user ? (
            <ProfileBtn
              onClick={() => { if (!isMypage) navigate('/mypage'); }}
              $active={isMypage}>
              <img src={user.profileImage || '/default-profile.png'} />
            </ProfileBtn>
          ) : (<>
            <Login
              onClick={() => { if (!isLogin) navigate('/login'); }}
              $active={isLogin}>
              로그인
            </Login>
            <Signup
              onClick={() => { if (!isSignup) navigate('/signup'); }}
              $active={isSignup}>
              회원가입
            </Signup>
          </>)}
          {/* {user ? (
            <>
            <Login> 로그인 </Login>
            <Signup> 회원가입 </Signup>
              
            </>
          ) : (<>
                <ProfileImg src= "/images/sample.png" />
          </>)} */}
        </LoginContainer>

      </ClickContainer>
    </HeaderContainer>
  )
}



export default Header_f;

const HeaderContainer = styled.div`
  /* 헤더 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
   padding: ${(props) => props.$padding || '0px'};

  height: 65px;

  background: #FFFFFF;
  /* Shadow/soft */
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.2);

`

const HeaderLogo = styled.div`
  /* Frame 51 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 32px;
  gap: 32px;

  width: 240px;
  height: 48px; 
`

const Title = styled.div`
  /* Heading/32px */
  font-weight: 700;
  font-size: 32px;
  line-height: 38px;

  /* Primary/Darker */
  color: #12464C;
`

const ClickContainer = styled.div`
  /* Frame 52 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  padding: 0px 32px;
  gap: 32px;

  width: fit-content;
  height: 56px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;

`

const Text = styled.div`
  color: #12464C;
  font-size: 18px;
    
  font-style: normal;
  font-weight: ${(props) => (props.$active ? '700' : '400')};
  font-size: 18px;
  line-height: 21px;
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 24px;
  gap: 8px;

  width: fit-content;
  height: 48px;

  background: #FFFFFF;
  border-radius: 16px;
  border: ${(props) => (props.$active ? '2px solid #165A62' : 'none')};
  cursor: ${(props) => (props.$active ? 'not-allowed' : 'pointer')};

  &:hover {
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.20);
  }

  &:active {
    transform: ${(props) => (props.$active ? 'none' : 'scale(0.97)')};
  }
`

const LoginContainer = styled.div`
  font-size: 16px;

    /* login/signup */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 8px;

  width: fit-content;
  height: 32px;
`
const Login = styled.button`
  /* 버튼 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 24px;
  gap: 8px;

  width: fit-content;
  min-width: 120px;
  height: 32px;

  color:#12464C;

  background: #FFFFFF;
  
  /* Primary/Dark :active */
  border: 2px solid #165A62;
  border-radius: 8px;
  
    cursor: ${(props) => (props.$active ? 'not-allowed' : 'pointer')};

    &:hover {
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.20);
  }

  &:active {
    transform: ${(props) => (props.$active ? 'none' : 'scale(0.97)')};
  }
`

const Signup = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 24px;
  gap: 8px;

  width: 120px;
  min-width: 120px;
  height: 32px;

  /* Primary/Dark :active */
  background: #165A62;
  border-radius: 8px;

  color:#fff;
  cursor: ${(props) => (props.$active ? 'not-allowed' : 'pointer')};

  &:hover {
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.20);
  }

  &:active {
    transform: ${(props) => (props.$active ? 'none' : 'scale(0.97)')};
    
  }
`

const ProfileBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: ${(props) => (props.$active ? '3px solid #165A62' : '2px solid #165A62')};

   overflow: hidden; 

   cursor: ${(props) => (props.$active ? 'not-allowed' : 'pointer')};

    &:hover {
    box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.20);
  }

  &:active {
    transform: ${(props) => (props.$active ? 'none' : 'scale(0.97)')};
  }
`
