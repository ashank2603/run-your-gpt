import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { HelpCircle } from "lucide-react";

const HelpWindow = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" size="icon">
            <HelpCircle className="dark:text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:text-white">
        <DialogHeader>
          <DialogTitle>Help</DialogTitle>
        </DialogHeader>
        <DialogDescription>
            <ul className="pl-5 list-disc">
                <li>To interact with the chatbot, use the input box in the chat window.</li>
                <li>Your chat is saved in the backend for future reference.</li>
                <li>Please note that currently a user is limited to only 25 messages with the chatbot. This will be increased in the future.</li>
            </ul>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default HelpWindow;
