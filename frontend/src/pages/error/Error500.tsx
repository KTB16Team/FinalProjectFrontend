import { useNavigate } from "react-router-dom";

export default function Error500() {
  const navigate = useNavigate();

  const handleGoBackHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">500</h1>
      <p className="text-xl text-gray-700 mb-8">서버에 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</p>
      <button
        onClick={handleGoBackHome}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
}
