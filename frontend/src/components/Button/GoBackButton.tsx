import {useNavigate} from "react-router-dom";
import GoBackLogo from "@/assets/imgs/GoBack.svg?react";

export default function GoBackButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div onClick={goBack}>
      <GoBackLogo width={20}/>
    </div>
  );
}