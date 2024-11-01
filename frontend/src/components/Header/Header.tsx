import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

type HeaderProps = {
  title: string;
  leftButton?: React.ReactNode;
  rightButton?: React.ReactNode;
};

export default function Header({title, leftButton, rightButton}: HeaderProps) {
  return (
    <Container className="fixed top-0 border-gray-400 flex flex-col-reverse bg-white z-50 shadow-sm">
      <div className="m-3 flex justify-between items-center relative">
        <div className="absolute left-0">
          {leftButton}
        </div>
        <div className="flex-1 text-center">
          <Link className="text-2xl font-light" to="/">{title}</Link>
        </div>
        <div className="absolute right-0">
          {rightButton}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
    height: 15vh;
    width: 100%;
`