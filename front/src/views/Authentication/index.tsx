import React, { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import './style.css'
import InputBox from 'components/InputBox';
import { SignInRequestDto } from 'apis/request/auth';
import { signInRequest } from 'apis';
import { SignInResponseDto } from 'apis/response/auth';
import { ResponseDto } from 'apis/response';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';

//      component: 인증 화면 컴포넌트       //
export default function Authentication() {

  //    state: 화면 상태    //
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
  //    state: 쿠키 상태    //
  const [cookies, setCookie] = useCookies();

  //    function: 네비게이트 함수    //
  const navigator = useNavigate();

  
  //      component: sign in card 컴포넌트       //
  const SignInCard = () => {

    //    state: 이메일 요소 참조 상태    //
    const emailRef = useRef<HTMLInputElement | null>(null);
    //    state: 이메일 요소 참조 상태    //
    const passwordRef = useRef<HTMLInputElement | null>(null);
    //    state: 이메일 상태    //
    const [email, setEmail] = useState<string>('');
    //    state: 패스워드 상태    //
    const [password, setPassword] = useState<string>('');
    //    state: 패스워드 타입 상태    //
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
    //    state: 패스워드 버튼 아이콘 상태    //
    const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
    //    state: 에러 상태    //
    const [error, setError] = useState<boolean>(false);

    //    function: sign in response 처리 함수    //
    const signInResponse = (responseBody: SignInResponseDto | ResponseDto | null) => {
      if(!responseBody) {
        alert('네트워크 이상입니다.');
        return;
      }
      const {code} = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code === 'VF' || code === 'SF') setError(true);
      if (code !== 'SU') return;

      const {token, expirationTime} = responseBody as SignInResponseDto;
      const now = new Date().getTime();
      const expires = new Date(now + expirationTime * 1000);
      
      setCookie('accessToken', token, {expires, path: MAIN_PATH()});
      navigator(MAIN_PATH());
    }

    //    event handler: 이메일 변경 이벤트 처리    //
    const onEmailChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const {value} = event.target;
      setEmail(value);
    }

    //    event handler: 비밀번호 변경 이벤트 처리    //
    const onPassowrdChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
      setError(false);
      const {value} = event.target;
      setPassword(value);
    }

    //    event handler: 로그인 버튼 클릭 이벤트 처리     //
    const onSignInButtonClickHandler = () => {
      
      const requestBody: SignInRequestDto = {email, password};
      console.log(requestBody)
      signInRequest(requestBody).then(signInResponse);
    }

    //    event handler: 회원가입 링크 버튼 클릭 이벤트 처리     //
    const onSignUpLinkButtonClickHandler = () => {
      setView('sign-up');
    }

    //    event handler: 로그인 링크 버튼 클릭 이벤트 처리     //
    const onSignInLinkButtonClickHandler = () => {
      setView('sign-in');
    }


    //    event handler: 패스워트 버튼 클릭 이벤트 처리     //
    const onPasswordButtonClickHandler = () => {
      if (passwordType === 'text') {
        setPasswordType('password')
        setPasswordButtonIcon('eye-light-off-icon')
      }
      else{
        setPasswordType('text')
        setPasswordButtonIcon('eye-light-on-icon')
      }
    }

    //    event handler: 이메일 인풋 키 다운 이벤트 처리     //
    const onEmailKeyDownHandler = (event: KeyboardEvent) => {
      if(event.key !== 'Enter') return;
      if(!passwordRef.current) return;
      passwordRef.current.focus();
    }

    //    event handler: 비밀번호 인풋 키 다운 이벤트 처리     //
    const onPasswordKeyDownHandler = (event: KeyboardEvent) => {
      if(event.key !== 'Enter') return;      
      onSignInButtonClickHandler();
    }


    //      render: 인증 화면 컴포넌트 렌더링       //
    return(
      <div className='auth-parent'>
        <div className='auth-card'>
          <div className='auth-card-box'>
            <div className='auth-card-top'>
              <div className='auth-card-title-box'>
                <div className='auth-card-title' onClick={onSignInButtonClickHandler}>{'로그인'}</div>
              </div>
              <InputBox ref={emailRef} label='이메일 주소' type='text' placeholder='이메일 주소를 입력해주세요.' error={error} value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler} />
              <InputBox ref={passwordRef} label='패스워드' type={passwordType} placeholder='비밀번호를 입력해주세요.' error={error} value={password} onChange={onPassowrdChangeHandler} onKeyDown={onPasswordKeyDownHandler} icon={passwordButtonIcon} onButtonClick={onPasswordButtonClickHandler} />
            </div>
            <div className='auth-card-bottom'>
              {error &&
              <div className='auth-sign-in-error-box'>
                <div className='auth-sign-in-error-message'>
                  {'이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'}
                </div>
              </div>}
            </div>
          </div>
        </div>
        <div className='auth-oauth-box'>
          <div className='auth-oauth-google'></div>
          <div className='auth-oauth-kakao'></div>
        </div>
        <div className='auth-description-box'>
          <div className='auth-description'>{'아직 계정이 없으신가요?'}<span className='auth-description-link' onClick={onSignUpLinkButtonClickHandler}>{'회원가입'}</span></div>
        </div>
        <div className='bottom-large-full-button' onClick={onSignInButtonClickHandler}>{'로그인'}</div>

      </div>
    );
  };

    //      component: sign up card 컴포넌트       //
    const SignUpCard = () => {

      //    state: 이메일 요소 참조 상태   //
      const emailRef = useRef<HTMLInputElement | null>(null);
      //    state: 패스워드 요소 참조 상태   //
      const passwordRef = useRef<HTMLInputElement | null>(null);
      //    state: 패스워트 확인 요소 참조 상태   //
      const passwordCheckRef = useRef<HTMLInputElement | null>(null);

      //    state: 페이지 번호 상태   //
      const [page, setPage] = useState<1 | 2>(1);
      //    state: 페이지 번호 상태   //
      const [email, setEmail] = useState<string>('');
      //    state: 패스워드 상태    //
      const [password, setPassword] = useState<string>('');
      //    state: 패스워드 확인 상태    //
      const [passwordCheck, setPasswordCheck] = useState<string>('');

      //    state: 패스워트 타입 상태   //
      const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
      //    state: 패스워트 타입 상태   //
      const [passwordCheckType, setPasswordCheckType] = useState<'text' | 'password'>('password');

      //    state: 이메일 에러 상태   //
      const [isEmailError, setEmailError] = useState<boolean>(false);
      //    state: 패스워드 에러 상태   //
      const [isPasswordError, setPasswordError] = useState<boolean>(false);
      //    state: 패스워드 확인 에러 상태   //
      const [isPasswordCheckError, setPasswordCheckError] = useState<boolean>(false);

      //    state: 이메일 에러 메세지 상태    //
      const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
      //    state: 패스워드 에러 메세지 상태    //
      const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
      //    state: 패스워드 확인 에러 메세지 상태    //
      const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');
      
      //    state: 패스워드 버튼 아이콘 상태    //
      const [passwordButtonIcon, setPasswordButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');
      //    state: 패스워드 확인 버튼 아이콘 상태   //
      const [passwordCheckButtonIcon, setPasswordCheckButtonIcon] = useState<'eye-light-off-icon' | 'eye-light-on-icon'>('eye-light-off-icon');

      //    event handler: 이메일 변경 이벤트 처리    //
      const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>)  => {
        const {value} = event.target;
        setEmail(value);
      }
      //    event handler: 패스워드 변경 이벤트 처리    //
      const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>)  => {
        const {value} = event.target;
        setPassword(value);
      }
      //    event handler: 패스워드 확인 변경 이벤트 처리    //
      const onPasswordCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>)  => {
        const {value} = event.target;
        setPasswordCheck(value);
      }
      //    event handler: 패스워드 버튼 클릭 이벤트 처리   //
      const onPasswordButtonClickHandler = () => {
        if(passwordButtonIcon === 'eye-light-off-icon') {
          setPasswordButtonIcon('eye-light-on-icon');
          setPasswordType('text');
        }
        else{
          setPasswordButtonIcon('eye-light-off-icon');
          setPasswordType('password');
        }
      }
      //    event handler: 패스워드 확인 버튼 클릭 이벤트 처리   //
      const onPasswordCheckButtonClickHandler = () => {
        if(passwordCheckButtonIcon === 'eye-light-off-icon') {
          setPasswordCheckButtonIcon('eye-light-on-icon');
          setPasswordCheckType('text');
        }
        else{
          setPasswordCheckButtonIcon('eye-light-off-icon');
          setPasswordCheckType('password');
        }
      }

      //    event handler: 다음 버튼 클릭 이벤트 처리   //
      const onNextButtonClickHandler = () => {
        const emailPattern = /^[a-zA-z0-9]*@([-..]?[a-zA-Z0-9])*.[a-zA-Z]{2,4}$/;   //이메일 정규식 패턴
        const isEmailPattern = emailPattern.test(email);
        if(!isEmailPattern) {
          setEmailError(true);
          setEmailErrorMessage('이메일 주소 포멧이 맞지 않습니다.');
        }

        const isCheckedPassword = password.trim().length >= 8
        if (!isCheckedPassword) {
          setPasswordError(true);
          setPasswordCheckErrorMessage('비밀번호는 8자 이상 입력해주세요.');
        }

        const isEqualPassword = password === passwordCheck;
        if(!isEqualPassword) {
          setPasswordCheckError(true);
          setPasswordCheckErrorMessage('비밀번호가 일치하지 않습니다.');
        }

        console.log(page);  // page 상태가 2로 변경되는지 확인
        // if(!isEmailPattern || !isCheckedPassword || !isEqualPassword) return;

        setPage(2);
      }

      //    event handler: 이메일 키 다운 이벤트 처리   //
      const onEmailKeyDownHandler =(event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        if (!passwordRef.current) return;
        passwordRef.current.focus();
      }
      //    event handler: 패스워드 키 다운 이벤트 처리   //
      const onPasswordKeyDownHandler =(event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        if (!passwordCheckRef.current) return;
        passwordCheckRef.current.focus();
      }
      //    event handler: 패스워드 확인 키 다운 이벤트 처리   //
      const onPasswordCheckKeyDownHandler =(event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        onNextButtonClickHandler();
      }

      //      render: 인증 화면 컴포넌트 렌더링       //
      return(
        <div className='auth-card'>
          <div className='auth-card-box'>
            <div className='auth-card-top'>
              <div className='auth-card-title-box'>
                <div className='auth-card-title'>{'회원가입'}</div>
                <div className='auth-card-page'>{`${page}/2`}</div>
              </div>
                {page === 1 ? (
                  <div>
                    <InputBox ref={emailRef} label='이메일 주소 *' type='text' placeholder='이메일 주소를 입력해주세요.' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage} onKeyDown={onEmailKeyDownHandler}/>
                    <InputBox ref={passwordRef} label='비밀번호 *' type={passwordType} placeholder='비밀번호를 입력해주세요.' value={password} onChange={onPasswordChangeHandler} error={isPasswordError} message={passwordErrorMessage} onKeyDown={onPasswordKeyDownHandler}/>
                    <InputBox ref={passwordCheckRef} label='비밀번호 *' type={passwordCheckType} placeholder='비밀번호를 입력해주세요.' value={passwordCheck} onChange={onPasswordCheckChangeHandler} error={isPasswordCheckError} message={passwordCheckErrorMessage} onKeyDown={onPasswordCheckKeyDownHandler}/>
                  </div>
                ) : (
                  <InputBox ref={emailRef} label='이름*' type='text' placeholder='이름을 입력해주세요.' value={email} onChange={onEmailChangeHandler} error={isEmailError} message={emailErrorMessage} onKeyDown={onEmailKeyDownHandler}/>

                )}
                

              </div> 
            <div className='auth-card-bottom'>

              {page === 1 ? (
                <div className='black-large-full-button' onClick={onNextButtonClickHandler}>{'다음 단계'}</div>
              ) : (
                <div className='black-large-full-button' onClick={onNextButtonClickHandler}>{'가입 완료'}</div>
              )}
              
             
            </div>
          </div>
        </div>
      );
    };

  //      render: 인증 화면 컴포넌트 렌더링       //
  return (
    <div id='auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jumbotron-contents'>
          <div className='auth-logo-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'PowerLifters'}</div>
            </div>
          </div>
        </div>
        {view === 'sign-in' && <SignInCard />}
        {view === 'sign-up' && <SignUpCard />}
      </div>
    </div>
  )
}
