import axios from "axios";

export class AuthService {
  static async signIn(username: string, password: string): Promise<string> {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT! + "/login";
    try {
      const response = await axios.post(url, {
        name: username,
        password: password,
      });
      return response.data.access_token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async signUp(username: string, password: string): Promise<void> {
    const url = process.env.NEXT_PUBLIC_API_ENDPOINT! + "/register";
    const response = await axios.post(url, {
      name: username,
      password: password,
    });
    return response.data.access_token;
  }
}
