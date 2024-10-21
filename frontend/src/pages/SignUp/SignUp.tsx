import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface SignUpFormData {
  nickname: string;
  username: string;
  password: string;
  email: string;
  confirmEmail: string;
  birthdate: string;
}

const SignUpPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignUpFormData>();
  const [submitted, setSubmitted] = useState(false);
  const onSubmit: SubmitHandler<SignUpFormData> = data => {
    console.log(data);
    setSubmitted(true);
  };

  const email = watch("email");

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      {submitted ? (
        <div className="success-message">Registration Successful!</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>닉네임</label>
            <input
              {...register('nickname', {required: 'Nickname is required'})}
            />
            {errors.nickname && <p>{errors.nickname.message}</p>}
          </div>

          <div>
            <label>아이디</label>
            <input
              {...register('username', {required: 'Username is required'})}
            />
            {errors.username && <p>{errors.username.message}</p>}
          </div>

          <div>
            <label>비밀번호</label>
            <input
              type="password"
              {...register('password', {required: 'Password is required', minLength: 6})}
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div>
            <label>이메일</label>
            <input
              type="email"
              {...register('email', {required: 'Email is required'})}
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <label>Confirm Email</label>
            <input
              type="email"
              {...register('confirmEmail', {
                required: 'Confirming email is required',
                validate: value => value === email || 'Emails do not match',
              })}
            />
            {errors.confirmEmail && <p>{errors.confirmEmail.message}</p>}
          </div>

          <div>
            <label>생년월일</label>
            <input
              type="date"
              {...register('birthdate', {required: 'Birthdate is required'})}
            />
            {errors.birthdate && <p>{errors.birthdate.message}</p>}
          </div>
          <button type="submit"
                  className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
            Dark
          </button>
        </form>
      )}
    </div>
  );
};

export default SignUpPage;