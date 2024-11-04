import {useNavigate} from "react-router-dom";
import GoBackButton from "@/assets/imgs/GoBack.svg?react";

export default function CancelButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div onClick={goBack}>
      <GoBackButton width={20}/>
    </div>
  );
}