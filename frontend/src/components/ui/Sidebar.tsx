import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { Button } from "./Button"; // Adjust if your Button path differs
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { AllIcon } from "../../icons/AllIcon";

interface SidebarProps {
  onSelect: (platform: "Twitter" | "Youtube" | null) => void;
}

export function Sidebar({ onSelect }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/signin");
  }, [navigate]);

  return (
    <div className="h-screen w-64 bg-white fixed left-0 top-0 pl-6 flex flex-col justify-between pb-6">
      {/* Top: Logo + Items */}
      <div>
        <div className="flex text-2xl pt-8 items-center">
          <div className="pr-1 text-indigo-600">
            <Logo />
          </div>
          Brainly
        </div>
        <div className="pt-4 pl-4">
          <SidebarItem text="All" icon={<AllIcon />} onClick={() => onSelect(null)} />
          <SidebarItem text="Twitter" icon={<TwitterIcon />} onClick={() => onSelect("Twitter")} />
          <SidebarItem text="Youtube" icon={<YoutubeIcon />} onClick={() => onSelect("Youtube")} />
        </div>
      </div>

      {/* Bottom: Logout Button */}
      <div className="pl-1">
        <Button
          startIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 
                  2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 
                  002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          }
          variant="secondary"
          onClick={handleLogout}
          text="Logout"
          size="sm"
        />
      </div>
    </div>
  );
}
