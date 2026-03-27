import { Page } from '@playwright/test';

/**
 * Mocks the /api/chat endpoint with a streaming response
 * that replicates the ai SDK's pipeUIMessageStreamToResponse format.
 */
export async function mockChatAPI(page: Page, responseText: string, options?: { delay?: number }) {
  await page.route('**/api/chat', async (route) => {
    const delay = options?.delay ?? 0;

    if (delay > 0) {
      await new Promise((r) => setTimeout(r, delay));
    }

    const chunks = [
      'data: {"type":"start"}\n\n',
      'data: {"type":"start-step"}\n\n',
      'data: {"type":"text-start","id":"0"}\n\n',
      `data: {"type":"text-delta","id":"0","delta":${JSON.stringify(responseText)}}\n\n`,
      'data: {"type":"text-end","id":"0"}\n\n',
      'data: {"type":"finish-step"}\n\n',
      'data: {"type":"finish","finishReason":"stop"}\n\n',
      'data: [DONE]\n\n',
    ];

    await route.fulfill({
      status: 200,
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
      body: chunks.join(''),
    });
  });
}

/**
 * Mock with markdown-rich response for testing rendering.
 */
export async function mockChatAPIWithMarkdown(page: Page) {
  const markdown = `Here are Fabian's services:\n\n**AI Consulting** - Strategic guidance.\n\n- Web Development\n- Mobile Apps\n\nVisit [services](/services) for more.\n\n\`Next.js\` is the main framework.`;
  await mockChatAPI(page, markdown);
}
