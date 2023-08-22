import { useState, useEffect } from 'react'
import { Button } from './ui/button';
import { Volume2 } from 'lucide-react';

interface TextToSpeechProps {
    text: string;
}

const TextToSpeech: React.FC<TextToSpeechProps> = ({ text }) => {
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
        synth.cancel();
    }

  }, [text])

  const handlePlay = () => {
    const synth = window.speechSynthesis;
    // @ts-expect-error utterance null type error
    synth.speak(utterance);
  }

  return (
    <div>
        <Button onClick={handlePlay} variant="ghost" size="icon" className="flex flex-row justify-center items-center">
            <Volume2 className="dark:text-white"/>
        </Button>
    </div>
  )
}

export default TextToSpeech