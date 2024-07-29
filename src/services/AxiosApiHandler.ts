import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ApiHandler } from "./ApiHandler";

export class AxiosApiHandler implements ApiHandler {
  baseUrl: string;
  axiosInstance: AxiosInstance;
  lastIsTokenExpired: boolean = false;

  constructor() {
    this.baseUrl = "https://gist.githubusercontent.com/wilson-wego";
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  private async handleRequest<Res>(
    request: Promise<AxiosResponse<Res>>,
  ): Promise<Res> {
    try {
      const response = await request;
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error(
          `Axios error in ${error?.config?.method} request to ${error?.config?.url}:`,
          error,
        );
      } else {
        console.error("Non-Axios error:", error);
      }
      throw error;
    }
  }
  async get<Query, Res>(path: string, query: Query): Promise<Res> {
    const request = this.axiosInstance.get<Res>(path, {
      params: query,
      validateStatus: () => true,
    });
    return this.handleRequest(request);
  }

  async post<Req, Res>(path: string, req: Req): Promise<Res> {
    const request = this.axiosInstance.post<Res>(path, req, {
      validateStatus: () => true,
    });
    return this.handleRequest(request);
  }

  async patch<Req, Res>(path: string, req: Req): Promise<Res> {
    const request = this.axiosInstance.patch<Res>(path, req, {
      validateStatus: () => true,
    });
    return this.handleRequest(request);
  }

  async delete<Req, Res>(path: string, req: Req): Promise<Res> {
    const request = this.axiosInstance.delete<Res>(path, {
      data: req,
      validateStatus: () => true,
    });
    return this.handleRequest(request);
  }
}
