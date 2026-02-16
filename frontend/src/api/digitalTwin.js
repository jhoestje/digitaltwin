const API_BASE = '/api/digital-twin';

export async function getStatus() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error(`Status check failed: ${res.status}`);
  return res.json();
}

export async function generateResponse(message) {
  const res = await fetch(`${API_BASE}/ai/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function generateStreamResponse(message, onChunk, onDone, onError) {
  const controller = new AbortController();

  try {
    const res = await fetch(`${API_BASE}/ai/generateStream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: 'Stream failed' }));
      throw new Error(error.message || `Stream failed: ${res.status}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.slice(5).trim();
          if (data) {
            try {
              const parsed = JSON.parse(data);
              onChunk(parsed);
            } catch {
              onChunk(data);
            }
          }
        }
      }
    }

    onDone?.();
  } catch (err) {
    if (err.name !== 'AbortError') {
      onError?.(err);
    }
  }

  return controller;
}
