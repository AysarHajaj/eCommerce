import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectLogin, setToken } from "./loginSlice";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  OutlinedInput,
  FormControl,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const Login = () => {
  const dispatch = useDispatch();
  const {
    isLoading: loginIsLoading,
    error,
    data: loginData,
  } = useSelector(selectLogin);
  const navigate = useNavigate();
  const [showLoader, setShowLoader] = useState(true);

  const [data, setData] = useState({
    password: "",
    email: "",
  });

  const enableSave = useMemo(() => {
    return data.name !== "" && data.password !== "";
  }, [data]);

  const handleSubmit = () => {
    dispatch(login(data)).then(({ payload }) => {
      if (payload.token) {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (loginData?.token) {
      navigate("/");
    }
  }, [loginData]);
  return showLoader ? (
    <CircularProgress
      style={{
        margin: "auto",
        display: "block",
        maxWidth: "300px",
      }}
    />
  ) : (
    <form>
      <FormControl fullWidth>
        <label>Email</label>
        <TextField
          id="email"
          variant="outlined"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          fullWidth
        />
      </FormControl>

      <FormControl style={{ marginTop: "15px" }} fullWidth>
        <label>Password</label>
        <TextField
          id="password"
          variant="outlined"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          type="password"
          fullWidth
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
          loading={loginIsLoading}
          onClick={handleSubmit}
          disabled={!enableSave}
        >
          Login
        </LoadingButton>
        {error && !loginIsLoading && (
          <FormHelperText
            error
            style={{
              fontSize: "1.2em",
            }}
          >
            {error}
          </FormHelperText>
        )}
      </div>
    </form>
  );
};

export default Login;
