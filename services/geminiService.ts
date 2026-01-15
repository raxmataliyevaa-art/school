
import { GoogleGenAI } from "@google/genai";

const SCHOOL_CONTEXT = `
Siz 35-sonli umumta'lim maktabining virtual yordamchisiz. Ismingiz "Maktab AI".
Sizning vazifangiz ota-onalar va o'quvchilarga maktab haqidagi ma'lumotlarni berish.
Maktab haqida faktlar:
- Nomi: 35-sonli maktab.
- Shiori: "Bilim - kelajak poydevori".
- Fanlar: Matematika, Fizika, Ona tili, Ingliz tili, Tarix va boshqalar.
- To'garaklar: Shaxmat, Futbol, Rasm chizish, Robototexnika.
- Manzil: Toshkent shahri, Yunusobod tumani (shartli).
- Ish vaqti: 08:00 dan 17:00 gacha.

Faqat maktabga oid savollarga javob bering. Odob bilan gapiring.
`;

export async function getChatResponse(prompt: string, history: { role: 'user' | 'model', text: string }[]) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: SCHOOL_CONTEXT,
        temperature: 0.7,
      },
    });

    return response.text || "Uzr, hozircha javob bera olmayman.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Texnik nosozlik yuz berdi. Iltimos, keyinroq urinib ko'ring.";
  }
}
