import { getHealthPayload } from "@/lib/health";
import { createLogger, logError } from "@/lib/logger";
import { NextResponse } from "next/server";

import packageJson from "../../../../package.json";

const routeLogger = createLogger({ route: "/api/health" });

export function GET() {
  try {
    const payload = getHealthPayload(packageJson.version);

    routeLogger.info("health check succeeded", {
      status: payload.status,
      ready: payload.ready,
    });

    return NextResponse.json(payload);
  } catch (error) {
    logError(routeLogger, error, "health check failed", {
      route: "/api/health",
    });

    return NextResponse.json(
      {
        status: "degraded",
        service: "lyt-onboarding",
        ready: false,
        timestamp: new Date().toISOString(),
      },
      { status: 503 },
    );
  }
}
