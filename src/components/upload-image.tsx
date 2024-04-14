"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { Button, Grid, Text } from "@radix-ui/themes";
import { convertToBase64 } from "@/utils";

interface IProps {
  setBreed: Dispatch<SetStateAction<string>>;
  handleNext: () => void;
}

const UploadImage: React.FC<IProps> = ({ setBreed, handleNext }) => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleButtonClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      if (!e.target) return;

      const file =
        (e.target as HTMLInputElement).files &&
        (e.target as HTMLInputElement).files?.[0];

      if (file) {
        convertToBase64(file, (base64Image: string) => {
          setImg(base64Image);
        });
      }
    };
    input.click();
  };

  const handleImageUpload = async () => {
    setLoading(true);
    const _res = await fetch("/api/detect-pet", {
      method: "POST",
      body: JSON.stringify({ base64Data: img }),
    });
    const response = await _res.json();
    const breed = response.result.description;

    if (breed) {
      setBreed(breed);
      handleNext();
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <>
      <Grid justify="center">
        <Text as="p" className="text-center mb-2">
          Upload an image of your pet
        </Text>

        <Button onClick={handleButtonClick} variant="ghost">
          Browse...
        </Button>

        {img && (
          <>
            <Image
              src={img}
              alt="Uploaded Pet"
              width="0"
              height="0"
              className="w-full h-auto my-5"
            />
            <Button onClick={handleImageUpload}>
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </>
        )}
      </Grid>
    </>
  );
};

export default UploadImage;
