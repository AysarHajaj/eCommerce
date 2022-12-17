import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { TextField, FormHelperText } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuth from "../../hooks/useAuth";
import api from "../../api";
import "./style.scss";

const { PUBLIC_URL } = process.env;

const Login = () => {
  const { setAuth, auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPath = location.state?.from?.pathname || location.pathname || "/";
  if (auth?.user && auth?.accessToken) navigate(fromPath, { replace: true });

  const emailRef = useRef();

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

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      setAuth({ user, accessToken });
      setData({ email: "", password: "" });
    } catch (err) {
      if (!err?.response) {
        setError("No Server Response");
      } else {
        setError(err?.response?.data?.error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError("");
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
        <FormHelperText error={!!error}>{error || " "}</FormHelperText>
        <TextField
          id="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          inputRef={emailRef}
          placeholder="Email"
          required
        />

        <TextField
          id="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          type="password"
          placeholder="Password"
          required
        />

        <LoadingButton
          style={{ marginTop: "15px", flexBasis: 'auto' }}
          loading={isLoading}
          disabled={!enableSave}
          type="submit"
        >
          Login
        </LoadingButton>
      </form>
    </section>
  );
};

export default Login;
