"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { sendPasswordResetOtp, resetUserPasswordWithOtp } from "@/server/users";
import { cn } from "@/lib/utils";
import Link from "next/link";

const emailFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

const resetPasswordFormSchema = z.object({
  otp: z.string().min(1, { message: "Please enter the code from your email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setTimeout(() => {
      setResendCooldown(resendCooldown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const startCooldown = () => setResendCooldown(60);

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      otp: "",
      password: "",
    },
  });

  const onEmailSubmit = async (data: z.infer<typeof emailFormSchema>) => {
    setLoading(true);
    setUserEmail(data.email);
    try {
      const result = await sendPasswordResetOtp(data.email);
      if (result.success) {
        toast.success(result.message);
        setEmailSent(true);
        startCooldown();
        emailForm.reset();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      const e = error as Error;
      toast.error(e.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setLoading(true);
    try {
      await sendPasswordResetOtp(userEmail);
      toast.success("A new code has been sent.");
      startCooldown();
    } catch (error) {
      const e = error as Error;
      toast.error(e.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const onResetPasswordSubmit = async (data: z.infer<typeof resetPasswordFormSchema>) => {
    setLoading(true);
    try {
      const result = await resetUserPasswordWithOtp(userEmail, data.otp, data.password);
      if (result.success) {
        toast.success(result.message);
        router.push("/login");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      const e = error as Error;
      toast.error(e.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent a 6-digit code to {userEmail}. The code expires shortly, so please enter it soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...resetPasswordForm}>
              <form onSubmit={resetPasswordForm.handleSubmit(onResetPasswordSubmit)} className="space-y-6">
                <FormField control={resetPasswordForm.control} name="otp" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl><Input placeholder="123456" type="text" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={resetPasswordForm.control} name="password" render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl><Input type="password" placeholder="********" {...field} autoComplete="new-password" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            </Form>
            <div className="mt-4 text-center text-sm">
              Didn&apos;t get a code?{" "}
              <button onClick={handleResend} className="underline underline-offset-4 disabled:opacity-50" disabled={loading || resendCooldown > 0}>
                {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Forgot your password?</CardTitle>
          <CardDescription>
            No worries, we&apos;ll send you reset instructions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@example.com" {...field} disabled={loading} autoComplete="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send reset code"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="underline underline-offset-4">
              Back to login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
