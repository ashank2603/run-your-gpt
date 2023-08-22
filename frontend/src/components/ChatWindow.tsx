import { Input } from "./ui/input"
import axios from "axios";
import { useState, useEffect } from "react";
import { db } from "@/firebase-config/firebase";
import { collection, query, orderBy, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import Chats from "./Chats";
import { Chat } from "@/types";
import { SendHorizontal, Mic } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "./ui/use-toast";
import ResponseLoader from "./ResponseLoader";
import SpeechToText from "./SpeechToText";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface ChatWindowProps {
    userId: string | undefined;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ userId }) => {
  const [chats, setChats] = useState<Chat[]>([])
  const [messageCount, setMessageCount] = useState<number>(0)
  const [message, setMessage] = useState<string>("");
  const [voiceMessage, setVoiceMessage] = useState<string>("");
  const [cxResponse, setCXResponse] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const chatsCollectionRef = collection(db, "chats");

  const getVoiceInput = (voiceInput: string) => {
    setVoiceMessage(voiceInput);
  }

  const getResponseFromAIModel = async () => {
    try {
        setIsLoading(true)
        const res = await axios.post("http://127.0.0.1:8000/api/response", {
            prompt: message
        })
        // console.log(res.data.response)
        setCXResponse(res.data.response);
        await addDoc(chatsCollectionRef, {
            content: message || voiceMessage,
            createdAt: serverTimestamp(),
            cxResponse,
            userId
        })
    } catch(err) {
        console.log(err)
        toast({
            description: "Something went wrong. Please try again!",
            variant: "destructive"
        })
    }
    finally {
        setIsLoading(false)
    }
  }

  const sendMessage = async () => {
    if(messageCount === 25) {
        toast({
            description: "You have reached your 25 message limit!",
            variant: "destructive"
        })
        return;
    }

    try {
        setIsLoading(true);
        getResponseFromAIModel();
        setMessage("")
        setCXResponse("");
        getChatList()
    } catch(error) {
        toast({
            description: "Something went wrong. Please try again!",
            variant: "destructive"
        })
        console.log(error)
    }
    finally {
        setIsLoading(false);
    }
  }

  const getChatList = async () => {
    try {
        const data = query(chatsCollectionRef, orderBy("createdAt", "asc"));
        onSnapshot(data, (snapshot) => {
            const filteredData = snapshot.docs.map((doc) => ({
                ...doc.data(),
                userId
            }))
            // @ts-expect-error filteredData type mismatch
            setChats(filteredData)
            setMessageCount(filteredData.length)
        })
    } catch (error) {
        console.log(error);
    }
  }

  useEffect(() => {
    getChatList();
  })

//   console.log(isLoading);

  return (
    <div className="w-full h-[70%] md:px-10 md:w-2/3 bg-zinc-300 dark:bg-black rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 shadow-xl border border-black dark:border-gray-100">
        <ScrollArea className="h-[85%] pt-10">
            <Chats chats={chats} />
        </ScrollArea>
        {isLoading && (
            <div>
                <ResponseLoader />
            </div>
        )}
        <div className="px-5 mt-5 md:px-0 flex flex-row gap-2">
            <Input 
                placeholder="Type here..."
                className="dark:text-white"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button variant="ghost" size="icon" disabled={message === ""} onClick={sendMessage}>
                <SendHorizontal className="dark:text-white" />
            </Button>
            <Popover>
                <PopoverTrigger>
                    <Button variant="ghost" size="icon">
                        <Mic className="dark:text-white" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <SpeechToText 
                        getVoiceInput={getVoiceInput}
                    />
                </PopoverContent>
            </Popover>
        </div>
    </div>
  )
}

export default ChatWindow