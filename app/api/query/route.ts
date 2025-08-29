import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { chartPrompt } from '../../../lib/chart-prompts';
import demoData from '../../../data/demo-data.json';
import { z } from 'zod';
import { fallbackRevenue } from '@/app/consts';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

const ChartSchema = z.object({
  chartType: z.enum(['line','bar','pie']),
  xKey: z.string(),
  yKey: z.string(),
  title: z.string(),
  data: z.array(z.record(z.any()))
});

export async function POST(req: Request) {
  const { query } = await req.json();
  const schema = Object.keys(demoData[0]).join(', ');
  const prompt = chartPrompt(schema, query, demoData);

  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0
  });

  const raw = response.choices[0].message?.content || '{}';
  try {
    const parsed = ChartSchema.parse(JSON.parse(raw));
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({
      chartType: 'bar',
      xKey: 'date',
      yKey: 'revenue',
      title: fallbackRevenue,
      data: JSON.stringify(demoData)
    });
  }
}
