
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getVerseOfTheDay = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate a beautiful and inspiring Quranic verse (Arabic and English translation) that focuses on hope, patience, or gratitude. Return in JSON format with fields 'arabic', 'translation', and 'reference'.",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            arabic: { type: Type.STRING },
            translation: { type: Type.STRING },
            reference: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Error fetching verse:", error);
    return null;
  }
};

export const explainHadith = async (arabic: string, translation: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a brief spiritual and practical explanation (Sharh) of the following Hadith:
      Arabic: ${arabic}
      Translation: ${translation}
      
      Keep it encouraging and easy for a modern user to understand.`,
    });
    return response.text;
  } catch (error) {
    console.error("Error explaining Hadith:", error);
    return "Unable to load explanation at this time.";
  }
};
