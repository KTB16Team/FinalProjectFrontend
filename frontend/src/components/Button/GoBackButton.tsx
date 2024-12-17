import {useNavigate} from "react-router-dom";
import GoBackLogo from "@/assets/imgs/GoBack.svg?react";

interface GoBackButtonProps {
  to?: string | number;
}

export default function GoBackButton({to = -1} : GoBackButtonProps) { // `to`는 경로 또는 steps를 받을 수 있음
  const navigate = useNavigate();

  const goBack = () => {
    if (typeof to === 'number') {
      navigate(to);
    } else {
      navigate(to as string);
    }
  }

  return (
    <div onClick={goBack} style={{cursor: 'pointer'}}>
      <GoBackLogo width={20}/>
    </div>
  );
}