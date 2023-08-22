import ThemeToggle from "./ThemeToggle"
import { Button } from "./ui/button";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase-config/firebase";
import { useNavigate } from "react-router-dom";
import { FirebaseError } from '@firebase/util'
import MobileMenu from "./MobileMenu";
import HelpWindow from "./HelpWindow";

const Header = () => {
  const [email, setEmail] = useState<string | null>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const logout = () => {
    try {
        signOut(auth);
        navigate("/auth");
    } catch(error) {
        if (error instanceof FirebaseError) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if(user) {
            setEmail(user.email);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    })
  }, []);

  return (
    <div className="flex flex-row justify-between dark:bg-black gap-5 px-10 py-5">
        <div>
            <h1 className="text-3xl dark:text-white font-bold">Chat X</h1>
        </div>
        <div className="flex flex-row gap-5">
            {isAuthenticated && (
                <div className="hidden md:flex flex-row gap-5">
                    <h1 className="mt-1.5 dark:text-white">Hi, <span className="font-semibold">{email}</span></h1>
                    <Button onClick={logout}>Logout</Button>
                </div>
            )}
            <HelpWindow />
            <ThemeToggle />
            {
                isAuthenticated && (
                    <div className="block md:hidden">
                        <MobileMenu email={email} logout={logout} />
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Header