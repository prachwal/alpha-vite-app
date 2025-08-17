import { signal } from "@preact/signals";

export interface ApiResponse<T = any> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const apiState = signal<Record<string, ApiResponse>>({});

export class ApiClient {
  private baseUrl = "";

  async request<T>(endpoint: string): Promise<T> {
    const key = endpoint;

    // Set loading state
    apiState.value = {
      ...apiState.value,
      [key]: { data: null, loading: true, error: null },
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      // Set success state
      apiState.value = {
        ...apiState.value,
        [key]: { data, loading: false, error: null },
      };

      return data;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      // Set error state
      apiState.value = {
        ...apiState.value,
        [key]: { data: null, loading: false, error: errorMessage },
      };

      throw error;
    }
  }

  async getHealth() {
    return this.request<{
      status: string;
      timestamp: string;
      uptime: number;
      version: string;
    }>("/api/health");
  }

  async getHello(name?: string) {
    const query = name ? `?name=${encodeURIComponent(name)}` : "";
    return this.request<{
      message: string;
      appName: string;
      timestamp: string;
    }>(`/api/hello${query}`);
  }

  async getTest() {
    return this.request<{
      message: string;
      environment: string;
      userAgent: string;
      ip: string;
    }>("/api/test");
  }

  async getInfo() {
    return this.request<{
      name: string;
      version: string;
      description: string;
      environment: string;
      nodeVersion: string;
    }>("/api/info");
  }
}

export const apiClient = new ApiClient();
