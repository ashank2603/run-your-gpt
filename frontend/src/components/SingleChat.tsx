import { Chat } from "@/types"
import { Avatar, AvatarFallback } from "./ui/avatar"
import TextToSpeech from "./TextToSpeech"

interface SingleChatProps {
    chat: Chat
}

const SingleChat: React.FC<SingleChatProps> = ({ chat }) => {
  return (
    <div className="flex flex-col gap-5 px-5 mb-5">
        <div className="flex flex-row gap-3 justify-end">
            <div className="flex flex-col bg-blue-500 rounded-3xl px-5 py-2 justify-center">
                <h1 className="dark:text-white text-sm md:text-base">{chat.content}</h1>
            </div>
            <Avatar>
                <AvatarFallback className="bg-gray-800 text-white">YOU</AvatarFallback>
            </Avatar>
        </div>
        <div className="flex flex-row gap-3 justify-start">
            <Avatar>
                <AvatarFallback className="bg-gray-800 text-white">CX</AvatarFallback>
            </Avatar>
            <div className="flex flex-col bg-zinc-400 rounded-3xl px-5 py-2 justify-center">
                <h1 className="dark:text-white text-sm md:text-base">{chat.cxResponse}</h1>
            </div>
            <TextToSpeech text={chat.cxResponse} />
        </div>
    </div>
  )
}

export default SingleChat