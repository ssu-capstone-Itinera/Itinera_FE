import React from "react"
import styled from "styled-components";

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from "axios"

const Redirection = () => {
    const params = new URL(window.location.href).searchParams
    const code = params.get('code');
    const navigate = useNavigate();

    console.log(code);
    useEffect(() => {
        console.log(import.meta.env.VITE_REDIRECT_URI);

        axios.post(
            `${import.meta.env.VITE_REDIRECT_URI}`,
            {
                "code": `${code}`,
                "providerName": "kakao"
            })
            .then((r) => {
                console.log(r.data);

                // 토큰을 받아서 localStorage같은 곳에 저장하는 코드를x 여기에 쓴다.
                //localStorage.setItem('name', r.data.user_name); // 일단 이름만 저장했다.

                navigate('/');
            });
    }, []);

    return (
        <>
            <div>로그인 중입니다.</div>
        </>
    );
};


export default Redirection

