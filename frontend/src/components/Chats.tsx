import { Chat } from "@/types"
import SingleChat from "./SingleChat";

interface ChatsProps {
    chats: Chat[];
}

const Chats: React.FC<ChatsProps> = ({ chats }) => {
  return (
    <div>
        {chats.map((chat) => (
            <SingleChat 
                chat={chat}
                key={chat.id}
            />
        ))}
    </div>
  )
}

export default Chats