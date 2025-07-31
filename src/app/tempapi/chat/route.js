// File: src/app/api/chat/chat.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { body } = await req.json();
    if (!body || typeof body !== 'string') {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(body);
    const response = await result.response;
    const output = await response.text();  // <-- Ensure actual string

    return NextResponse.json({ output }, { status: 200 });
  } catch (error) {
    console.error('Gemini error:', error);
    return NextResponse.json(
      { error: 'Failed to generate blog' },
      { status: 500 }
    );
  }
}
