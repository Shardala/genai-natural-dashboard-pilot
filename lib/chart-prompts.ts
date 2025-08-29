
/* eslint-disable */

export const chartPrompt = (schema: string, query: string, data: any[]) => `
You are a data visualization assistant.
Dataset schema: ${schema}
Sample data: ${JSON.stringify(data.slice(0, 7))}
User query: "${query}"

Return ONLY a valid JSON object with the format:
{
  "chartType": "line | bar | pie",
  "xKey": "...",
  "yKey": "...",
  "title": "...",
  "data": [...]
}
`;
