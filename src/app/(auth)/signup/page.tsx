"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

// Define validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." }),
  phone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 digits." }),
});

// Define Type for Form Data
type FormData = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

const SignUpPage = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  // handle user registration
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setErrorMessage(null);

      // user registration
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      // If successfully registered, sign in the user by next-auth
      if (response.ok) {
        await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        router.push("/dashboard");
        toast.success("Registration successful");
      } else {
        setErrorMessage(result?.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage(
        "An error occurred during registration. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen w-full items-center justify-center mt-20">
      <div className="flex flex-col gap-6">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>
              Enter your details below to create an account for the Book Shop
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your full name"
                          {...field}
                          className={`${
                            form.formState.errors.name
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@gmail.com"
                          {...field}
                          className={`${
                            form.formState.errors.email
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                          className={`${
                            form.formState.errors.password
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your phone number"
                          {...field}
                          className={`${
                            form.formState.errors.phone
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* Error Message */}
                {errorMessage && (
                  <Alert variant="destructive" className="bg-red-50">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Please wait..." : "Create Account"}
                </Button>
              </form>
            </Form>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SignUpPage;
