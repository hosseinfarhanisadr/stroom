/* eslint-disable @typescript-eslint/no-explicit-any */
import { authClient } from "@/lib/auth-client";
import { Button } from "@stroom/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@stroom/ui/components/card";
import { Error, Label, Field } from "@stroom/ui/components/field";
import { Form } from "@stroom/ui/components/form";
import { Input } from "@stroom/ui/components/input";
import { cn } from "@stroom/ui/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

type RegisterSchemaType = z.infer<typeof registerSchema>;
type RegisterErrors = Partial<Record<keyof RegisterSchemaType, string[]>> & {
  message?: string;
};

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = registerSchema.safeParse(
      Object.fromEntries(formData as any),
    );

    if (!result.success) {
      console.log(result.error.flatten().fieldErrors);
      setErrors({ ...result.error.flatten().fieldErrors });
    }

    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          router.push("/");
        },
        onError: (ctx) => {
          setIsLoading(false);
          setErrors({ message: ctx.error?.message });
        },
      },
    );
    console.log("Registering user:", { name, email, password, data, error });
  };
  console.log(errors);
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register new account</CardTitle>
          <CardDescription>Create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form
            errors={errors}
            onClearErrors={setErrors}
            onSubmit={handleRegister}
          >
            <div className="flex flex-col gap-6">
              <Field>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
                <Error className="text-sm text-red-800" />
              </Field>
              <Field className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                <Error className="text-sm text-red-800" />
              </Field>
              <Field className="grid gap-3">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
                <Error className="text-sm text-red-800" />
              </Field>
              {errors?.message && (
                <p className="text-sm text-red-800">{errors?.message}</p>
              )}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <Image
                        src="/spinner.svg"
                        alt=""
                        width={20}
                        height={20}
                        aria-hidden="true"
                      />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Register"
                  )}
                </Button>
                <Button variant="outline" className="w-full">
                  Register with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?
              <Link href="/login" className="underline underline-offset-4">
                Login now
              </Link>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
