import axios from "axios";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Signup } from "./Signup";

export function Signin() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const signin = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });
    const jwt = response.data.token;
    localStorage.setItem("token", jwt);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-200">
      <div className="bg-white p-8 rounded-lg shadow-lg min-w-48">
        <Input ref={usernameRef} placeholder="Username" />
        <Input ref={passwordRef} placeholder="Password" />
        <div className="flex justify-center pt-2">
          <Button
            loading={false}
            fullWidth={true}
            variant="primary"
            size="sm"
            text="Sign In"
            onClick={signin}
          />
        </div>
        <div className="flex justify-center pt-2">
        <Button
            loading={false}
            fullWidth={true}
            variant="secondary"
            size="sm"
            text="Sign Up"
            onClick={() => {
              navigate("/signup");
            }} 
          />
        </div>
      </div>
    </div>
  );
}
