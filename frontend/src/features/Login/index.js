import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, FormControl, FormHelperText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "./style.scss";
import useAuth from "../../hooks/useAuth";
import api from '../../api';

const { PUBLIC_URL } = process.env;

const Login = () => {
  const { setAuth } = useAuth();
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from?.pathname || "/";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState({
    password: "",
    email: "",
  });

  const enableSave = useMemo(() => {
    return data.name !== "" && data.password !== "";
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await api.login(data);
      const resData = response?.data;
      const accessToken = resData.data?.token;
      const user = resData.data?.user;

      localStorage.setItem('token', accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      setAuth({ user, accessToken });
      setData({ email: '', password: '' });
      navigate(fromPath, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else if (err.response?.status === 400) {
        setError("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError("");
  }, [data.email, data.password]);

  return (
    <section className="login-container">
      <div className="login-brand">
        <div className="logo">
          <img alt="" src={`${PUBLIC_URL}/images/eCommerceLogo.png`} />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <FormHelperText error={!!error}>{error}</FormHelperText>
        <FormControl fullWidth>
          <TextField
            id="email"
            variant="outlined"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            fullWidth
            inputRef={emailRef}
            autoComplete="off"
            placeholder="Email"
            required
          />
        </FormControl>

        <FormControl style={{ marginTop: "15px" }} fullWidth>
          <TextField
            id="password"
            variant="outlined"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            type="password"
            fullWidth
            autoComplete="off"
            placeholder="Password"
            required
          />
        </FormControl>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <LoadingButton
            style={{ marginTop: "15px" }}
            variant="contained"
            loading={isLoading}
            disabled={!enableSave}
            type="submit"
          >
            Login
          </LoadingButton>
        </div>
      </form>
    </section>
  );
};

export default Login;
