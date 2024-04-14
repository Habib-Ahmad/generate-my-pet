import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt } = body;

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/bytedance/stable-diffusion-xl-lightning`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_AUTH_TOKEN}`,
        },
        body: JSON.stringify({ prompt }),
      }
    );

    const binary = await response.arrayBuffer();
    const base64Img = Buffer.from(binary).toString("base64");
    const finalImg = "data:image/png;base64," + base64Img;

    return NextResponse.json(finalImg);
  } catch (error) {
    console.log("An error occurred:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
