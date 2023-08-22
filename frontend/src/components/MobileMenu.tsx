import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Menu } from "lucide-react";

interface MobileMenuProps {
    email: string | null;
    logout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ email, logout }) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
                <Menu className="dark:text-white" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hi, <span className="font-semibold">{email}</span></DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
                Logout
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MobileMenu