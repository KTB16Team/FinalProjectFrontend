import {useForm, SubmitHandler} from 'react-hook-form';
import Input from "@/components/SignUp/Input.tsx";
import RequiredInputIcon from "@/components/SignUp/RequiredInputIcon.tsx";
import BottomButton from "@/components/Button/BottomButton.tsx";
import {useState, useEffect} from "react";
import {SignUpForm} from "@/types/signUpForm.ts";
import {signup} from "@/apis/signup.ts";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CancelButton from "@/components/Button/CancelButton.tsx";
import Header from "@/components/Header/Header.tsx";

export default function SignUp() {
  const {register, handleSubmit, formState: {errors}, watch} = useForm<SignUpForm>();
  const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate();

  // 모든 필드를 감시
  const watchFields = watch([
    'email', 'password', 'confirmPassword', 'nickname', 'birth', 'gender'
  ]);

  // 회원가입 요청
  const onSubmit: SubmitHandler<SignUpForm> = data => {

    signup(data)
      .then(() => {
        alert('회원가입이 완료되었습니다.');
        navigate('/login');
      })
      .catch((error) => {
        // 에러 처리
        if (axios.isAxiosError(error)) {
          const response = error.response?.data;

          // validation 에러 처리
          if (error.status === 400) {
            alert(response.reasons);
            return;
          }

          // 서버 응답에서 code를 가져와 처리
          switch (response?.code) {
            case 'COMMON-002':
              alert('요청 파라미터가 잘못되었습니다.');
              break;
            case 'MEMBER-003':
              alert('이메일이 중복되었습니다.');
              break;
            case 'MEMBER-004':
              alert('닉네임이 중복되었습니다.');
              break;
            // 다른 에러 코드 처리
            default:
              alert('회원가입에 실패했습니다. 다시 시도해주세요.');
          }
        } else {
          // 예상치 못한 에러 처리
          alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
        }
      })
  };

  // useEffect를 사용하여 watchFields가 변경될 때마다 isDone 상태 업데이트
  useEffect(() => {
    // 모든 필드가 채워졌는지 확인
    const allFieldsFilled = watchFields.every(field => field !== undefined && field !== '');
    const passwordsMatch = watchFields[1] === watchFields[2]; // password와 confirmPassword가 일치하는지 확인

    setIsDone(allFieldsFilled && passwordsMatch); // 모든 필드가 채워지고 비밀번호가 일치하면 true로 설정
  }, [watchFields]);

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 부분 수정 */}
      <Header title="회원가입" leftButton={<CancelButton/>}
      />

      {/* 메인 컨텐츠 영역 */}
      <div className="pt-48 px-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 이메일 */}
          <Input
            label={"이메일"}
            type="email"
            placeholder={'이메일을 입력해주세요'}
            register={register('email', {required: '이메일을 입력해주세요'})}
            error={errors.email?.message}
            required={true}
          />
          {/* 비밀번호 */}
          <Input
            label="비밀번호"
            type="password"
            placeholder={'비밀번호를 입력해주세요'}
            register={register('password', {
              required: '비밀번호를 입력해주세요',
              minLength: {value: 6, message: '비밀번호를 6자 이상 입력해주세요'}
            })}
            error={errors.password?.message}
            required={true}
          />

          {/* 비밀번호 재입력 */}
          <Input
            label="비밀번호 재입력"
            type="password"
            placeholder={'비밀번호를 다시 입력해주세요'}
            register={register('confirmPassword', {
              required: '비밀번호 재입력을 입력해주세요',
              validate: value =>
                value === watch('password') || '비밀번호가 일치하지 않습니다'
            })}
            error={errors.confirmPassword?.message}
            required={true}
          />

          {/* 닉네임 */}
          <Input
            label="닉네임"
            type="text"
            placeholder={'닉네임을 입력해주세요'}
            register={register('nickname', {required: '닉네임을 입력해주세요'})}
            error={errors.nickname?.message}
            required={true}
          />

          {/* 생년월일 */}
          <Input
            label="생년월일"
            type="date"
            register={register('birth', {required: '생년월일을 입력해주세요'})}
            error={errors.birth?.message}
            required={true}
          />

          {/* 성별 */}
          <div className="mb-6">
            <div className="text-left">
              성별
              <RequiredInputIcon/>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <input type="radio" id="male" value="male" {...register('gender', {required: '성별을 선택해주세요'})} />
                <label htmlFor="male" className="text-gray-700">남성</label>
              </div>
              <div>
                <input type="radio" id="female" value="female" {...register('gender', {required: '성별을 선택해주세요'})} />
                <label htmlFor="female" className="text-gray-700">여성</label>
              </div>
            </div>
            <div className="text-red-600 text-sm text-left">
              {errors.gender && <p>{errors.gender.message}</p>}
            </div>
          </div>
        </form>
      </div>
      <BottomButton
        label="회원 가입"
        disabled={!isDone} // 모든 필드가 채워지고 비밀번호가 일치할 때만 버튼 활성화
        onClick={handleSubmit(onSubmit)}  // 폼 제출
        className = "bg-red-400 text-white text-xl py-4 font-bold w-full pt-6"
      />
    </div>
  );
};
