import { SignedOut, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import SearchBar from "./SearchBar";

const Topbar = () => {
  const { isAdmin } = useAuthStore();

  return (
    <div
      className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 \
        backdrop-blur-md z-10"
    >
      <div className="flex gap-2 items-center">
        <img src="/swLogo2.png" className="size-10" alt="soundwave-logo" />
        <p className="text-xl font-medium">Soundwave</p>
      </div>

      <div className="flex items-center gap-4 w-1/2 justify-center">
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
    </div>
  );
};

export default Topbar;
