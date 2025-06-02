"use client";

import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // Assuming this path is correct for your Supabase client
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // For a back button icon

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Handle user sign-up
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Clear previous messages

    try {
      // Call Supabase signUp method
      const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: `${window.location.origin}/login`
  }
})


      if (error) {
        // Display Supabase error message
        setMessage(error.message);
      } else if (data.user) {
        // If user data is returned (e.g., email confirmation is off, or user auto-signed in)
        setMessage("Sign up successful! Please check your email for a confirmation link if required.");
        // Optionally redirect directly to dashboard if no email confirmation is needed
        // router.push("/dashboard");
      } else {
        // This case typically means a confirmation email was sent
        setMessage("Success! Please check your email for a confirmation link.");
      }
    } catch (error: any) { // Catch any unexpected errors
      console.error("Unexpected error during sign up:", error);
      setMessage(`An unexpected error occurred: ${error.message || 'Please try again.'}`);
    } finally {
      setLoading(false); // Always stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">SaltCRM</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>

            {message && (
              <p className={`mt-4 text-sm text-center ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
                {message}
              </p>
            )}

            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log In
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
