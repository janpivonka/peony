import { useState } from "react";

export default function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Login attempt:", { email, password });
    alert("Pokus o přihlášení odeslán (mock)");
  };

  return { email, password, handleEmail, handlePassword, handleSubmit };
}
