import { Agent, run } from "@openai/agents";

const MODEL = process.env.OPENAI_AGENT_MODEL || "gpt-5.6-terra";

export const promptAnalyzerAgent = new Agent({
  name: "Prompt Analyzer Agent",
  model: MODEL,
  instructions: `
You transform raw user prompts into focused research briefs.

Return a concise brief with these exact headings:
Intent:
Key Questions:
Context Needed:
Research Plan:
Output Format:

Rules:
- Preserve the user's original goal.
- Remove ambiguity where possible.
- Do not answer the prompt.
- Do not invent facts.
- Make the brief useful for a downstream research agent.
`.trim(),
});

export const researchAgent = new Agent({
  name: "Research Agent",
  model: MODEL,
  instructions: `
You are a careful research agent. You receive a research brief created by another agent.

Your job:
- Answer the user's underlying request using the brief.
- State assumptions when facts are not available in the prompt.
- Separate findings from recommendations.
- Be practical, concise, and useful.
- Do not claim web browsing or external source access unless explicit tools are provided.

Return with these headings:
Summary
Findings
Recommendations
Next Steps
`.trim(),
});

export async function runAgentWorkflow(prompt) {
  const cleanPrompt = String(prompt || "").trim();

  if (!cleanPrompt) {
    throw new Error("Prompt is required.");
  }

  const analyzerResult = await run(promptAnalyzerAgent, cleanPrompt);
  const transformedPrompt = String(analyzerResult.finalOutput || "").trim();

  const researchInput = `
Original user prompt:
${cleanPrompt}

Transformed research brief:
${transformedPrompt}
`.trim();

  const researchResult = await run(researchAgent, researchInput);
  const finalAnswer = String(researchResult.finalOutput || "").trim();

  return {
    originalPrompt: cleanPrompt,
    transformedPrompt,
    finalAnswer,
    agents: [
      {
        name: promptAnalyzerAgent.name,
        role: "Prompt transformation",
        output: transformedPrompt,
      },
      {
        name: researchAgent.name,
        role: "Research response",
        output: finalAnswer,
      },
    ],
    model: MODEL,
  };
}
