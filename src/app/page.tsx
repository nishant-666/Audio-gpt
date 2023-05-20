"use client";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [output, setOutput] = useState<string>("");

  const getInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    const data = new FormData();
    data.append("file", file);
    data.append("model", "whisper-1");
    data.append("language", "en");

    setFormData(data);
  };

  const doStuff = async () => {
    const res = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setOutput(data.text);
  };
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <input
        onChange={getInput}
        type="file"
        className="file-input w-full max-w-xs"
      />
      <button className="btn btn-primary mt-8" onClick={doStuff}>
        Do Stuff
      </button>

      <p>{output}</p>
    </main>
  );
}
