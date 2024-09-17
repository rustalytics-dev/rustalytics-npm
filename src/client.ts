"use client";
import { AnalyticsConfig } from "./types";

export class Analytics {
  private apiToken: string = "";
  private pageViewSent: boolean = false;

  init(config: AnalyticsConfig) {
    this.apiToken = config.apiToken;
    if (!this.apiToken) {
      console.warn(
        "Analytics: API token not set. Please check your NEXT_PUBLIC_RUSTALYTICS_API_TOKEN environment variable."
      );
    }
    if (!this.pageViewSent) this.setupPageViewTracking();
  }

  async track(eventName: string) {
    if (!this.apiToken) {
      console.warn("Analytics: API token not set.");
      return;
    }

    try {
      const response = await fetch("https://rustalytics.dev/increment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          public_api_token: this.apiToken,
          event: eventName,
        }),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      return response.headers.get("content-type")?.includes("application/json")
        ? response.json()
        : response.text();
    } catch (error) {
      console.error("Analytics: Failed to send event", error);
    }
  }

  pageview({ route, path }: { route?: string; path?: string }) {
    this.track(
      path ||
        route ||
        (typeof window !== "undefined" ? window.location.pathname : "")
    );
  }

  private setupPageViewTracking() {
    if (!this.pageViewSent) {
      this.pageview({});
      this.pageViewSent = true;
    }
    window.addEventListener("popstate", () => this.pageview({}));
  }
}

export const analytics = new Analytics();
export const track = (eventName: string) => analytics.track(eventName);
