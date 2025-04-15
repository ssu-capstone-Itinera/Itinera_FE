import { Outlet } from 'react-router-dom';
import Header_f from '../common/Header_f';
import styled from 'styled-components';

const MainLayout_f = () => {
  return (
    <>
      <Header_f />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
};

export default MainLayout_f;

const ContentWrapper = styled.div`
  //margin: 0 168px;
`;
