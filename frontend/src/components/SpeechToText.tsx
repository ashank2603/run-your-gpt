import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button } from "./ui/button";

interface SpeechToTextProps {
  getVoiceInput: (voiceInput: string) => void;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ getVoiceInput }) => {
  const [message, setMessage] = useState<string>("");

  //   getVoiceInput(message);

  const commands = [
    {
      command: "reset",
      callback: () => resetTranscript(),
    },
    {
      command: "shut up",
      callback: () => setMessage("I wasn't talking."),
    },
    {
      command: "Hello",
      callback: () => setMessage("Hi there!"),
    },
  ];

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
  } = useSpeechRecognition({ commands });

  useEffect(() => {
    if (finalTranscript !== "") {
      console.log(finalTranscript);
      getVoiceInput(finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-GB",
    });
  };

  return (
    <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
            <span className={cn("font-semibold", 
                listening ? "text-green-500" : "text-red-500"
            )}>
                Listening: {listening ? "ON" : "OFF"}
            </span>
            <div className="flex flex-row gap-5">
                <Button type="button" onClick={resetTranscript}>
                    Reset
                </Button>
                <Button className="bg-green-500 dark:bg-green-500" type="button" onClick={listenContinuously}>
                    Listen
                </Button>
                <Button className="bg-red-500 dark:bg-red-500" type="button" onClick={SpeechRecognition.stopListening}>
                    Stop
                </Button>
            </div>
        </div>
        {transcript !== "" && (
            <p className="font-semibold">Your Input:</p>
        )}
        <div>
            <span>{transcript}</span>
        </div>
    </div>
  );
};

export default SpeechToText;
