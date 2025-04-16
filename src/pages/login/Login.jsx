import React from "react"
import styled from "styled-components";

import KakaoLogo from '/Kakao.svg';

const Login = () => {
    const KAKAO_AUTH_LINK = `https://kauth.kakao.com/oauth/authorize?client_id=${import.meta.env.VITE_REST_API_KEY}&redirect_uri=${import.meta.env.VITE_REDIRECT_URI}&response_type=code`;

    const loginHandler = () => {
        window.location.href = KAKAO_AUTH_LINK;
    };

    return (
        <Container>
            <LoginContainer>
                <Title>
                    로그인
                </Title>
                <KakaoLoginButton type='button' onClick={loginHandler}>
                    <img src={KakaoLogo} />
                    <LoginBtnText>카카오 로그인</LoginBtnText>
                </KakaoLoginButton>
            </LoginContainer>
        </Container>
    );
}

const Container = styled.div`
    /* 화면 범위 */

    position: relative;

    /* Primary/Light */
    background: #EBFAFB;
    padding: 32px;

    min-height: 950px;
    
`

const LoginContainer = styled.div`
    /* 로그인 창 */

    /* Auto layout */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 48px 32px;
    gap: 40px;

    position: absolute;
    width: 550px;
    height: 392px;
    left: calc(50% - 550px/2);
    top: calc(50% - 392px/2 - 37px);

    background: #FFFFFF;
    /* Shadow/Medium */
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
`

const Title = styled.div`
    margin: 0 auto;
    width: 486px;
    height: 66.39px;

    /* Heading/28px */
    font-weight: 700;
    font-size: 28px;
    line-height: 33px;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;

    color: #000000;
`

const KakaoLoginButton = styled.button`
    cursor: pointer;

    /* 카카오 로그인 */

    /* Auto layout */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    padding: 0px 24px;
    gap: 16px;

    margin: 0 auto;
    width: 290px;
    height: 48px;

    background: #FEE500;
    border-radius: 8px;
    border: none;

`
const LoginBtnText = styled.div`
    /* Label */

    /* Title/20px */
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;

    /* identical to box height */
    display: flex;
    align-items: center;

    color: rgba(0, 0, 0, 0.85);
`

export default Login

