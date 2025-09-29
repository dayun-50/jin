import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // ← 맨 위에서 import
import styles from "./Login.module.css";

export default function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = () => {
   
      axios.post("http://10.5.5.9/users", { id, pw })
        .then(resp => {
          if (resp) {
            alert("로그인 성공!");
            // window.location.href = "/board";
          } else {
            setMsg(resp);
          }
        })
        .catch(err => {
          console.error(err);
          setMsg("서버 오류");
        });
    };

  return (
    <div className={styles.container}>
      <div className={styles["login-card"]}>
        <h1>로그인</h1>
        <input type="text" placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} />
        <input type="password" placeholder="비밀번호" value={pw} onChange={(e) => setPw(e.target.value)} />
        <button onClick={handleLogin}>로그인</button>
        {msg && <p className={styles.error}>{msg}</p>}
        <p>
          계정이 없으신가요? <Link to="/register">회원가입</Link>
        </p>
      </div>
    </div>
  );
}
