import styled from "styled-components";
import useScroll from "../../hooks/useScroll";
import { useEffect } from 'react';

import AttractionIc from "../../assets/icons/AttrantionIc";
import LocationIcon from "../../assets/icons/LocationIcon";
import ClockIc from "../../assets/icons/ClockIc";
import DollarIc from "../../assets/icons/DollarIc";
import PhoneIc from "../../assets/icons/PhoneIc";
import WebIc from "../../assets/icons/WebIc";

const PlaceDetail = ({ detail, loading }) => {
    if (loading) return <Container>로딩 중...</Container>;
    if (!detail) return <Container>데이터 없음</Container>;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const {
        scrollRef,
        handleMouseDown,
        handleMouseLeave,
        handleMouseUp,
        handleMouseMove,
    } = useScroll();

    const place = detail[0];
    //console.log(place)
    const openingHoursList = Array.isArray(place.openingHours)
        ? place.openingHours.map((entry, i) => {
            const [day, time] = entry.split(": ");
            return { id: i, day, time };
        })
        : []; // 👈 undefined나 string일 경우 빈 배열 처리
    //console.log(openingHoursList)

    const tagList = [
        ...(Array.isArray(place.cafeTags) ? place.cafeTags.filter(tag => tag !== "NONE") : []),
        ...(Array.isArray(place.tourattractionTags) ? place.tourattractionTags.filter(tag => tag !== "NONE") : []),
        ...(Array.isArray(place.subjectiveTags) ? place.subjectiveTags.filter(tag => tag !== "NONE") : []),
        ...(Array.isArray(place.restaurantType) ? place.restaurantType.filter(tag => tag !== "NONE") : []),
    ];


    return (
        <Container
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}>
            <Wrapper>
                <Title>
                    <Name> {place.name} </Name>
                    <Category> {place.category == "TOURATTRACTION" ? "관광명소"
                        : (place.category == "RESTAURANT" ? "식당"
                            : "카페")} </Category>
                </Title>
                <TagWrapper>
                    {tagList.length > 0 ? (
                        tagList.map((tag, index) => (
                            <TagList key={index}>
                                {tag}
                            </TagList>
                        ))
                    ) : (
                        <HourText>태그 정보 없음</HourText>
                    )}
                </TagWrapper>
                <RatingWrapper>
                    <RatingText>{place.rating}</RatingText>
                    <StarsWrapper>
                        {[...Array(5)].map((_, i) => {
                            const diff = place.rating - i;
                            let fill = 0;
                            if (diff >= 1) fill = 100;
                            else if (diff > 0) fill = diff * 100;
                            return (
                                <SingleStar key={i}>
                                    <AttractionIc style={{ color: "#BDBDBD" }} />
                                    <FillMask style={{ width: `${fill}%` }}>
                                        <AttractionIc style={{ color: "#2696A3" }} />
                                    </FillMask>
                                </SingleStar>
                            );
                        })}
                    </StarsWrapper>
                </RatingWrapper>
            </Wrapper>
            <Wrapper>
                <ImageInfo src="/images/sample.png" alt="장소 이미지" />
            </Wrapper>
            <Wrapper>
                <DetailListItem>
                    <LocationIcon />
                    <DetailText> {place.address}</DetailText>
                </DetailListItem>
                <OpeningHourDetail>
                    <DetailListItem>
                        <ClockIc />
                        <DetailText> 운영시간</DetailText>
                    </DetailListItem>
                    {openingHoursList.length > 0 ? (
                        openingHoursList.map((item) => (
                            <OpeningHourList key={item.id}>
                                <HourText>{item.day}</HourText>
                                <HourText>{item.time}</HourText>
                            </OpeningHourList>
                        ))
                    ) : (
                        <HourText>운영 시간 정보 없음</HourText>
                    )}
                </OpeningHourDetail>
                <DetailListItem>
                    <DollarIc />
                    <DetailText> {place.priceLevel}</DetailText>
                </DetailListItem>
                <DetailListItem>
                    <PhoneIc />
                    <DetailText> {place.phoneNumber}</DetailText>
                </DetailListItem>
                <DetailListItem>
                    <WebIc />
                    <DetailText> 
                        <a href={place.webSite} target="_blank" rel="noopener noreferrr" >
                            {place.webSite}
                        </a>
                    </DetailText>
                </DetailListItem>
            </Wrapper>
            <ReviewWrapper>
                <RatingText>리뷰</RatingText>
                {Array.isArray(place.reviews) && place.reviews.length > 0 ? (
                    place.reviews.map((review, index) => (
                        <ReviewList key={index}>
                            <DetailText>{review}</DetailText>
                        </ReviewList>
                    ))
                ) : (
                    <DetailText>리뷰가 없습니다</DetailText>
                )}
            </ReviewWrapper>

        </Container>
    );
}
export default PlaceDetail;

const Container = styled.div`
    display: flex;
    width: 504px;
    height: 885px;
    padding: 24px 32px;
    flex-direction: column;
    gap: 32px;
    background: #FFF;

    overflow-y: auto;

    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;

    -webkit-overflow-scrolling: touch;

    &.active {
        cursor: grabbing;
    }

    &::-webkit-scrollbar {
        display: none;
    }
`
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    flex: 1 0 0;
    align-self: stretch;
`
const Title = styled.div`
    display: flex;
    height: 48px;
    justify-content: center;
    align-items: center;
    gap: 16px;
    align-self: stretch;
`

const Name = styled.div`
    color: var(--Primary-Darker, #12464C);
    /* Heading/32px */
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`
const Category = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 0 0;
    align-self: stretch;
    color: var(--gray-700, #616161);
    /* Body/16px */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`

const TagWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: 16px;
    align-self: stretch;
    flex-wrap: wrap;
`

const RatingWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`

const RatingText = styled.div`
    color: #12464C;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
`
const StarsWrapper = styled.div`
    display: flex;
    position: relative;
    gap: 0;
`;

const SingleStar = styled.div`
    position: relative;
    width: 32px;
    height: 32px;
`;

const FillMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
`;

const ImageInfo = styled.img`
    border-radius: 8px;
    border: 1px;
`;

const DetailListItem = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
`

const DetailText = styled.div`
    color:  #12464C;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; /* 160% */
`
const OpeningHourDetail = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
`
const OpeningHourList = styled.div`
    display: flex;
    padding: 0px 40px;
    align-items: center;
    gap: 30px;
`
const HourText = styled.div`
    color: #12464C;

    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; /* 160% */   
`
const TagList = styled.div`
    display: flex;
    padding: 4px 8px;
    align-items: center;
    gap: 10px;

    border-radius: 8px;
    background: var(--Primary-Light, #EBFAFB);

    color: var(--Primary-Darker, #12464C);

    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
const ReviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    //align-items: flex-start;
    gap: 16px;
    align-self: stretch;
`
const ReviewList = styled.div`
    display: flex;
    padding: 8px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    align-self: stretch;

    
  border-bottom: 1px solid #EEEEEE;
`