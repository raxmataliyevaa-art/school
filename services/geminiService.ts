
import { GoogleGenAI } from "@google/genai";

const SCHOOL_CONTEXT = `
Siz 35-sonli umumta'lim maktabining virtual yordamchisiz. Ismingiz "Maktab AI".
Sizning vazifangiz ota-onalar va o'quvchilarga maktab haqidagi ma'lumotlarni berish.
Maktab haqida faktlar:
- Nomi: 35-sonli maktab.
- Shiori: "Bilim - kelajak poydevori".
- Fanlar: Matematika, Fizika, Ona tili, Ingliz tili, Tarix va boshqalar.
- To'garaklar: Shaxmat, Futbol, Rasm chizish, Robototexnika.
- Ish vaqti: 08:00 dan 17:00 gacha.
`;

const getApiKey = () => {
  // Use globalThis to safely check for process.env in browser environments
  const env = (globalThis as any).process?.env || {};
  return env.API_KEY || '';
};

export async function getChatResponse(prompt: string, history: { role: 'user' | 'model', text: string }[]) {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return "Tizimda API kalit sozlanmagan. Iltimos, keyinroq urinib ko'ring.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
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

    return response.text || "Javob olishda muammo yuz berdi.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Xatolik yuz berdi. Aloqa uzilgan bo'lishi mumkin.";
  }
}
