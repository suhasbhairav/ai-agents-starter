"use client";

import { useState } from "react";

const examples = [
  "Research the market opportunity for a ChatGPT clone template for solo founders.",
  "Analyze this product idea: an AI assistant that turns customer calls into CRM updates.",
  "Create a research-backed plan for launching an AI templates marketplace.",
];

export default function Home() {
  const [prompt, setPrompt] = useState(examples[0]);
  const [result, setResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");

  async function runAgents(event) {
    event.preventDefault();
    const cleanPrompt = prompt.trim();

    if (!cleanPrompt || isRunning) {
      return;
    }

    setIsRunning(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/agents/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: cleanPrompt }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The agent workflow failed.");
      }

      setResult(data);
    } catch (runError) {
      setError(runError.message);
    } finally {
      setIsRunning(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-[#152033]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="grid gap-5 border-b border-[#d8e0ec] pb-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#315bdc]">
              OpenAI Agents Starter
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-normal text-[#101828] sm:text-5xl">
              Prompt analyzer to research agent workflow
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5b677a]">
              Send any prompt through a two-agent pipeline. The first agent turns it
              into a sharper research brief, then the research agent produces a
              practical response.
            </p>
          </div>
          <div className="rounded-md border border-[#d8e0ec] bg-white px-4 py-3 text-sm shadow-sm">
            Created by{" "}
            <a
              className="font-semibold text-[#315bdc] underline-offset-4 hover:underline"
              href="https://suhasbhairav.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              Suhas Bhairav
            </a>
          </div>
        </header>

        <section className="grid flex-1 gap-6 py-6 lg:grid-cols-[420px_1fr]">
          <aside className="space-y-4">
            <form
              className="rounded-lg border border-[#d8e0ec] bg-white p-4 shadow-sm"
              onSubmit={runAgents}
            >
              <label className="text-sm font-semibold text-[#344054]" htmlFor="prompt">
                Prompt
              </label>
              <textarea
                className="mt-2 min-h-56 w-full resize-y rounded-md border border-[#cbd5e1] px-3 py-3 text-sm leading-6 outline-none transition focus:border-[#315bdc]"
                id="prompt"
                onChange={(event) => setPrompt(event.target.value)}
                placeholder="Describe what you want the agents to research..."
                value={prompt}
              />
              <button
                className="mt-3 w-full rounded-md bg-[#315bdc] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#2448b8] disabled:cursor-not-allowed disabled:bg-[#a8b8ea]"
                disabled={isRunning || !prompt.trim()}
                type="submit"
              >
                {isRunning ? "Running agents..." : "Run agent workflow"}
              </button>
            </form>

            <section className="rounded-lg border border-[#d8e0ec] bg-white p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-[#344054]">Example prompts</h2>
              <div className="mt-3 space-y-2">
                {examples.map((example) => (
                  <button
                    className="w-full rounded-md border border-[#e2e8f0] bg-[#fbfcff] px-3 py-3 text-left text-sm leading-5 text-[#475467] transition hover:border-[#b8c7f3] hover:bg-[#f4f7ff]"
                    key={example}
                    onClick={() => setPrompt(example)}
                    type="button"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </section>
          </aside>

          <section className="min-h-[680px] rounded-lg border border-[#d8e0ec] bg-white shadow-sm">
            <div className="border-b border-[#e4eaf3] px-4 py-4 sm:px-5">
              <h2 className="text-lg font-semibold text-[#101828]">Agent run</h2>
              <p className="mt-1 text-sm text-[#667085]">
                Inspect the transformed prompt and final research output.
              </p>
            </div>

            {error ? (
              <div className="m-4 rounded-md border border-[#f3b3a7] bg-[#fff4f1] px-4 py-3 text-sm text-[#9f2d20]">
                {error}
              </div>
            ) : null}

            <div className="max-h-[calc(100vh-220px)] min-h-[580px] space-y-4 overflow-y-auto p-4 sm:p-5">
              {!result && !isRunning ? (
                <div className="flex min-h-[520px] items-center justify-center text-center">
                  <div className="max-w-md">
                    <div className="mx-auto grid size-12 place-items-center rounded-md bg-[#eef4ff] text-lg font-bold text-[#315bdc]">
                      2
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">Two agents, one flow</h3>
                    <p className="mt-2 text-sm leading-6 text-[#667085]">
                      Run a prompt to see the analyzer agent reshape it before the
                      research agent creates the final answer.
                    </p>
                  </div>
                </div>
              ) : null}

              {isRunning ? (
                <div className="grid gap-3">
                  {["Prompt Analyzer Agent", "Research Agent"].map((name, index) => (
                    <div
                      className="rounded-md border border-[#e4eaf3] bg-[#fbfcff] p-4"
                      key={name}
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid size-8 place-items-center rounded-md bg-[#315bdc] text-sm font-semibold text-white">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{name}</p>
                          <p className="text-sm text-[#667085]">Working...</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {result ? (
                <div className="space-y-4">
                  <div className="rounded-md border border-[#d8e0ec] bg-[#fbfcff] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#667085]">
                      Model
                    </p>
                    <p className="mt-1 font-semibold text-[#101828]">{result.model}</p>
                  </div>

                  {result.agents?.map((agent, index) => (
                    <article
                      className="rounded-md border border-[#d8e0ec] bg-white p-4"
                      key={agent.name}
                    >
                      <div className="flex items-start gap-3">
                        <div className="grid size-9 shrink-0 place-items-center rounded-md bg-[#315bdc] text-sm font-semibold text-white">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#101828]">{agent.name}</h3>
                          <p className="text-sm text-[#667085]">{agent.role}</p>
                        </div>
                      </div>
                      <pre className="mt-4 whitespace-pre-wrap rounded-md bg-[#f7f9fd] p-4 text-sm leading-6 text-[#27364a]">
                        {agent.output}
                      </pre>
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
