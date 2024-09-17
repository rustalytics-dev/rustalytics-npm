"use client";
import { AnalyticsProps } from "./types";
import React, { useEffect } from "react";
import { analytics, track, Analytics as AnalyticsClass } from "./client";
import { inject } from "./inject";

export const Analytics: React.FC<AnalyticsProps> = ({
  apiToken,
  route,
  path,
}) => {
  useEffect(() => {
    const token =
      apiToken || process.env.NEXT_PUBLIC_RUSTALYTICS_API_TOKEN || "";
    analytics.init({ apiToken: token });
    inject();
  }, [apiToken]);

  useEffect(() => {
    if (route || path) analytics.pageview({ route, path });
  }, [route, path]);

  return null;
};

export { track, AnalyticsClass };
export default analytics;
