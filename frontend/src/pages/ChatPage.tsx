import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase-config/firebase";
import { useNavigate } from "react-router-dom";
import ChatWindow from "@/components/ChatWindow";
import Loader from "@/components/Loader";

const ChatPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
        setIsLoading(false);
    }, 1000 * 5);
  })

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if(user) {
            setUser(user)
        } else {
            navigate("/auth");
        }
    })
  });

  return (
    <div className="h-screen flex flex-col items-center gap-5 dark:bg-black px-10 md:px-20 py-10">
        {isLoading ? (
            <div className="mt-52">
                <Loader />
            </div>
        ) : (
            <div className="flex flex-col items-center gap-5 w-full">
                <h1 className="text-4xl dark:text-white font-semibold">
                    Hi, I am ChatX!
                </h1>
                <p className="dark:text-white text-sm md:text-base">
                    You can interact with me in the chat window below
                </p>
                <ChatWindow 
                    userId={user?.uid}
                />
            </div>
        )}
    </div>
  )
}

export default ChatPage