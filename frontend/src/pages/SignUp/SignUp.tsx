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
import Body from "@/components/Body/Body.tsx";
import {useModal} from "@/contexts/ModalContext.tsx";
import {sendSignupEmailCode} from "@/apis/email.ts";
import {SendEmailCodeForm} from "@/types/emailForm.ts";

export default function SignUp() {
  const {register, handleSubmit, formState: {errors}, watch, setValue} = useForm<SignUpForm>();
  const [verificationFieldVisible, setVerificationFieldVisible] = useState(false);
  const navigate = useNavigate();
  const {showModal} = useModal();

  const watchBirth = watch('birth');
  const watchEmail = watch('email');

  // 생년월일 자동 포맷팅 및 유효성 검사
  useEffect(() => {
    if (watchBirth) {
      let formatted = watchBirth.replace(/[^0-9]/g, '');
      if (formatted.length > 4) {
        formatted = formatted.slice(0, 4) + '-' + formatted.slice(4);
      }
      if (formatted.length > 7) {
        formatted = formatted.slice(0, 7) + '-' + formatted.slice(7, 10);
      }

      const [year, month, day] = formatted.split('-').map(Number);
      if (year && (year < 1900 || year > new Date().getFullYear())) {
        setValue('birth', formatted.slice(0, 4));
        return;
      }
      if (month && (month < 1 || month > 12)) {
        setValue('birth', formatted.slice(0, 5));
        return;
      }
      if (day && (day < 1 || day > 31)) {
        setValue('birth', formatted.slice(0, 8));
        return;
      }
      if (formatted !== watchBirth) {
        setValue('birth', formatted);
      }
    }
  }, [watchBirth, setValue]);

  // 이메일 인증 코드 요청
  const handleSendVerificationCode = () => {
    if (!watchEmail) {
      showModal('이메일을 입력해주세요.', () => {});
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(watchEmail)) {
      showModal('유효한 이메일 주소를 입력해주세요.', () => {});
      return;
    }

    const request : SendEmailCodeForm = {
      email: watchEmail,
    }

    // 이메일 인증 코드 요청 API 호출
    sendSignupEmailCode(request)
      .then(() => {
        showModal('인증 코드가 이메일로 전송되었습니다.', () => {});
        setVerificationFieldVisible(true);
      })
      .catch((error) => {
        const response = error.response?.data;

        if (response?.code === 'EMAIL-004') {
          showModal('이미 가입된 이메일입니다.', () => {});
          return;
        }

        showModal('인증 코드 전송에 실패했습니다. 다시 시도해주세요.', () => {});
      });
  };

  const onSubmit: SubmitHandler<SignUpForm> = data => {
    signup(data)
      .then(() => {
        showModal('회원가입이 완료되었습니다.', () => {});
        navigate('/login');
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const response = error.response?.data;
          switch (response?.code) {
            case 'COMMON-002':
              showModal(response.reasons, () => {});
              break;
            case 'MEMBER-003':
              showModal('이메일이 중복되었습니다.', () => {});
              break;
            case 'MEMBER-004':
              showModal('닉네임이 중복되었습니다.', () => {});
              break;
            case 'EMAIL-005':
              showModal('이메일 인증 코드가 일치하지 않습니다.', () => {});
              break;
            default:
              showModal('회원가입에 실패했습니다. 다시 시도해주세요.', () => {});
          }
        } else {
          showModal('네트워크 오류가 발생했습니다. 다시 시도해주세요.', () => {});
        }
      });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header title="회원가입" leftButton={<CancelButton />} />
      <Body>
        <form className="pt-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-2">
            <Input
              label={"이메일"}
              type="email"
              placeholder={'이메일을 입력해주세요'}
              register={register('email', {required: '이메일을 입력해주세요'})}
              error={errors.email?.message}
              required={true}
            />
            <button
              type="button"
              onClick={handleSendVerificationCode}
              className="rounded-lg bg-red-500 text-white px-4 py-2 font-bold hover:bg-red-600"
            >
              인증
            </button>
          </div>

          {verificationFieldVisible && (
            <Input
              label="인증 코드"
              type="text"
              placeholder={'인증 코드를 입력해주세요'}
              register={register('code', {required: '인증 코드를 입력해주세요'})}
              error={errors.code?.message}
              required={true}
            />
          )}

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
            type="text"
            placeholder="YYYY-MM-DD"
            register={register('birth', {
              required: '생년월일을 입력해주세요',
              pattern: {
                value: /^\d{4}-\d{2}-\d{2}$/,
                message: '생년월일은 YYYY-MM-DD 형식으로 입력해주세요 (예: 1999-01-01)'
              }
            })}
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
      </Body>
      <BottomButton
        label="회원 가입"
        onClick={handleSubmit(onSubmit)}
      />
    </div>
  );
};
