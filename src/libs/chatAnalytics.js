import supabase from './supabaseClient';

/**
 * Ensures a chat session exists, creates one if not.
 * Returns the session_id.
 */
export async function ensureSession(sessionId, locale = 'en') {
  const { error } = await supabase
    .from('chat_sessions')
    .upsert(
      { session_id: sessionId, locale },
      { onConflict: 'session_id', ignoreDuplicates: true }
    );

  if (error) console.error('[Alfred Analytics] Session upsert error:', error.message);
  return sessionId;
}

/**
 * Logs a conversation exchange (user message + bot response).
 * Also updates the session's message count and last_message_at.
 */
export async function logConversation({ sessionId, locale, userMessage, botResponse, tokensInput, tokensOutput }) {
  // Insert conversation record
  const { error: convError } = await supabase
    .from('chat_conversations')
    .insert({
      session_id: sessionId,
      locale,
      user_message: userMessage,
      bot_response: botResponse,
      tokens_input: tokensInput || null,
      tokens_output: tokensOutput || null,
    });

  if (convError) {
    console.error('[Alfred Analytics] Conversation insert error:', convError.message);
    return;
  }

  // Update session stats
  const { error: sessError } = await supabase.rpc('increment_session_count', { sid: sessionId });

  // Fallback if RPC doesn't exist yet
  if (sessError) {
    await supabase
      .from('chat_sessions')
      .update({ last_message_at: new Date().toISOString() })
      .eq('session_id', sessionId);
  }
}
