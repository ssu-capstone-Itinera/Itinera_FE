import React from 'react'
import Logo from '../assets/icons/Logo.jsx'
import styled from 'styled-components';
import HomeLogo from '../assets/icons/HomeLogo.jsx';
import CommunityIcon from '../assets/icons/CommunityIcon.jsx';
import DayIcon from '../assets/icons/DayIcon.jsx';

const Header = () => {
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

        <Community>
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

export default Header;

const HeaderContainer = styled.div`
  height: 75px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderLogo = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 175px; //전체 레이아웃으로 추가할 예정
  gap: 44px;
`

const Title = styled.div`
  color: #12464C;
  font-size: 32px;
  font-weight: 700;
`

const ClickContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 24px;
`

const HomeContainer = styled.div`
  width: 138px;
  height: 48px;
  border: 1px solid #12464C;
  border-radius: 16px;
  gap: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const Text = styled.div`
  color: #12464C;
  font-size: 18px;
`

const Community = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap:8px;
  cursor: pointer;
`

const LoginContainer = styled.div`
  width: 219px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  gap:8px;
  margin-right: 175px; //전체 레이아웃으로 추가할 예정
`
const Login = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #12464C;
  border-radius: 16px;
  background-color: #fff;
  color:#12464C;
  cursor: pointer;
`

const Signup = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #12464C;
  border-radius: 16px;
  background-color: #12464C;;
  color:#fff;
  cursor: pointer;
`