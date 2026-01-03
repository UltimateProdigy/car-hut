import { useState } from "react";
import { ChevronDown, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
import { Icon } from "./icon";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Icon name="logo" size={100} />
            <div className="hidden md:flex items-center gap-2 text-sm">
              <Phone className="w-4 h-4" color="white" />
              <span className="text-white">+75 123 456 789</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-white">
            <NavItem label="Home" hasDropdown />
            <NavItem label="Listings" hasDropdown />
            <NavItem label="Blog" hasDropdown />
            <NavItem label="Pages" hasDropdown />
            <NavItem label="About" />
            <NavItem label="Contact" />
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-gray-800 transition-colors"
            >
              <User className="w-4 h-4" />
              <span>Sign in</span>
            </Button>

            <button
              className="lg:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-500">
            <div className="flex flex-col gap-3">
              <MobileNavItem label="Home" />
              <MobileNavItem label="Listings" />
              <MobileNavItem label="Blog" />
              <MobileNavItem label="Pages" />
              <MobileNavItem label="About" />
              <MobileNavItem label="Contact" />
              <div className="pt-3 border-t border-gray-500">
                <MobileNavItem
                  label="Sign in"
                  icon={<User className="w-4 h-4" />}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavItem({
  label,
  hasDropdown = false,
}: {
  label: string;
  hasDropdown?: boolean;
}) {
  return (
    <button className="px-4 py-2 text-sm font-medium hover:text-gray-200 transition-colors flex items-center gap-1 group">
      {label}
      {hasDropdown && (
        <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
      )}
    </button>
  );
}

function MobileNavItem({
  label,
  icon,
}: {
  label: string;
  icon?: React.ReactNode;
}) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium hover:text-gray-200 transition-colors">
      {icon}
      {label}
    </button>
  );
}
