import styled from "styled-components";
import useScroll from "../../hooks/useScroll";
import { useEffect } from 'react';

import AttractionIc from "../../assets/icons/AttrantionIc";
import LocationIcon from "../../assets/icons/LocationIcon";
import ClockIc from "../../assets/icons/ClockIc";
import DollarIc from "../../assets/icons/DollarIc";
import PhoneIc from "../../assets/icons/PhoneIc";
import WebIc from "../../assets/icons/WebIc";

import {
    tourattractionTagList,
    subjectiveTagList,
    rescategories,
    cafescategories,
} from '../../contants/tagList';

const tagMap = [
    ...tourattractionTagList.flatMap(group => group.tags),
    ...subjectiveTagList,
    ...rescategories.flatMap(group => group.tags),
    ...cafescategories.flatMap(group => group.tags),
];

const PlaceDetail = ({ detail, loading }) => {
    if (loading) return <Container>로딩 중...</Container>;
    if (!detail) return <Container>데이터 없음</Container>;
    console.log(detail)

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

    const openingHoursList = Array.isArray(detail.openingHours)
        ? detail.openingHours.map((entry, i) => {
            const [day, time] = entry.split(": ");
            return { id: i, day, time };
        })
        : [];

    const selectedValues = [
        ...(Array.isArray(detail.tourattractionTags) ? detail.tourattractionTags : []),
        ...(Array.isArray(detail.subjectiveTags) ? detail.subjectiveTags : []),
        ...(Array.isArray(detail.restaurantType) ? detail.restaurantType : (detail.restaurantType ? [detail.restaurantType] : [])),
        ...(Array.isArray(detail.cafeTags) ? detail.cafeTags : []),
    ];

    const tagData = selectedValues
        .map(value => tagMap.find(tag => tag.value === value))
        .filter(Boolean); 

   // console.log(tagData)


    return (
        <Container
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}>
            <Wrapper>
                <Title>
                    <Name> {detail.name} </Name>
                    <Category> {detail.category == "TOURATTRACTION" ? "관광명소"
                        : (detail.category == "RESTAURANT" ? "식당"
                            : "카페")} </Category>
                </Title>
                <TagWrapper>
                    {tagData.length > 0 ? (
                        tagData.map((tag, index) => (
                            <TagList key={index}>
                                {tag.label}
                            </TagList>
                        ))
                    ) : (
                        <HourText>태그 정보 없음</HourText>
                    )}
                </TagWrapper>
                <RatingWrapper>
                    <RatingText>{detail.rating}</RatingText>
                    <StarsWrapper>
                        {[...Array(5)].map((_, i) => {
                            const diff = detail.rating - i;
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
                <DetailListItem>
                    <LocationIcon />
                    <DetailText> {detail.address}</DetailText>
                </DetailListItem>
                <OpeningHourDetail>
                    <DetailListItem>
                        <ClockIc />
                        <DetailText> 운영시간</DetailText>
                    </DetailListItem>
                    {openingHoursList.length > 0 ? (
                        openingHoursList.map((item) => (
                            <OpeningHourList key={item.id}>
                                <DayText>{item.day}</DayText>
                                <HourText>{item.time}</HourText>
                            </OpeningHourList>
                        ))
                    ) : (
                        <DetailText>운영 시간 정보 없음</DetailText>
                    )}
                </OpeningHourDetail>
                <DetailListItem>
                    <DollarIc />
                    {detail.priceLevel ?
                        <DetailText> {detail.priceLevel}</DetailText>
                        :
                        <DetailText> 가격정보 없음</DetailText>
                    }
                </DetailListItem>
                <DetailListItem>
                    <PhoneIc />
                    {detail.phoneNumber ?
                        <DetailText> {detail.phoneNumber}</DetailText>
                        :
                        <DetailText> 전화번호 정보 없음</DetailText>
                    }
                </DetailListItem>
                <DetailListItem>
                    <WebIc />
                    {detail.webSite ?
                        <DetailText>
                            <a href={detail.webSite} target="_blank" rel="noopener noreferrr" >
                                {detail.webSite}
                            </a>
                        </DetailText>
                        :
                        <DetailText> 웹사이트 정보 없음</DetailText>
                    }

                </DetailListItem>
            </Wrapper>
            <ReviewWrapper>
                <RatingText>리뷰</RatingText>
                {Array.isArray(detail.reviews) && detail.reviews.length > 0 ? (
                    detail.reviews.map((review, index) => (
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
    align-items: flex-start;
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
    align-self: stretch;
`
const Title = styled.div`
    display: flex;
    height: 48px;
    justify-content: center;
    align-items: center;
    gap: 16px;
    align-self: stretch;
    height:fit-content;
`

const Name = styled.div`
    color: var(--Primary-Darker, #12464C);
    /* Heading/32px */
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    height:fit-content;
    width: 350px;
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
    width: fit-content;
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
    padding: 0px 0px 0px 40px;
    align-items: center;
    gap: 30px;
`
const DayText = styled.div`
    color: #12464C;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; /* 160% */  
    width: 52px;
`
const HourText = styled.div`
    color: #12464C;

    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; /* 160% */  
    width: fit-content;
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