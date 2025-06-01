import styled from "styled-components";

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from "../../api/auth-controller";
import useAuthStore from "../../store/authStore";

import useScroll from "../../hooks/useScroll";

import { getMypage } from "../../api/Member";
import { getTripDetail } from "../../api/Trip-controller";

const MyPage = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const userStr = localStorage.getItem('user');

  const {
    scrollRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useScroll();

  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [follwingCounts, setFollwingCounts] = useState(0);
  const [followerCounts, setFollowerCounts] = useState(0);
  const [tripList, setTripList] = useState([]);
  const [userPostListResponseList, setUserPostListResponseList] = useState([]);
  const [postLikeList, setPostLikeList] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      
      try {
        if (userStr) {
          const userObj = JSON.parse(userStr); // 문자열 -> 객체
          console.log(userObj.memberId);
          const res = await getMypage(userObj.memberId); // 실제 memberId 전달
          //console.log(res);
          const firstJsonStr = res.split('}{')[0] + '}';
          const parsedRes = JSON.parse(firstJsonStr);
          const {
            profileImage,
            nickName,
            email,
            follwingCounts,
            followerCounts,
            tripList,
            userPostListResponseList,
            postLikeList,
          } = parsedRes;

          setNickName(nickName);
          setEmail(email);
          setProfileImage(profileImage);
          setFollwingCounts(follwingCounts);
          setFollowerCounts(followerCounts);
          setTripList(tripList);
          setUserPostListResponseList(userPostListResponseList);
          setPostLikeList(postLikeList);
        } else {
          console.log('user 데이터가 없습니다.');
        }

      } catch (err) {
        console.error('마이페이지 데이터를 불러오는데 실패했습니다.', err);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = async (tripId) => {
    try {
      if (userStr) {
        const userObj = JSON.parse(userStr); // 문자열 -> 객체
        const detail = await getTripDetail(userObj.memberId, tripId);

        const firstJsonStr = detail.split('}{')[0] + '}';
        const parsedRes = JSON.parse(firstJsonStr);
        console.log("여행 상세 정보:", parsedRes);
        navigate(`/mytrip/${userObj.memberId}/${tripId}`, {
          state: {
            tripSaved: parsedRes,
          }
        });
      }
    } catch (error) {
      console.error("일정 상세 조회 실패", error);
    }
  };

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
      <ProfileWrapper>
        <Profile>
          <ProfileImage>
            <img src={profileImage} alt={`${nickName} 프로필 사진`} />
          </ProfileImage>
          <ProfileInfo>
            <h2>{nickName}</h2>
            <p>{email}</p>
            <Counts>
              <span>Following: {follwingCounts}</span>
              <span>Followers: {followerCounts}</span>
            </Counts>
          </ProfileInfo>
        </Profile>
        <NavButton>
          <Button onClick={handleLogout}>로그아웃</Button>
          <Button onClick={handleWithdraw}>회원 탈퇴</Button>
        </NavButton>
      </ProfileWrapper>

      <SectionWrapper>
        <Section>
          <SectionTitle>나의 여행 일정</SectionTitle>
          <ScrollableList
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {tripList?.map(({ tripId, title, mainTourPlace, startDate, endDate }) => (
              <TripItem
                key={tripId}
                onClick={() => handleClick(tripId)}>
                <TripTitle>{title}</TripTitle> ({startDate} ~ {endDate})
                {/* <MainTourPlaces>
                  {mainTourPlace.map((place, idx) => (
                    <div key={idx}>
                      {idx + 1}일차 - {place}
                    </div>
                  ))}
                </MainTourPlaces> */}
              </TripItem>
            ))}
          </ScrollableList>
        </Section>

        <Section>
          <SectionTitle>나의 게시글</SectionTitle>
          <ScrollableList
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {userPostListResponseList.map(({ postId, tripResponse, title, content }) => (
              <TripItem key={postId}>
                <TripTitle>{title}</TripTitle> (연관 여행: {tripResponse.title})
                <p>{content}</p>
              </TripItem>
            ))}
          </ScrollableList>
        </Section>

        <Section>
          <SectionTitle>좋아요 누른 게시글 ID</SectionTitle>
          <ScrollableList
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <p>{(postLikeList || []).map(({ postId }) => postId).join(", ") || "없음"}</p>
          </ScrollableList>
        </Section>
      </SectionWrapper>
    </Container>
  );
}

export default MyPage;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    min-height: 950px;
    padding: 32px 48px ;
    gap: 48px;
    
    /* Primary/Light */
    background: #FEFBEA;
`
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 520px;
  height: 904px;
  gap: 20px;

  background-color: #fff;
  padding: 32px;
  border-radius: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`
const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const ProfileImage = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const ProfileInfo = styled.div`
  & > h2 {
    margin: 0;
  }
  & > p {
    margin: 4px 0;
    color: #555;
  }
`;

const NavButton = styled.div`
  display: flex;
  gap: 16px;
`
const Button = styled.button`
  padding: 0px 24px;
  height: 32px;

  /* Primary/Dark :active */
  background: #BDBDBD;
  border-radius: 8px;
  border: none;

  color:#fff;
`
const Counts = styled.div`
  margin-top: 8px;
  font-size: 14px;
  color: #777;
  & > span {
    margin-right: 15px;
  }
`;
const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  width: 100%;
  min-height: 900px;
`
const ScrollableList = styled.div`
 height: 175px;
  overflow-y: scroll;
  
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;

  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const Section = styled.div`
  background: #FFFF;
  width: 100%;
  height: 280px;
  padding: 16px 32px;
  border-radius: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

`;

const SectionTitle = styled.h3`
  border-bottom: 2px solid #424242;
  padding-bottom: 8px;
`;
const TripTitle = styled.strong`
  font-size: 20px;
  color: #424242;
`
const TripItem = styled.div`
  cursor: pointer;
  padding: 8px 12px;
  border-bottom: 1px solid #ddd;
`;

const PostItem = styled.div`
  padding: 12px 24px;
  border-bottom: 1px solid #ddd;
`;

const MainTourPlaces = styled.div`
  padding: 8px 8px;
  color: #555;
`;
