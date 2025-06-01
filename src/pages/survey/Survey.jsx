import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import styled from 'styled-components';

const Survey = () => {
  const navigate = useNavigate();

  const startRef = useRef();
  const endRef = useRef();

  const isValidDate = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;

    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  };

  const handleNext = () => {
    const startDate = startRef.current.value;
    const endDate = endRef.current.value;

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      alert('올바른 날짜 형식(YYYY-MM-DD)으로 입력해주세요.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const diffTime = end - start;
    const tripDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (tripDays <= 0) {
      alert('종료일은 시작일 이후여야 합니다.');
      return;
    }

    localStorage.setItem('startDate', startDate);
    localStorage.setItem('endDate', endDate);
    localStorage.setItem('tripDays', tripDays);
    // console.log(startDate); //yyyy-mm-dd
    // console.log(endDate); //yyyy-mm-dd
    // console.log(tripDays); //n

    navigate('/survey/2');
  };
  return (
    <Container>
      <Card>
        <div>
          <Progress />
          <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>1/4</div>
        </div>
        <Question>
          <Title>Q. 여행 일자</Title>
          <SubText>주어진 형식에 맞게 여행 일자를 입력해주세요.</SubText>
          <InputContainer>
            <Start>
              <SectionTitle>시작일</SectionTitle>
              <InputGroup>
                <Input type='text' placeholder="YYYY-MM-DD" defaultValue = "2025-06-01" ref={startRef} />
              </InputGroup>
            </Start>

            <End>
              <SectionTitle>종료일</SectionTitle>
              <InputGroup>
                <Input type='text' placeholder="YYYY-MM-DD" defaultValue = "2025-06-01" ref={endRef} />
              </InputGroup>
            </End>
          </InputContainer>
        </Question>

        <Question>
          <Title>Q. 동행 인원</Title>
          <SubText>본인 포함 몇 명인지 적어주세요</SubText>
          <InputGroup>
            <SmallInput type="number" defaultValue={1} min={1} />
            <div style={{ lineHeight: '42px' }}>명</div>
          </InputGroup>
        </Question>
        <Button onClick={handleNext} >다음</Button>
      </Card>
    </Container>
  );
};

export default Survey;

const Container = styled.div`
  background-color: #EBFAFB;

  display: flex;
  flex-direction: column;

  //justify-content: center;
  align-items: center;
  
  padding: 100px 0px;
  min-height: 950px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 48px 56px;
  width: 785px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Progress = styled.div`
  height: 4px;
  width: 100%;
  background: #E0E0E0;
  border-radius: 4px;
  margin-bottom: 24px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    width: 25%;
    background-color: #32C8D9;
    border-radius: 4px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const Start = styled.div`
  display: flex;
  flex-direction: column;
`

const End = styled.div`
  display: flex;
  flex-direction: column;
`
const SectionTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #424242;
  margin-left: 32px;
  margin-bottom: 16px;
`;
const Question = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  color: #222;
`;

const SubText = styled.p`
  font-size: 18px;
  color: #424242;
  margin-left: 32px;
  margin-bottom: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 16px;

  margin-bottom: 24px;
  margin-left: 32px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #407b80;
  border-radius: 12px;
  flex: 1;
  font-family: Pretendard;
  font-size: 14px;
`;

const SmallInput = styled(Input)`
  width: fit-content;
  text-align: center;
`;

const Button = styled.button`
  background-color: #2696A3;
  color: #EBFAFB;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 18px;
  width: 120px;
  cursor: pointer;
`