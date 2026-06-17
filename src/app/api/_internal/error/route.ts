import { internalErrorResponse } from "@/lib/api-error";
import { createLogger } from "@/lib/logger";
import { NextResponse } from "next/server";

const routeLogger = createLogger({ route: "/api/_internal/error" });

export function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ status: "error", message: "Not found" }, { status: 404 });
  }

  return internalErrorResponse(routeLogger, new Error("intentional test error"), "test error route");
}
