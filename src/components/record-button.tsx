"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import Image from "next/image";
import { Box, IconButton, Text } from "@radix-ui/themes";
import { useRecordVoice } from "@/hooks/useRecordVoice";
import microphone from "@/assets/microphone.svg";

interface IProps {
  setRecording: Dispatch<SetStateAction<string>>;
  handleNext: () => void;
}

const RecordButton: React.FC<IProps> = ({ setRecording, handleNext }) => {
  const { recording, startRecording, stopRecording, result } = useRecordVoice();

  useEffect(() => {
    if (result) {
      setRecording(result);
      handleNext();
    }
  }, [handleNext, result, setRecording]);

  return (
    <Box className="grid gap-1">
      <IconButton
        variant="ghost"
        radius="full"
        onMouseDown={startRecording}
        onMouseUp={stopRecording}
        onTouchStart={startRecording}
        onTouchEnd={stopRecording}
      >
        <Image src={microphone} alt="microphone" />
      </IconButton>
      <Text>{recording ? "Recording..." : "Not recording"}</Text>
      {result && <Text>{result}</Text>}
    </Box>
  );
};

export default RecordButton;
