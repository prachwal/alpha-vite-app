import { describe, it, expect, vi, beforeEach } from "vitest";
import { ApiClient, apiState } from "@services/ApiClient";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("ApiClient", () => {
  let apiClient: ApiClient;

  beforeEach(() => {
    apiClient = new ApiClient();
    apiState.value = {}; // Reset API state
    mockFetch.mockClear();
  });

  describe("request method", () => {
    it("should make successful API request", async () => {
      const mockData = { message: "success" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const result = await apiClient.request("/test");

      expect(mockFetch).toHaveBeenCalledWith("/test");
      expect(result).toEqual(mockData);
      expect(apiState.value["/test"]).toEqual({
        data: mockData,
        loading: false,
        error: null,
      });
    });

    it("should handle API request errors", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found",
      });

      await expect(apiClient.request("/test")).rejects.toThrow(
        "HTTP 404: Not Found"
      );

      expect(apiState.value["/test"]).toEqual({
        data: null,
        loading: false,
        error: "HTTP 404: Not Found",
      });
    });

    it("should set loading state during request", async () => {
      let resolvePromise: (value: any) => void;
      const promise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      mockFetch.mockReturnValueOnce(promise);

      const requestPromise = apiClient.request("/test");

      // Check loading state is set immediately
      expect(apiState.value["/test"]).toEqual({
        data: null,
        loading: true,
        error: null,
      });

      // Resolve the mock fetch
      resolvePromise!({
        ok: true,
        json: () => Promise.resolve({ data: "test" }),
      });

      await requestPromise;
    });
  });

  describe("API methods", () => {
    it("should call getHealth with correct endpoint", async () => {
      const mockData = {
        status: "OK",
        timestamp: "2023-01-01",
        uptime: 100,
        version: "1.0.0",
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const result = await apiClient.getHealth();

      expect(mockFetch).toHaveBeenCalledWith("/api/health");
      expect(result).toEqual(mockData);
    });

    it("should call getHello with optional name parameter", async () => {
      const mockData = {
        message: "Hello, John!",
        appName: "Test App",
        timestamp: "2023-01-01",
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const result = await apiClient.getHello("John");

      expect(mockFetch).toHaveBeenCalledWith("/api/hello?name=John");
      expect(result).toEqual(mockData);
    });

    it("should call getHello without name parameter", async () => {
      const mockData = {
        message: "Hello, World!",
        appName: "Test App",
        timestamp: "2023-01-01",
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const result = await apiClient.getHello();

      expect(mockFetch).toHaveBeenCalledWith("/api/hello");
      expect(result).toEqual(mockData);
    });

    it("should call getTest with correct endpoint", async () => {
      const mockData = {
        message: "Test endpoint works!",
        environment: "test",
        userAgent: "test",
        ip: "127.0.0.1",
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const result = await apiClient.getTest();

      expect(mockFetch).toHaveBeenCalledWith("/api/test");
      expect(result).toEqual(mockData);
    });

    it("should call getInfo with correct endpoint", async () => {
      const mockData = {
        name: "Test App",
        version: "1.0.0",
        description: "Test",
        environment: "test",
        nodeVersion: "v18",
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockData),
      });

      const result = await apiClient.getInfo();

      expect(mockFetch).toHaveBeenCalledWith("/api/info");
      expect(result).toEqual(mockData);
    });
  });
});
