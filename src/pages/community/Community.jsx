import React, { useState } from 'react';
import styled from 'styled-components';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '다낭 3박 4일 여행 ✈️',
      content: '첫날은 미케비치, 다음날 바나힐...',
      comments: ['좋은 일정이네요!', '바나힐 정말 가고 싶어요!']
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');

  const handleAddPost = () => {
    if (!newTitle || !newContent) return;

    const newPost = {
      id: posts.length + 1,
      title: newTitle,
      content: newContent,
      comments: []
    };
    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <Wrapper>
      <ContentArea>
        <Title>커뮤니티</Title>
        <Description>다른 사람들의 여행 계획을 참고하고 나만의 일정을 공유해보세요!</Description>

        {/* 게시글 작성 폼 */}
        <FormBox>
          <Input
            placeholder="제목을 입력하세요"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Textarea
            placeholder="내용을 입력하세요"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <PostButton onClick={handleAddPost}>게시하기</PostButton>
        </FormBox>

        {/* 게시글 리스트 */}
        <PostList>
          {posts.map((post) => (
            <PostCard key={post.id}>
              <PostTitle>{post.title}</PostTitle>
              <PostContent>{post.content}</PostContent>
              <CommentSection>
                {post.comments.map((comment, idx) => (
                  <Comment key={idx}>💬 {comment}</Comment>
                ))}
                <CommentInput placeholder="댓글을 입력하세요..." />
              </CommentSection>
            </PostCard>
          ))}
        </PostList>
      </ContentArea>
    </Wrapper>
  );
};

export default Community;

const Wrapper = styled.div`
  width: 100%;
  height: 998px;
  background-color: #EBFAFB;
  display: flex;
  justify-content: center;
  padding: 48px 0;
  box-sizing: border-box;
  overflow-y: auto;
`;

const ContentArea = styled.div`
  width: 100%;
  max-width: 900px;
  padding: 0 24px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #12464C;
  margin-bottom: 8px;
`;

const Description = styled.p`
  font-size: 20px;
  color: #39767D;
  margin-bottom: 32px;
`;

const FormBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  margin-bottom: 32px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 18px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 12px;
  font-size: 18px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const PostButton = styled.button`
  background-color: #165A62;
  color: white;
  font-size: 16px;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  float: right;

  &:hover {
    background-color: #12464C;
  }
`;

const PostList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const PostCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`;

const PostTitle = styled.h2`
  font-size: 24px;
  color: #165A62;
  margin-bottom: 12px;
`;

const PostContent = styled.p`
  font-size: 18px;
  color: #333;
`;

const CommentSection = styled.div`
  margin-top: 16px;
  border-top: 1px solid #ccc;
  padding-top: 12px;
`;

const Comment = styled.p`
  font-size: 16px;
  color: #444;
  margin-bottom: 4px;
`;

const CommentInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #bbb;
  border-radius: 8px;
  margin-top: 8px;
`;