import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-5xl font-bold">Welcome to Stoke Prices</h1>
      <p className="text-lg font-medium">Log in to view stock</p>

      <div className="flex gap-x-3">
        <RegisterLink>Register</RegisterLink>
        <LoginLink>Log in</LoginLink>
      </div>
    </div>
  );
}
