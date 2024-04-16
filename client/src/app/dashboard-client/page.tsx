"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useEffect, useState } from "react";

export default function Home() {
  const { accessTokenRaw, isAuthenticated, isLoading, user } =
    useKindeBrowserClient();
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("http://localhost:3001/api/protected", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessTokenRaw}`,
        },
      });

      const data = await response.json();
      setResponseData(data?.message);
    };

    accessTokenRaw && getData();
  }, [accessTokenRaw]);

  if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <p>Not authenticated</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-5xl font-bold">Protected Dashboard Client Page</h1>
      <p className="text-lg font-medium">This Page should be protected</p>

      <p className="text-xl font-bold">Response: {responseData} for client</p>

      <LogoutLink>Log out</LogoutLink>
    </div>
  );
}
