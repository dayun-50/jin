import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import styles from "./Register.module.css"; // log 폴더 기준
import axios from "axios";


export default function Register() {
  const { users, setUsers } = useContext(UserContext);

  const [user, setUser] = useState({ id: "", pw: "", name: "", phone: "", email: "" });
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    setMsg("");
    setLoading(true);


      axios.post("http://10.5.5.9/users", user)
        .then(resp => {
          if (resp.data.success) {
            alert("회원가입 완료!");
            setUsers(prev => [...prev, user]);
            window.location.href = "/";
          } else {
            setMsg(resp.data.message);
          }
        })
        .catch(err => {
          console.error(err);
          setMsg("서버 오류");
        })
        .finally(() => setLoading(false));
    };

    return (
    <div className={styles.container}>
  <div className={styles["register-card"]}>
    <h2>회원가입</h2>
    <input type="text" placeholder="아이디" name="id" value={user.id} onChange={handleChange} />
    <input type="password" placeholder="비밀번호" name="pw" value={user.pw} onChange={handleChange} />
    <input type="text" placeholder="이름" name="name" value={user.name} onChange={handleChange} />
    <input type="text" placeholder="전화번호" name="phone" value={user.phone} onChange={handleChange} />
    <input type="email" placeholder="이메일" name="email" value={user.email} onChange={handleChange} />
    <button onClick={handleRegister} disabled={loading}>
      {loading ? "처리중..." : "회원가입"}
    </button>
    {msg && <p className={styles.error}>{msg}</p>}
    <p>
      이미 계정이 있으신가요? <Link to="/">로그인으로 돌아가기</Link>
    </p>
  </div>
</div>

  );
  };

  

