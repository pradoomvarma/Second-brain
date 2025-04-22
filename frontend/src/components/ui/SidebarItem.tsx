import { ReactElement } from "react";

interface SidebarItemProps {
  text: string;
  icon: ReactElement;
  onClick?: () => void;
}

export function SidebarItem({ text, icon, onClick }: SidebarItemProps) {
  return (
    <div
      className="flex text-gray-600 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-100"
      onClick={onClick}
    >
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </div>
  );
}
