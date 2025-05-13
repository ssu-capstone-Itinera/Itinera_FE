import React from "react"
import styled from "styled-components";
import useScroll from "../../hooks/useScroll";

import AttractionIc from "../../assets/icons/AttrantionIc";
import LocationIcon from "../../assets/icons/LocationIcon";
import ClockIc from "../../assets/icons/ClockIc";
import DollarIc from "../../assets/icons/DollarIc";
import PhoneIc from "../../assets/icons/PhoneIc";
import WebIc from "../../assets/icons/WebIc";

const PlaceDetail = ({ selectedPlace }) => {
    if (!selectedPlace) return null;
    const {
        scrollRef,
        handleMouseDown,
        handleMouseLeave,
        handleMouseUp,
        handleMouseMove,
    } = useScroll();

    const { place } = selectedPlace;

    const openingHoursList = place.openingHours.map((entry, i) => {
        const [day, time] = entry.split(": ");
        return { id: i, day, time };
    });

    return (
        <Container
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}>
            <Title>
                <Name> {place.name} </Name>
                <Category> {place.category == "TOURATTRACTION" ? "관광명소"
                    : (place.category == "RESTAURANT" ? "식당"
                        : "카페")} </Category>
            </Title>
            <TagWrapper>장소에 붙은 태그 정보</TagWrapper>
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
            <ImageWrapper>
                <ImageInfo src="/images/sample.png" alt="장소 이미지" />
            </ImageWrapper>
            <DetailWrapper>
                <DetailListItem>
                    <LocationIcon />
                    <DetailText> {place.address}</DetailText>
                </DetailListItem>
                <OpeningHourDetail>
                    <DetailListItem>
                        <ClockIc />
                        <DetailText> 운영시간</DetailText>
                    </DetailListItem>
                    {openingHoursList.map((item) => (
                        <OpeningHourList key={item.id}>
                            <HourText>
                                {item.day}
                            </HourText>
                            <HourText>
                                {item.time}
                            </HourText>
                        </OpeningHourList>
                    ))}
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
                    <DetailText> {place.webSite}</DetailText>
                </DetailListItem>
            </DetailWrapper>
            <div>리뷰</div>
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
    justify-content: center;
    align-items: center;
    gap: 32px;
    background: #FFF;

    overflow-y: scroll;

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

const ImageWrapper = styled.div`
    display: flex;
    height: 200px;
    padding: 16px 0px;
    align-items: flex-start;
    gap: 10px;
    align-self: stretch;
`;

const ImageInfo = styled.img`
    border-radius: 8px;
    border: 1px;
`;

const DetailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 8px 0px;
    gap: 16px;
    align-self: stretch;

    border-bottom: 1px solid var(--gray-300, #E0E0E0);
`
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
    padding: 8px 0px;
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
