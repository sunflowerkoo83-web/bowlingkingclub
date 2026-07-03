"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/login/actions";
import Button from "@/components/ui/Button";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-navy-600">
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          className="mt-1 min-h-[44px] w-full rounded-lg border border-navy-100 px-4 text-navy-600 focus:border-ember-600 focus:outline-none"
        />
      </div>

      {state?.error && <p className="text-sm text-ember-700">{state.error}</p>}

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
}
