import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  const signup = async () => {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
    });
    navigate("/signin");
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
            text="Sign Up"
            onClick={signup}
          />
        </div>
        <div className="flex justify-center pt-2">
        <Button
            loading={false}
            fullWidth={true}
            variant="secondary"
            size="sm"
            text="Sign In"
            onClick={() => {
              navigate("/signin");
            }} 
          />
        </div>
      </div>
    </div>
  );
}
