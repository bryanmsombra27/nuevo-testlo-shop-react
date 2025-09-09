import { useAuthStore } from "@/auth/store/auth.store";
import CustomLogo from "@/components/custom/CustomLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRef, type FC } from "react";
import { Link, useParams, useSearchParams } from "react-router";

interface CustomHeaderProps {}
const CustomHeader: FC<CustomHeaderProps> = ({}) => {
  const { gender } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchQuery = searchParams.get("query") || "";
  const { logout } = useAuthStore();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key != "Enter") return;
    const query = inputRef.current?.value;
    const newSearchParams = new URLSearchParams();

    if (!query) {
      newSearchParams.delete("query");
    } else {
      newSearchParams.set("query", query);
    }

    setSearchParams(newSearchParams);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <CustomLogo />

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                !gender ? "underline underline-offset-4" : ""
              )}
            >
              Todos
            </Link>
            <Link
              to="/gender/men"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                gender == "men" ? "underline underline-offset-4" : ""
              )}
            >
              Hombres
            </Link>
            <Link
              to="/gender/women"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                gender == "women" ? "underline underline-offset-4" : ""
              )}
            >
              Mujeres
            </Link>
            <Link
              to="gender/kid"
              className={cn(
                `text-sm font-medium transition-colors hover:text-primary`,
                gender == "kid" ? "underline underline-offset-4" : ""
              )}
            >
              Niños
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  placeholder="Buscar productos..."
                  className="pl-9 w-64 h-9 bg-white"
                  onKeyDown={handleSearch}
                  defaultValue={searchQuery}
                />
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/auth/login">
              <Button
                variant="default"
                size={"sm"}
                className="ml-2"
              >
                Login
              </Button>
            </Link>
            <Link to="/admin">
              <Button
                variant="destructive"
                size={"sm"}
                className="ml-2"
              >
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomHeader;
