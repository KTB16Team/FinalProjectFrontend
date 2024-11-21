import { useState, useEffect, useRef } from "react";
import MenuLogo from "@/assets/imgs/Menu.svg?react";
import { MenuItem } from "@/types/menuForm.ts";

interface DropdownMenuProps {
  menuItems: MenuItem[];
}

export default function VerticalMenu({ menuItems }: DropdownMenuProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false); // 외부 클릭 시 드롭다운 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button onClick={toggleDropdown} className="ml-1">
        <MenuLogo style={{ verticalAlign: "middle" }} />
      </button>
      {dropdownOpen && (
        <div className="absolute right-0 bg-white border rounded shadow-lg p-2 z-50 w-44">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.action();
                setDropdownOpen(false); // 버튼 클릭 시 드롭다운 닫기
              }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
