import React, { useState, useCallback } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { useInput } from '../hooks';

const Signup = () => {
  const [id, onChangeID] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }

      if (!term) {
        return setTermError(true);
      }
    },
    [password, passwordCheck, term]
  );

  const onChangePasswordCheck = useCallback(
    ({ target: { value } }) => {
      setPasswordError(value !== password);
      setPasswordCheck(value);
    },
    [password]
  );
  const onChangeTerm = useCallback(({ target: { value } }) => {
    setTermError(false);
    setTerm(!value);
  }, []);

  return (
    <>
      <Form onSubmit={onSubmit}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" required value={id} onChange={onChangeID} />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input
            name="user-nick"
            required
            value={nick}
            onChange={onChangeNick}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            required
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호 확인</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            required
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
          {passwordError && (
            <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            해당 사이트의 약관에 동의합니다.
          </Checkbox>
          {termError && (
            <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>
          )}
        </div>
        <div>
          <Button type="primary" htmlType="submit">
            가입하기
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Signup;