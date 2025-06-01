import React, { useState } from 'react';
import styled from 'styled-components';

const Community = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '제주도 2박 3일 여행 코스 🍊',
      content: '1일차는 함덕해수욕장, 2일차는 우도와 성산일출봉을 다녀왔어요!',
      comments: ['우도 진짜 예쁘죠~', '성산일출봉은 일출이 정말 장관이에요!']
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [commentInputs, setCommentInputs] = useState({});

  const handleAddPost = () => {
    if (!newTitle.trim() || !newContent.trim()) return;

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

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text?.trim()) return;

    const updatedPosts = posts.map((post) =>
      post.id === postId
        ? { ...post, comments: [...post.comments, text] }
        : post
    );
    setPosts(updatedPosts);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  return (
    <Wrapper>
      <ContentArea>
        <Title>커뮤니티</Title>
        <Description>여행 계획을 공유하고 서로 댓글을 남겨보세요!</Description>

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

        <PostList>
          {posts.map((post) => (
            <PostCard key={post.id}>
              <PostTitle>{post.title}</PostTitle>
              <PostContent>{post.content}</PostContent>
              <CommentSection>
                {post.comments.map((comment, idx) => (
                  <Comment key={idx}>💬 {comment}</Comment>
                ))}
                <CommentInput
                  placeholder="댓글을 입력하세요..."
                  value={commentInputs[post.id] || ''}
                  onChange={(e) =>
                    setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                  }
                />
                <CommentButton onClick={() => handleAddComment(post.id)}>
                  댓글 작성
                </CommentButton>
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
  min-height: 100vh; 
  background-color: #EBFAFB;
  display: flex;
  justify-content: center;
  padding: 48px 0;
  box-sizing: border-box;

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

  display: flex;
  flex-direction: column;
  gap: 12px;
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
  align-self: flex-end;
  background-color: #2696A3;
  color: white;
  font-size: 16px;
  padding: 10px 24px;
  border: none;
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: #1E7882;
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
  margin-bottom: 24px;
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

const CommentButton = styled.button`
  margin-top: 8px;
  background-color: #2696A3;
  color: white;
  font-size: 14px;
  padding: 6px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  float: right;

  &:hover {
    background-color: #1E7882;
  }
`;