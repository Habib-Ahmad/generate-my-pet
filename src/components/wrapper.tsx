"use client";
import { useCallback, useEffect, useState } from "react";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { AddDescription, RecordButton, UploadImage } from ".";
import Image from "next/image";
import seed from "@/assets/seed.png";

const Wrapper: React.FC = () => {
  const [step, setStep] = useState(0);
  const [breed, setBreed] = useState("");
  const [recording, setRecording] = useState("");
  const [finalImage, setFinalImage] = useState("");

  const generateImage = useCallback(async () => {
    const payload = {
      prompt: `Generate a ${breed}. Also, the following text should profoundly affect how the result looks: ${recording}`,
    };
    const res = await fetch("/api/generate-image", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const response = await res.json();

    setFinalImage(response);
  }, [breed, recording]);

  useEffect(() => {
    if (breed && recording) {
      generateImage();
    }
  }, [breed, generateImage, recording]);

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <Box>
      {step === 0 && (
        <Flex justify="between" align="start">
          <UploadImage {...{ setBreed, handleNext }} />

          <Text as="p" className="text-2xl">
            Or
          </Text>

          <AddDescription {...{ setBreed, handleNext }} />
        </Flex>
      )}

      {step === 1 && (
        <Box className="text-center grid place-items-center">
          <Heading>Congratulations!</Heading>
          <Text>You have successfully generated a seed!</Text>

          <Image
            src={seed}
            alt="seed"
            className="block m-auto w-40 h-auto my-6"
          />
          <Text className="mb-10">
            Your pet will grow from this seed. However, it needs your help.
            You&apos;ll need to speak to the seed. <br />
            Use the microphone below. Whatever you say to the seed will affect
            how your pet looks. <br /> e.g a fierce warrior
          </Text>

          <RecordButton {...{ setRecording, handleNext }} />
        </Box>
      )}

      {step === 2 && (
        <Image
          src={finalImage}
          alt="final image"
          width={400}
          height={400}
          className="block m-auto rounded-md shadow-md "
        />
      )}
    </Box>
  );
};

export default Wrapper;
