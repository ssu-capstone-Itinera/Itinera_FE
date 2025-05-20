import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Survey = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Card>
        <Progress />
        <div style={{ textAlign: 'center', marginBottom: '24px', marginTop: '16px' }}>1/3</div>

        <Question>
          <Title>Q. 여행 일자</Title>
          <InputContainer>
            <Start>
              <SubText>시작일</SubText>
              <InputGroup>
                <Input type='text' placeholder="YYYY/MM/DD" />
              </InputGroup>
            </Start>

            <End>
              <SubText>종료일</SubText>
              <Input type='text' placeholder="YYYY/MM/DD" />
            </End>
          </InputContainer>
        </Question>

        <Question>
          <Title>Q. 동행 인원</Title>
          <SubText>본인 포함 몇 명인지</SubText>
          <InputGroup>
            <SmallInput type="number" defaultValue={1} min={1} />
            <div style={{ lineHeight: '42px' }}>명</div>
          </InputGroup>
        </Question>

        <Question>
          <Title>Q. 여행지 - DAY1</Title>
          <Input type="text" defaultValue="용산" />
        </Question>

        <Button onClick={() => navigate('/survey/2')} >다음</Button>
      </Card>
    </Container>
  );
};

export default Survey;

const Container = styled.div`
  background-color: #EBFAFB;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 40px;
  width: 700px;
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
    width: 33%;
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

const Question = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  color: #222;
`;

const SubText = styled.p`
  margin-left: 32px;
  font-size: 18px;
  color: #424242;
  margin-bottom: 16px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #407b80;
  border-radius: 12px;
  flex: 1;
  font-size: 14px;
`;

const SmallInput = styled(Input)`
  width: 60px;
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

`;