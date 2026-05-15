import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const childName = body.childName || "enfant";
    const childAge = body.childAge || 8;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
Tu es une IA éducative pour enfants.

Crée UNE mission courte et amusante.

Prénom : ${childName}
Âge : ${childAge}

Règles :
- très simple
- positive
- familiale
- sans danger
- une seule phrase
- en français

Exemple :
"Range 5 jouets dans ta chambre."
`,
    });

    return NextResponse.json({
      mission:
        response.text ||
        "Range 5 objets dans ta chambre.",
    });
  } catch (error) {
    return NextResponse.json({
      mission:
        "Aide à mettre la table pendant 5 minutes.",
    });
  }
}