// Gemini API service for generating questions

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface GeneratedQuestion {
  question: string;
  options: { letter: string; text: string; correct: boolean }[];
  subject: string;
  topic: string;
  explanation?: string;
}

export interface GenerateRequest {
  apiKey: string;
  subject: string;
  topic?: string;
  count: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  language?: 'marathi' | 'english' | 'hindi';
}

function buildPrompt(req: GenerateRequest): string {
  const lang = req.language || 'marathi';
  const diff = req.difficulty || 'medium';
  const topicPart = req.topic ? ` topic "${req.topic}"` : '';

  return `You are an expert exam question creator for Maharashtra Police Bharti preparation.

Generate exactly ${req.count} multiple choice questions for the subject "${req.subject}"${topicPart}.
Difficulty level: ${diff}.
Language: ${lang} (write questions and options in ${lang}).

For each question, provide:
1. The question text
2. Exactly 4 options (A, B, C, D)
3. Mark which option is correct
4. A brief explanation of the answer
5. A relevant topic/subtopic tag

Respond ONLY with a valid JSON array. No markdown, no code fences, no extra text.

Format:
[
  {
    "question": "question text here",
    "options": [
      {"letter": "A", "text": "option A", "correct": false},
      {"letter": "B", "text": "option B", "correct": true},
      {"letter": "C", "text": "option C", "correct": false},
      {"letter": "D", "text": "option D", "correct": false}
    ],
    "subject": "${req.subject}",
    "topic": "subtopic name",
    "explanation": "brief explanation"
  }
]`;
}

export async function generateQuestions(req: GenerateRequest): Promise<GeneratedQuestion[]> {
  const prompt = buildPrompt(req);

  const response = await fetch(`${GEMINI_API_URL}?key=${req.apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  // Extract JSON from response (handle markdown code fences if present)
  let jsonStr = text.trim();
  const jsonMatch = jsonStr.match(/\[[\s\S]*\]/);
  if (jsonMatch) {
    jsonStr = jsonMatch[0];
  }

  const questions: GeneratedQuestion[] = JSON.parse(jsonStr);
  return questions;
}

export function getStoredApiKey(): string {
  return localStorage.getItem('gemini_api_key') || '';
}

export function setStoredApiKey(key: string): void {
  localStorage.setItem('gemini_api_key', key);
}
