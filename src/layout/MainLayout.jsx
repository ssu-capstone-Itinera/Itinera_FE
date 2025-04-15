import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import styled from 'styled-components';

const MainLayout = () => {
  return (
    <>
      <Header />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
};

export default MainLayout;

const ContentWrapper = styled.div`
  margin: 0 168px;
`;
