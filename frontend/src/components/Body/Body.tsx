import styled from "styled-components";
import React from "react";

interface BodyProps {
  children: React.ReactNode; // 외부에서 전달된 요소들을 받기 위한 타입 정의
}

export default function Body({children} : BodyProps) {
  return (
    <Container>
      {children}
    </Container>
  );
};

const Container = styled.div`
    margin-top: 15vh;
    margin-bottom: 10vh;
    width: 100%;
`

