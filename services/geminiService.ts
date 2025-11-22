import { GoogleGenAI, Modality } from "@google/genai";

/**
 * Generates a professional headshot based on an input image and a style prompt.
 * Uses gemini-2.5-flash-image for multimodal editing/generation.
 */
export const generateHeadshotWithGemini = async (
  base64Image: string, 
  promptModifier: string,
  mimeType: string = 'image/jpeg'
): Promise<string> => {
  
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please set process.env.API_KEY.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Core prompt to guide the model to preserve identity while changing style
  const basePrompt = "MANDATORY: Preserve the facial features and identity of the person in the image exactly 1:1. Do not alter the face. Transform the style, clothing, background and lighting to match: ";
  const finalPrompt = `${basePrompt} ${promptModifier}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: finalPrompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
        temperature: 0.4, // Lower temperature to preserve identity
      },
    });

    const parts = response.candidates?.[0]?.content?.parts;
    if (parts && parts.length > 0) {
      // Look for the image part in the response
      for (const part of parts) {
        if (part.inlineData && part.inlineData.data) {
            // Determine mime type of response (usually png or jpeg)
            const responseMimeType = part.inlineData.mimeType || 'image/png';
            return `data:${responseMimeType};base64,${part.inlineData.data}`;
        }
      }
    }

    throw new Error("No image data received from Gemini.");

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Failed to generate headshot.");
  }
};