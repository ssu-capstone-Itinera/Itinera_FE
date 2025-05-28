import React from 'react'
import styled from 'styled-components';

import Logo from '../assets/icons/Logo.jsx'
import HomeLogo from '../assets/icons/HomeLogo.jsx';
import CommunityIcon from '../assets/icons/CommunityIcon.jsx';
import DayIcon from '../assets/icons/DayIcon.jsx';
import { useNavigate } from 'react-router-dom';


const Header_f = () => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <HeaderLogo>
        <Logo />
        <Title> Itinera </Title>
      </HeaderLogo>

      <ClickContainer>
        <HomeContainer>
          <HomeLogo />
          <Text> 홈 </Text>
        </HomeContainer>

        <Community>
          <DayIcon />
          <Text> 일정 생성 </Text>
        </Community>

        <Community onClick={() => navigate('/community')}>
          <CommunityIcon />
          <Text> 커뮤니티 </Text>
        </Community>

        <LoginContainer>
          <Login> 로그인 </Login>
          <Signup> 회원가입 </Signup>
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
  //padding: 0px 168px;

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

  width: 818px;
  height: 56px;

  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;

`

const HomeContainer = styled.div`
  cursor: pointer;

  /* 버튼 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 24px;
  gap: 8px;

  width: 120px;
  min-width: 120px;
  height: 48px;

  background: #FFFFFF;
  border-radius: 8px;

`

const Text = styled.div`
  color: #12464C;
  font-size: 18px;
    
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
`

const Community = styled.div`
  cursor: pointer;

  /* 버튼 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 24px;
  gap: 8px;

  width: 147px;
  min-width: 120px;
  height: 48px;

  background: #FFFFFF;
  border-radius: 8px;
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

  width: 248px;
  height: 32px;
`
const Login = styled.div`
  cursor: pointer;

  /* 버튼 */

  /* Auto layout */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 24px;
  gap: 8px;

  width: 120px;
  min-width: 120px;
  height: 32px;

  color:#12464C;

  background: #FFFFFF;
  
  /* Primary/Dark :active */
  border: 1px solid #165A62;
  border-radius: 8px;
`

const Signup = styled.div`
  cursor: pointer;

    /* 버튼 */

  /* Auto layout */
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
`