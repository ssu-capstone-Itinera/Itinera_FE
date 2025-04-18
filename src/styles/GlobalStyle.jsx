import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
*, *::before, *::after {
  box-sizing : border-box;
}
body {
  margin: 0;
  font-family: 'Pretendard';
  font-style: normal;
}
`;
export default GlobalStyles;
