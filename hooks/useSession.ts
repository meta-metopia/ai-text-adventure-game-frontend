import { Session, SessionService } from "@/services/SessionService";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useSession(
  token: string | null,
  initialSession: Session | null
) {
  const query = useQuery(
    ["session"],
    async () => {
      if (token === null || token === undefined) {
        return null;
      }
      const result = await SessionService.getSessionHistory(token);
      return result === undefined ? null : result;
    },
    {
      initialData: initialSession,
    }
  );

  return query;
}
