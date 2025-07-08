/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@stroom/ui/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@stroom/ui/components/card";
import { Input } from "@stroom/ui/components/input";
import { Button } from "@stroom/ui/components/button";
import Link from "next/link";
import { Form } from "@stroom/ui/components/form";
import { Field, Label, Error } from "@stroom/ui/components/field";
import { FormEvent, useState } from "react";
import { z } from "zod";

const loginFormSchema = z.object({
  email: z.string().email("Email is not valid!"),
  password: z.string().min(8, "Password is not correct!"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [errors, setErrors] = useState({});
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const result = loginFormSchema.safeParse(
      Object.fromEntries(formData as any),
    );

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    console.log("form data:", email, password);
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            errors={errors}
            onClearErrors={setErrors}
            onSubmit={handleLogin}
          >
            <div className="flex flex-col gap-6">
              <Field name="email">
                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder="m@example.com" required />
                <Error />
              </Field>
              <Field name="password">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input type="password" required />
                <Error />
              </Field>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Login
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Register now
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
