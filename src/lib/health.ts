export interface HealthPayload {
  status: "ok" | "degraded";
  service: string;
  ready: boolean;
  timestamp: string;
  version: string;
}

export function getHealthPayload(version: string): HealthPayload {
  return {
    status: "ok",
    service: "lyt-onboarding",
    ready: true,
    timestamp: new Date().toISOString(),
    version,
  };
}
