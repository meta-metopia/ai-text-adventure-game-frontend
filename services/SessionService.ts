import axios from "axios";

export interface Session {
  user: string;
  messages: Message[];
  prompt: string;
}

export interface Message {
  role: string;
  content: {
    message: string;
    selections: string[];
  };
  image?: string;
  audio?: string;
}

export interface SendMessageResponse {
  message: string;
  selections: string[];
  aduio?: string;
  image?: string;
}

export class SessionService {
  static async getSessionHistory(token: string): Promise<Session | null> {
    try {
      const url = process.env.NEXT_PUBLIC_API_ENDPOINT! + "/chat";
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      if (error.response.status === 404) {
        console.log("No session found");
        return null;
      }
      console.log(error);
      throw error;
    }
  }

  static async startSession(token: string, session: string): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT! + "/chat/new";
    await axios.post(
      url,
      {
        prompt_name: session,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  static async deleteSession(token: string): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT! + "/chat";
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async sendMessage(
    token: string,
    message: string
  ): Promise<SendMessageResponse> {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT! + "/chat";
    const response = await axios.post(
      url,
      {
        content: message,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
}
