import { useState } from "react";
import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon, Search as SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import SearchBar from "./SearchBar";

const Topbar = () => {
  const { isAdmin } = useAuthStore();
  const [mobileSearch, setMobileSearch] = useState(false);

  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 
      bg-zinc-900/75 backdrop-blur-md z-10"
    >
      {/* Logo */}
      <div className="flex gap-2 items-center flex-shrink-0">
        <img
          src="/swLogo2.png"
          className="size-9 sm:size-10"
          alt="soundwave-logo"
        />
        <p className="text-lg sm:text-xl font-medium">Soundwave</p>
      </div>

      {/* Tablet (≥640px <1024px): chỉ logo + search bar */}
      <div className="hidden sm:flex lg:hidden flex-1 mx-8 justify-center">
        <SearchBar />
      </div>

      {/* Desktop (≥1024px): giữ nguyên code cũ */}
      <div className="hidden lg:flex items-center w-1/2 gap-4  justify-center">
        <SearchBar />
        <div className="flex items-center gap-4">
          {isAdmin && (
            <Link
              to={"/admin"}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              <LayoutDashboardIcon className="size-4 mr-2" />
              Admin Dashboard
            </Link>
          )}

          <SignedOut>
            <SignInOAuthButtons />
          </SignedOut>

          <UserButton />
        </div>
      </div>

      {/* Mobile (<640px): chỉ logo + icon search */}
      <button
        onClick={() => setMobileSearch((s) => !s)}
        className="sm:hidden p-2 rounded-lg hover:bg-zinc-800"
      >
        <SearchIcon className="size-5 text-zinc-300" />
      </button>

      {/* Mobile search overlay */}
      {mobileSearch && (
        <div className="absolute top-full left-0 right-0 p-3 bg-zinc-900 border-t border-zinc-800 sm:hidden">
          <SearchBar />
        </div>
      )}
    </div>
  );
};

export default Topbar;
