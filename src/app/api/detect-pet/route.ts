import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { base64Data } = body;

  const img = base64toUint8Array(base64Data);

  const input = {
    image: img,
    prompt:
      "Tell me what breed of animal this is. Your answer should just be the breed, no other words.",
    max_tokens: 250,
  };

  try {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/unum/uform-gen2-qwen-500m`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      }
    );

    const responseData = await response.json();
    return NextResponse.json(responseData);
  } catch (error) {
    console.log("An error occurred:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

const base64toUint8Array = (base64: string) => {
  base64 = base64.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
  const binaryString = atob(base64);

  // const buffer = Buffer.from(binaryString);
  // return buffer;

  // const len = binaryString.length;
  // const bytes = new Uint8Array(len);
  // for (let i = 0; i < len; i++) {
  //   bytes[i] = binaryString.charCodeAt(i);
  // }
  // return bytes;

  const bytes = [];
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
};
