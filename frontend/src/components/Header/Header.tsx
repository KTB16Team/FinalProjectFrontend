import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

type HeaderProps = {
  title: string;
  leftButton? : React.ReactNode;
};

export default function Header ({title, leftButton} : HeaderProps) {
  return (
    <Container className="fixed top-0 border-b border-gray-400 flex flex-col-reverse bg-white">
      <div className="m-3">
        <span className="top-1/2">
          {leftButton}
        </span>
        <Link className="text-2xl font-semibold" to="/">{title}</Link>
      </div>
    </Container>
  );
};

const Container = styled.div`
    height: 15vh;
    width: 100%;
`
