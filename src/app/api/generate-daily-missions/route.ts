import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { childName, childAge } = body;

    const prompt = `
Tu es une IA éducative pour enfants.

Génère 3 missions courtes, amusantes et adaptées à un enfant de ${childAge} ans nommé ${childName}.

Les missions doivent :
- être positives
- être simples
- encourager apprentissage, autonomie ou activité physique
- être très courtes

Réponds uniquement en JSON :

{
  "missions": [
    "mission 1",
    "mission 2",
    "mission 3"
  ]
}
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleanedText);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        missions: [
          "📚 Lire 10 minutes",
          "🧹 Ranger sa chambre",
          "🏃 Faire 5 minutes de sport",
        ],
      },
      {
        status: 200,
      }
    );
  }
}