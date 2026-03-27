// Patterns that indicate prompt injection attempts
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /ignore\s+(all\s+)?prior\s+instructions/i,
  /ignore\s+(all\s+)?above\s+instructions/i,
  /disregard\s+(all\s+)?(previous|prior|above)/i,
  /repeat\s+(the\s+)?(system\s+)?prompt/i,
  /show\s+(me\s+)?(the\s+)?(system\s+)?prompt/i,
  /reveal\s+(your|the)\s+(system\s+)?(prompt|instructions)/i,
  /what\s+are\s+your\s+(system\s+)?instructions/i,
  /print\s+(your|the)\s+(system|initial)\s+(prompt|instructions|message)/i,
  /output\s+(your|the)\s+(system|initial)\s+(prompt|instructions)/i,
  /you\s+are\s+now\s+/i,
  /act\s+as\s+(if\s+you\s+are|a)\s+/i,
  /pretend\s+(to\s+be|you\s+are)\s+/i,
  /\bDAN\s+mode\b/i,
  /\bdeveloper\s+mode\b/i,
  /\bjailbreak\b/i,
  /do\s+anything\s+now/i,
  /bypass\s+(your\s+)?(restrictions|rules|guidelines|filters)/i,
  /override\s+(your\s+)?(restrictions|rules|programming)/i,
  /forget\s+(all\s+)?(your\s+)?(rules|instructions|programming)/i,
  /new\s+instructions\s*:/i,
  /\[system\]/i,
  /\<\s*system\s*\>/i,
];

/**
 * Checks if a message looks like a prompt injection attempt.
 * Returns true if suspicious, false if clean.
 */
export function isSuspiciousInput(text) {
  if (!text || typeof text !== 'string') return false;
  return INJECTION_PATTERNS.some(pattern => pattern.test(text));
}

/**
 * Generic rejection message that doesn't reveal why the message was blocked.
 */
export const REJECTION_RESPONSE = "I can only help with questions about Fabian Miranda's work, services, and portfolio. Could you rephrase your question?";
