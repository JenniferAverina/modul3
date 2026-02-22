import { useState } from "react";
import { isEmail } from "../utils/isEmail";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { authActions } from "../store/authSlice";
import { useNavigate } from "react-router";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   const userInfo: UserInfo = {
  //     id: "123",
  //     name: "jennie",
  //     email: email || "user@test.com",
  //     role: "user"
  //   };

  //   dispatch(authActions.setUserInfo(userInfo));

  //   navigate("/");
  // };

  const setUserInfo = async () => {
        const getuserInfo = await fetch("http://localhost:5173/api/auth/me", {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
        })
        const data = await getuserInfo.json();
        await dispatch(authActions.setUserInfo(data));
        navigate("/");
    }

  const login = async () => {
    if (!isEmail(email)) {
      alert('Format email salah!');
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.status !== 200) {
        alert('Login Gagal: ' + (data.message || 'Cek email/password anda'));
        return;
      }

      dispatch(authActions.setUserInfo(data.user));
      
      alert('Login Berhasil!');
      navigate('/');
      setUserInfo();
      
    } catch (error) {
      console.error("Fetch error:", error);
      alert('connection gagal');
    }
  }


  return (
    <Container maxWidth="sm">
      <Box sx= {{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}>

        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 3}}>
          <Typography variant="h5" textAlign="center" fontWeight="bold" gutterBottom>
            LOGIN FORUM
          </Typography>
          <TextField fullWidth label="email" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <TextField fullWidth label="password" type="password" margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button fullWidth variant="contained" sx={{ mt: 3}} onClick={login}>Login</Button> 
        </Paper>

      </Box>
    </Container>
    // <div className="login-container">
    //   <div className="login-card">
    //     <h4>Login Forum</h4>
    //     <div className="input-group">
    //       <p>Email</p>
    //       <input
    //         type='text'
    //         value={email}
    //         placeholder="Masukkan email..."
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>
    //     <div className="input-group">
    //       <p>Password</p>
    //       <input
    //         type='password'
    //         value={password}
    //         placeholder="Masukkan password..."
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <button className="btn-login" onClick={login}>Login</button>
    //   </div>
    // </div>
  );
}