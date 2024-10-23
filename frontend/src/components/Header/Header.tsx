import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Header: React.FC = () => {
  return (
    <Container className="fixed top-0 border-b border-gray-400 h flex flex-col-reverse bg-white">
      <div className="text-2xl m-3 font-semibold">
        <Link to="/">aimo</Link>
      </div>
    </Container>
  );
};

export default Header;

const Container = styled.div`
    height: 15vh;
    width: 100%;
`
