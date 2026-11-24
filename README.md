<h1 align="center">DIRECT AND INDIRECT PROMPT INJECTION</h1>

<p align="center">
  A prompt injection lab for leaking a system prompt and steering LLM apps through chat messages, webpages, and emails.
</p>

<p align="center">
  <a href="https://delriscotechnologies.github.io/promptinjectionwriteup/">Full Write-Up</a>
</p>

---

This write-up documents a controlled lab with four LLM apps: a chatbot that keeps a secret key in its system prompt, a Discord moderation report, a webpage summarizer, and an email summarizer.

Each example shows how the payload reaches the model, what changes in the response, and which controls reduce the risk.

> Use these techniques only on systems you own or are explicitly authorized to test. Keys are redacted, model responses are shortened, and the sample data is fictional.

## References

- [OWASP: LLM01:2025 Prompt Injection](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
- [Greshake et al.: Not what you’ve signed up for](https://arxiv.org/abs/2302.12173)
