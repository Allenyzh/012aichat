import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// import.meta.env.VITE_API_KEY
export const useMessageStore = create(
  persist(
    (set, get) => ({
      model: 'gemini-1.5-flash-8b',
      setModel: (model) => set({ model: model }, console.log(model)),

      apiKey: '',
      setApi: (api) => set({ apiKey: api }),

      clearApi: () => {
        set({ apiKey: '' });
      },

      messages: [],
      userInput: '',
      setUserInput: (input) => set({ userInput: input }),
      setMessages: (message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      },

      updateLastMessage: (newText) => {
        set((state) => {
          const updatedMessages = [...state.messages];
          if (updatedMessages.length > 0) {
            updatedMessages[updatedMessages.length - 1].text = newText;
          }
          return { messages: updatedMessages };
        });
      },

      sendMessage: async () => {
        const {
          userInput,
          messages,
          setMessages,
          updateLastMessage,
          apiKey,
          model,
        } = get();
        if (!userInput.trim()) return;

        // Add user message
        setMessages({ text: userInput, isUser: true });

        // Add placeholder for assistant message
        setMessages({ text: '', isUser: false });

        const requestBody = {
          model: `${model}`,
          messages: [
            ...messages.map((msg) => ({
              role: msg.isUser ? 'user' : 'assistant',
              content: msg.text,
            })),
            { role: 'user', content: userInput },
          ],
          stream: true, // Enable streaming
        };

        // Clear input
        set({ userInput: '' });

        try {
          const response = await fetch(
            'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
            {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify(requestBody),
            }
          );

          if (response.ok && response.body) {
            const reader = response.body.getReader();
            const decoder = new TextDecoder('utf-8');

            let assistantText = '';

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const chunk = decoder.decode(value, { stream: true });
              const lines = chunk
                .split('\n')
                .map((line) => line.trim())
                .filter((line) => line !== 'data: [DONE]');

              console.log(lines);

              for (const line of lines) {
                if (line.startsWith('data:')) {
                  try {
                    const jsonData = JSON.parse(line.slice(5));
                    console.log(jsonData);

                    const content = jsonData.choices[0]?.delta?.content || '';

                    if (content) {
                      assistantText += content;

                      // Update last message dynamically
                      updateLastMessage(assistantText);
                    }
                  } catch (error) {
                    console.error('Error parsing stream chunk:', error);
                  }
                }
              }
            }
          } else {
            console.error(
              'Failed to fetch response:',
              response.status,
              response.statusText
            );
            updateLastMessage(
              'Error: Unable to get a response from the server. Check Your ApiKey.'
            );
          }
        } catch (error) {
          console.error('Error sending message:', error);
          updateLastMessage(
            'Error: Something went wrong while sending your message.'
          );
        }
      },

      clearHistory: () => {
        set({ messages: [] });
      },
    }),
    { name: 'ai-chat-messages' }
  )
);

export default useMessageStore;
