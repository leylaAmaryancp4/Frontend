import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type Chat = any;
export type Message = any;

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  credentials: 'include',
});

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery,
  tagTypes: ['Chat', 'Message'],
  endpoints: (builder) => ({
    
    getMessagesByChat: builder.query<Message[], string>({
      query: (chatId) => `/chats/${chatId}`,
      providesTags: [{ type: 'Message', id: 'LIST' }],
    }),

    createChat: builder.mutation<Chat, { recordRequestId: string }>({
      query: (body) => ({
        url: '/chats',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Chat', id: 'LIST' }],
    }),

    sendMessage: builder.mutation<
      Message,
      { chatId: string; senderId: string; content: string }>
  ({
      query: ({ chatId, senderId, content }) => ({
        url: `/chats/message`,
        method: 'POST',
        body: { chatId, senderId, content },
      }),
      invalidatesTags: [{ type: 'Message', id: 'LIST' }],
    }),

  }),
});

export const {
  useGetMessagesByChatQuery,
  useCreateChatMutation,
  useSendMessageMutation,
} = chatApi;