"use client";

import { analytics, track } from "./client";

declare global {
  interface Window {
    rustalytics: typeof analytics & { track: typeof track };
  }
}

export function inject() {
  if (typeof window !== "undefined" && !window.rustalytics) {
    const token = process.env.NEXT_PUBLIC_RUSTALYTICS_API_TOKEN || "";
    analytics.init({ apiToken: token });

    window.rustalytics = {
      ...analytics,
      track,
      init: analytics.init.bind(analytics),
      pageview: analytics.pageview.bind(analytics),
    } as typeof analytics & { track: typeof track };

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const eventName =
        target.getAttribute("data-rustalytics") ||
        target.getAttribute("data-event");
      if (eventName) {
        track(eventName);
      }
    });
  }
}
