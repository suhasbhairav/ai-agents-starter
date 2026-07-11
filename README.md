# AI Agents Starter Template for Next.js

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-149eca?style=for-the-badge&logo=react&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-Agents_SDK-412991?style=for-the-badge&logo=openai&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Only-f7df1e?style=for-the-badge&logo=javascript&logoColor=111)

**A focused multi-agent AI workflow starter for building prompt analysis and research pipelines with Next.js and the OpenAI Agents SDK.**

Created by **[Suhas Bhairav](https://suhasbhairav.com)**.

> This template shows a real agentic application flow: one agent improves the prompt, another agent uses that transformed brief to produce a researched response.

## 🚀 Template Preview

| Category | Details |
| --- | --- |
| **Template type** | Multi-agent workflow / AI agents starter / research assistant |
| **Framework** | Next.js App Router |
| **Language** | JavaScript |
| **AI capability** | Prompt analyzer agent plus research agent |
| **SDK** | `@openai/agents` |
| **Best for** | AI template marketplaces, research assistants, agent demos, SaaS starters, workflow prototypes |

## ✨ Feature Chips

`AI Agents` · `OpenAI Agents SDK` · `Next.js AI Template` · `Prompt Analyzer` · `Research Agent` · `Agent Pipeline` · `JavaScript Only` · `Tailwind CSS` · `API Route` · `AI SaaS Starter`

## 🔎 Template Overview

This **AI Agents Starter Template** is a simple, working Next.js application that demonstrates how to build a two-agent workflow with the OpenAI Agents SDK.

The flow is intentionally easy to inspect:

1. A user enters any prompt.
2. The Prompt Analyzer Agent transforms it into a focused research brief.
3. The Research Agent receives the transformed brief.
4. The app displays both the intermediate agent output and final answer.

## 🧠 What This Template Does

- Runs a server-side OpenAI Agents SDK workflow.
- Defines reusable agents in `lib/agents/workflow.js`.
- Exposes the workflow through `app/api/agents/chat/route.js`.
- Shows the transformed prompt and final research answer in the UI.
- Includes example prompts for quick demos.
- Keeps the OpenAI API key server-side.
- Uses a clean, mobile-responsive interface.
- Uses JavaScript only.

## 🏗️ Architecture

```text
User Prompt
    ↓
Next.js UI
    ↓
POST /api/agents/chat
    ↓
Prompt Analyzer Agent
    ↓
Transformed Research Brief
    ↓
Research Agent
    ↓
Final Answer
```

## 📁 Project Structure

```text
app/
  api/
    agents/
      chat/
        route.js
  globals.css
  layout.js
  page.js
lib/
  agents/
    workflow.js
```

## ⚡ Quick Start

```bash
cp .env.example .env.local
npm install
npm run dev
```

Add your OpenAI API key to `.env.local`:

```bash
OPENAI_API_KEY=sk-proj-your-key-here
OPENAI_AGENT_MODEL=gpt-5.6-terra
```

Open the app:

```text
http://localhost:3000
```

If port `3000` is already in use:

```bash
npm run dev -- -p 3002
```

## 🔐 Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `OPENAI_API_KEY` | Yes | Used by the Agents SDK to call OpenAI. |
| `OPENAI_AGENT_MODEL` | No | Model used by both agents. Defaults to `gpt-5.6-terra`. |

## 🧪 API Route

### `POST /api/agents/chat`

Runs the full two-agent workflow.

Request body:

```json
{
  "prompt": "Research the market opportunity for an AI templates marketplace."
}
```

Response:

```json
{
  "originalPrompt": "...",
  "transformedPrompt": "...",
  "finalAnswer": "...",
  "agents": [
    {
      "name": "Prompt Analyzer Agent",
      "role": "Prompt transformation",
      "output": "..."
    },
    {
      "name": "Research Agent",
      "role": "Research response",
      "output": "..."
    }
  ],
  "model": "gpt-5.6-terra"
}
```

## 🧩 Why This Is Useful for an AI Templates Marketplace

Most app templates show static UI. This template shows a working agentic workflow that users can run immediately and extend into a real product.

It is intentionally scoped to a clear two-agent flow, which makes it ideal for learning, demos, and starter products.

## 🛠️ Tech Stack

- **Next.js App Router** for UI and API routes.
- **React 19** for the interactive agent workbench.
- **Tailwind CSS 4** for responsive styling.
- **OpenAI Agents SDK** for agent definitions and runs.
- **Zod** as the companion validation dependency used by the Agents SDK ecosystem.
- **JavaScript only** for fast editing and broad adoption.

## 📌 Current Scope

Included:

- Prompt Analyzer Agent
- Research Agent
- Sequential agent workflow
- Server-side API route
- Mobile-responsive UI
- Example prompts
- Creator attribution

Recommended production upgrades:

- Add persistent run history.
- Add streaming progress events.
- Add agent tracing links.
- Add hosted tools such as web search or file search.
- Add authentication and usage tracking.
- Add structured output schemas for stricter downstream automation.

## ✅ Verification

```bash
npm run lint
npm run build
```

Both commands should pass after setup.

## 👤 Creator

Built by **Suhas Bhairav**.

🌐 Website: **[suhasbhairav.com](https://suhasbhairav.com)**

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE).
