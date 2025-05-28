import styled from "styled-components";
import useAuthStore from "../../store/authStore";

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/auth-controller';

function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const { login: setUser } = useAuthStore();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const res = await login(form);
            const data = res.data;

            useAuthStore.getState().login(data);

            alert('로그인 성공!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('로그인 실패');
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>
                    로그인
                </Title>
                <InputContainer>
                    <InputTitle> 아이디 </InputTitle>
                    <Input name="username" placeholder="아이디를 입력해주세요" onChange={handleChange} />
                </InputContainer>
                <InputContainer>
                    <InputTitle> 비밀번호 </InputTitle>
                    <Input name="password" type="password" placeholder="영어 대소문자, 특수문자를 포함하여 8자리 이상" onChange={handleChange} />
                </InputContainer>
                <Button onClick={handleLogin}>
                    <BtnText >로그인</BtnText>
                </Button>
            </Wrapper>
        </Container>
    );
}

export default Login;

const Container = styled.div`
    /* 화면 범위 */

    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 200px 0px;
    
    /* Primary/Light */
    background: #EBFAFB;
    
`

const Wrapper = styled.div`
    display: flex;
    padding: 56px 48px;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    flex-shrink: 0;

    background: #FFFFFF;
    /* Shadow/Medium */
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
    border-radius: 16px;
`

const Title = styled.div`
    display: flex;
    height: 66.389px;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;

    color: #000;
    text-align: center;     

    /* Heading/28px */
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

const InputContainer = styled.div`
    display: flex;
    width: 446px;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
`
const Input = styled.input`
    display: flex;
    min-height: 64px;
    padding: 16px;
    justify-content: center;
    align-items: center;
    gap: 16px;
    align-self: stretch;

    border-radius: 16px;
    border: 1px solid var(--Primary-Darker, #12464C);
    background: #FFF;
    font-size: 18px;   /* 원하는 크기 */

    &::placeholder {
        color: var(--gray-500, #9E9E9E);
    }
`

const InputTitle = styled.div`
    color: var(--Primary-Darker, #12464C);
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

const Button = styled.button`
    cursor: pointer;

    display: flex;
    width: 300px;
    height: 48px;
    padding: 0px 24px;
    justify-content: center;
    align-items: center;
    gap: 8px;

    border-radius: 8px;
    border: 1px solid var(--Primary-Darker, #12464C);
    background: var(--Primary-Darker, #12464C);

`
const BtnText = styled.div`
    color: var(--Primary-Light, #EBFAFB);
    text-align: center;

    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

