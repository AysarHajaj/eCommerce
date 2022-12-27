import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import useAuth from '../../hooks/useAuth';
import api from '../../api';
import './style.scss';
import publicPaths from '../../routes/publicPaths';

const { PUBLIC_URL } = process.env;

function Login() {
  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from?.pathname || location.pathname || '/';

  if (auth?.user && auth?.accessToken)
    navigate(fromPath !== publicPaths.LOGIN.path ? fromPath : '/', { replace: true });

  const emailRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState({ password: '', email: '' });
  const [showPassword, setShowPassword] = React.useState(false);

  const enableSave = useMemo(() => data.name !== '' && data.password !== '', [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await api.login(data);
      const resData = response?.data?.result;
      const accessToken = resData?.token;
      const user = resData?.user;

      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      setAuth({ user, accessToken });
      setData({ email: '', password: '' });
    } catch (err) {
      if (!err?.response) {
        setError('No Server Response');
      } else {
        setError(err?.response?.data?.result?.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangeInputs = (e) => {
    const property = e.target.name;
    setData({ ...data, [property]: e.target.value });
  };

  useEffect(() => {
    setError('');
  }, [data.email, data.password]);

  useEffect(() => {
    emailRef?.current?.focus();
  }, []);

  return (
    <section className="login-container">
      <div className="login-brand">
        <div className="logo">
          <img alt="" src={`${PUBLIC_URL}/images/eCommerceLogo.png`} />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <FormHelperText error={!!error}>{error || ' '}</FormHelperText>
        <TextField
          id="email"
          name="email"
          value={data.email}
          onChange={handleChangeInputs}
          inputRef={emailRef}
          placeholder="Email"
          required
          margin="dense"
        />

        <FormControl>
          <OutlinedInput
            id="password"
            name="password"
            value={data.password}
            onChange={handleChangeInputs}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            required
            margin="dense"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <LoadingButton
          loadingPosition="start"
          startIcon=" "
          loading={isLoading}
          disabled={!enableSave}
          type="submit"
        >
          Login
        </LoadingButton>
      </form>
    </section>
  );
}

export default Login;
