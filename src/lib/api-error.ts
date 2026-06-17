import { NextResponse } from "next/server";

import type { Logger } from "@/lib/logger";
import { logError } from "@/lib/logger";

export const SAFE_ERROR_MESSAGE = "An unexpected error occurred";

export type SafeErrorBody = {
  status: "error";
  message: string;
};

export function internalErrorResponse(
  logger: Logger,
  error: unknown,
  message: string,
  context: Record<string, unknown> = {},
): NextResponse<SafeErrorBody> {
  logError(logger, error, message, context);

  return NextResponse.json(
    {
      status: "error",
      message: SAFE_ERROR_MESSAGE,
    },
    { status: 500 },
  );
}
