import React, { useState } from "react";
import useLogin from "./useLogin";
import { useNavigation } from "../../hooks/useNavigation";
import "./LoginBase.css";
import "./LoginEffects.css";

export default function Login() {
  const { email, password, handleEmail, handlePassword, handleSubmit } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const { goTo } = useNavigation();

  return (
    <section className="login-section">
      <div className="login-container">

        <h1 className="login-title">Přihlášení</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="email"
            value={email}
            onChange={handleEmail}
            placeholder="např. muj@email.cz"
            required
          />

          <label className="login-label">Heslo</label>
          <div style={{ position: "relative" }}>
            <input
              className="login-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePassword}
              placeholder="********"
              required
            />
            <span className="hide-eye"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button className="button login-button" type="submit">
            Přihlásit se
          </button>
        </form>

        <p className="learn-more">
          Nemáte účet?{" "}
          <a onClick={() => goTo("/register")}>
            Zaregistrovat se
          </a>
        </p>

      </div>
    </section>
  );
}
