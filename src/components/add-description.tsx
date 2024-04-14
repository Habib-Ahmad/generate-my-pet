"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Box, Button, Text, TextField } from "@radix-ui/themes";

interface IProps {
  setBreed: Dispatch<SetStateAction<string>>;
  handleNext: () => void;
}

const AddDescription: React.FC<IProps> = ({ handleNext, setBreed }) => {
  const [description, setDescription] = useState("");

  const handleClick = () => {
    if (description) {
      setBreed(description);
      handleNext();
    }
  };

  return (
    <Box>
      <Text as="p" className="mb-2">
        Tell us what kind of pet you have
      </Text>
      <TextField.Root
        radius="large"
        placeholder="e.g. golden retriever"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-16"
      />

      {description && <Button onClick={handleClick}>Next</Button>}
    </Box>
  );
};

export default AddDescription;
