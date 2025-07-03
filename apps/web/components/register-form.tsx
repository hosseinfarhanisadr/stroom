import { authClient } from "@/lib/auth-client";
import { Button } from "@stroom/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@stroom/ui/components/card";
import { Input } from "@stroom/ui/components/input";
import { Label } from "@stroom/ui/components/label";
import { cn } from "@stroom/ui/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
    });

    if (!error) {
      router.push("/");
    }

    console.log("Registering user:", { name, email, password, data, error });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register new account</CardTitle>
          <CardDescription>Create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Register
                </Button>
                <Button variant="outline" className="w-full">
                  Register with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login now
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
