import {Link} from "react-router-dom";
import styled from "styled-components";

export default function Navbar() {
  return (
    <Nav className="fixed bottom-0 w-full flex flex-row bg-black text-white justify-center">
      <div className="logo w-1/3">
        <Link to="/">홈</Link>
      </div>
      <div className="logo w-1/3">
        <Link to="/">게시판</Link>
      </div>
      <div className="logo w-1/3">
        <Link to="/">내 안건</Link>
      </div>
    </Nav>
  );
}

const Nav = styled.nav`
    height: 10vh;
`