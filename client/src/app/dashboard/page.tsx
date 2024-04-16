import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getAccessTokenRaw, getAccessToken, isAuthenticated } =
    getKindeServerSession();
  const isLoggedIn = await isAuthenticated();
  if (!isLoggedIn) return <LoginLink>Log in</LoginLink>;
  const accessTokenRaw = await getAccessTokenRaw();

  const response = await fetch("http://localhost:3001/api/protected", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessTokenRaw}`,
    },
    cache: "no-store",
  });
  const data = await response.json();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-5xl font-bold">Protected Dashboard Page</h1>
      <p className="text-lg font-medium">This Page should be protected</p>

      <p className="text-xl font-bold">Response: {data?.message}</p>

      <LogoutLink>Log out</LogoutLink>
    </div>
  );
}
