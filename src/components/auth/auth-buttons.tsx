"use client";

import {
  LoginLink,
  RegisterLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs";
import { type KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import { Button } from "../ui/button";

interface AuthButtonProps {
  user: KindeUser<Record<string, any>>;
}

const AuthButtons = ({ user }: AuthButtonProps) => {
  console.log(user);
  return (
    <div>
      {!user ? (
        <div className="flex gap-4">
          <LoginLink>
            <Button>Sign in</Button>
          </LoginLink>
          <RegisterLink>
            <Button>Sign up</Button>
          </RegisterLink>
        </div>
      ) : (
        <LogoutLink>
          <Button>Sign out</Button>
        </LogoutLink>
      )}
    </div>
  );
};

export default AuthButtons;
