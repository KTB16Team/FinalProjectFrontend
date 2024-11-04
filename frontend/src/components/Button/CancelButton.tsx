import {useNavigate} from "react-router-dom";

export default function CancelButton() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div onClick={goBack} className="text-mainColor text-sm font-medium">
      취소
    </div>
  );
}