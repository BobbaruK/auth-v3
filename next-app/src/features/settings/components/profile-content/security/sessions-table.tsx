"use client";

import { CustomButton } from "@/components/custom-button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MESSAGES } from "@/constants/messages";
import { getSessions } from "@/features/settings/data/get-sessions";
import {
  revokeOtherSessions,
  revokeSession,
  revokeSessions,
  signOut,
} from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { dateFormatter } from "@/lib/utils/format-date";
import { Session, SessionObj } from "@/types/session";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { UAParser } from "ua-parser-js";

interface Props extends React.BaseHTMLAttributes<HTMLDivElement> {
  closeDialog: () => void;
}

const SessionsTable = ({ closeDialog, ...restProps }: Props) => {
  const [sessions, setSessions] = useState<SessionObj[] | null>(null);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // const ses = use(getSessions());

  useEffect(() => {
    const fetchSessions = () =>
      startTransition(async () => {
        const ses = await getSessions();
        setSessions(ses?.sessions || null);
        setActiveSession(ses?.currentSession || null);
      });

    fetchSessions();

    return () => {};
  }, []);

  return (
    <div className={cn("flex flex-col gap-6", restProps.className)}>
      <ScrollArea className="h-80 w-full rounded-lg border">
        <div className="flex flex-col gap-4 py-2 ps-2 pe-3">
          {isPending ? (
            "Fetching your sessions..."
          ) : (
            <>
              {sessions?.map((session) => {
                const { browser, os } = UAParser(session.userAgent || "");
                return (
                  <Card key={session.id}>
                    <CardHeader>
                      <CardTitle className="flex flex-wrap items-center gap-2">
                        <span>{session.ipAddress}</span>
                        {session.id === activeSession?.session.id && (
                          <Badge>Active</Badge>
                        )}
                      </CardTitle>
                      <CardDescription>
                        <strong>{browser.name}</strong> on{" "}
                        <strong>
                          {os.name} {os.version}
                        </strong>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Created on{" "}
                        <strong>
                          {dateFormatter({
                            date: session.createdAt,
                            options: {
                              dateStyle: "medium",
                              timeStyle: "short",
                            },
                          })}
                        </strong>
                      </p>
                      <p>
                        Expires on{" "}
                        <strong>
                          {dateFormatter({
                            date: session.expiresAt,
                            options: {
                              dateStyle: "medium",
                              timeStyle: "short",
                            },
                          })}
                        </strong>
                      </p>
                    </CardContent>
                    {session.id !== activeSession?.session.id && (
                      <CardFooter className="flex items-center justify-end gap-2">
                        <CustomButton
                          buttonLabel="Revoke"
                          variant={"danger"}
                          onClick={async () => {
                            await revokeSession({ token: session.token });
                            closeDialog();
                            toast.success(
                              `Session "${browser.name}(${os.name} ${os.version})" revoked.`,
                            );
                          }}
                          disabled={isPending}
                        />
                      </CardFooter>
                    )}
                  </Card>
                );
              })}
            </>
          )}
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end gap-4">
        <CustomButton
          buttonLabel="Revoke all"
          variant={"danger"}
          onClick={async () => {
            await revokeSessions()
              .then(async ({ data, error }) => {
                if (data?.status) {
                  toast.success("All sessions have been successfully revoked.");
                  await signOut();
                  router.push("/login");
                  toast.success(MESSAGES.LOGOUT_SUCCESS);
                }

                if (error) {
                  toast.error(error.status, { description: error.message });
                  closeDialog();
                }
              })
              .catch(() => {
                toast.error(MESSAGES.SOMETHING_WRONG);
                closeDialog();
              });
            closeDialog();
          }}
          disabled={isPending}
        />
        <CustomButton
          buttonLabel="Revoke others"
          variant={"danger"}
          onClick={async () => {
            await revokeOtherSessions().then(({ data, error }) => {
              if (data?.status) {
                toast.success("Other sessions have been sucsefuly revoked.");
              }

              if (error) {
                toast.error(error.status, { description: error.message });
              }
            });

            closeDialog();
          }}
          disabled={isPending}
        />
      </div>
    </div>
  );
};

export default SessionsTable;
