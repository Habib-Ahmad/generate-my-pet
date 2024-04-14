import { useEffect, useState, useRef, useCallback } from "react";

export const useRecordVoice = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [recording, setRecording] = useState(false);
  const [result, setResult] = useState("");

  const chunks = useRef<Blob[]>([]);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const generateTextFromSpeech = async (base64Data: any) => {
    const res = await fetch("/api/speech-to-text", {
      method: "POST",
      body: JSON.stringify({ base64Data }),
    });
    const response = await res.json();

    const text = response.result.text;

    if (!text) return;

    setResult(text);
  };

  const blobToBase64 = (blob: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        if (reader.result !== null && typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        } else {
          reject(new Error("reader.result is null or not a string."));
        }
      };
      reader.onerror = reject;
    });
  };

  const initialMediaRecorder = useCallback((stream: MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.onstart = () => {
      chunks.current = [];
    };

    mediaRecorder.ondataavailable = (ev: BlobEvent) => {
      chunks.current.push(ev.data);
    };

    mediaRecorder.onstop = async () => {
      try {
        const audioBlob = new Blob(chunks.current, { type: "audio/mpeg" });
        const base64String = await blobToBase64(audioBlob);

        generateTextFromSpeech(base64String);
      } catch (error) {
        console.error("Error converting blob to base64:", error);
      }
    };

    setMediaRecorder(mediaRecorder);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initialMediaRecorder);
    }
  }, [initialMediaRecorder]);

  return { recording, startRecording, stopRecording, result };
};
