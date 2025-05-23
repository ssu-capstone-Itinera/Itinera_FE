import styled from "styled-components";
import useScroll from "../../../hooks/useScroll";

import WalkIc from "../../../assets/icons/WalkIc";
import BusIc from "../../../assets/icons/BusIc";
import CarIc from "../../../assets/icons/CarIc";

import ClockIc from "../../../assets/icons/ClockIc";
import LocationIc from "../../../assets/icons/LocationIcon";

const RouteDetail = ({ routes: groupedRoutes }) => {
    console.log(groupedRoutes)
    if (!groupedRoutes) return null;

    const {
        scrollRef,
        handleMouseDown,
        handleMouseLeave,
        handleMouseUp,
        handleMouseMove,
    } = useScroll();

    return (
        <Container
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}>
            <Title> 상세 경로 </Title>

            {groupedRoutes.map((group) => (
                <RouteList key={group.day}>
                    <Date>{group.day}</Date>

                    {group.routes.map((route) => (
                        <RouteItem key={route.id}>
                            <RouteTitle>
                                <TitleText>[{route.origin}]</TitleText>
                                →
                                <TitleText>[{route.destination}]</TitleText>
                                <Totalduration>총 {route.duration?.text}</Totalduration>
                            </RouteTitle>
                            <ProgressBar>
                                {route.steps.map((step, index) => {
                                    const totalDuration = route.steps.reduce((sum, step) => sum + (step.duration?.value || 0), 0);
                                    const percentage = ((step.duration?.value || 0) / totalDuration) * 100;
                                    const backgroundColor =
                                        step.travel_mode === "WALKING"
                                            ? "#E0E0E0"
                                            : step.travel_mode === "TRANSIT"
                                                ? `${route.color}`
                                                : "#000000";
                                    const color =
                                        step.travel_mode === "WALKING"
                                            ? "#000000"
                                            : step.travel_mode === "TRANSIT"
                                                ? "#F5F5F5"
                                                : "#ffffff";

                                    return (
                                        <StepBar
                                            key={index}
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: backgroundColor,
                                                color: color
                                            }}>
                                            {step.duration?.text}
                                        </StepBar>
                                    );
                                })}
                            </ProgressBar>
                            {route.steps.map((step, index) => (
                                <StepList key={index}>
                                    <StepInstructions>
                                        {step.travel_mode === "WALKING"
                                            ? <WalkIc />
                                            : (step.travel_mode === "TRANSIT"
                                                ? <BusIc />
                                                : <CarIc />)}
                                        {step.instructions}
                                    </StepInstructions>
                                    <StepInfo>
                                        <StepInfoText> <strong>[소요 시간]</strong> {step.duration?.text} </StepInfoText>
                                        <StepInfoText> <strong>[이동 거리]</strong> {step.distance?.text} </StepInfoText>
                                    </StepInfo>
                                </StepList>
                            ))}
                        </RouteItem>
                    ))}
                </RouteList>
            ))}
        </Container>
    );
}
export default RouteDetail;

const Container = styled.div`
    display: flex;
    width: 504px;
    height: 885px;
    padding: 24px 32px;
    flex-direction: column;
    gap: 24px;
    background: #FFF;

    overflow-y: scroll;

    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;

    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        display: none;
    }
`

const Title = styled.div`
    color: var(--Primary-Darker, #12464C);

    /* Heading/32px */
    font-size: 32px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`

const Date = styled.div`
    display: flex;
    height: 32px;
    padding: 0px 24px;
    //justify-content: center;
    align-items: center;
    gap: 10px;
    align-self: stretch;
    border-radius: 8px;
    background: var(--Primary-Light, #EBFAFB);

    color: var(--Primary-Darker, #12464C);

    /* Body/20px */
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px; /* 160% */
`
const RouteList = styled.div`
    display: flex;
    flex-direction: column;
    
    align-items: flex-start;
    gap: 32px;
    align-self: stretch;
`
const RouteItem = styled.div`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    padding: 0px 24px;
    gap: 8px;

    //border-bottom: 1px solid #EEEEEE;
`
const RouteTitle = styled.div`
    display: flex;
    height: 32px;
    align-items: center;
    gap: 24px;
    align-self: stretch;
    color: var(--Primary-Darker, #12464C);
`
const TitleText = styled.div`
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 32px; /* 160% */
`
const Totalduration = styled.div`
    color: var(--gray-700, #616161);
    
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
`
const StepList = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0px 8px;

    border-bottom: 1px solid #EEEEEE;
`
const StepInstructions = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    
    color: var(--Primary-Darker, #12464C);

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; /* 160% */
`
const StepInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    padding: 0px 0px 0px 40px ;
    color: var(--Primary-Darker, #12464C);

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 32px; /* 160% */
`
const StepInfoText = styled.div`
    width: 172px;
`
const ProgressBar = styled.div`
    display: flex;
    height: 12px;
    border-radius: 5px;
    overflow: hidden;
    margin: 6px 0 12px;
    background-color: #E0E0E0;
`;

const StepBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    border-radius: 5px;

    font-size: 10px;
`;
