"use client";

import { useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { user } = useAuth();
  const hasRedirected = useRef(false);

  console.log("LoginPage rendered. User:", user, "hasRedirected:", hasRedirected.current);

  useEffect(() => {
    if (user && !hasRedirected.current) {
      console.log("LoginPage - User truthy, pushing to /dashboard");
      router.push("/dashboard");
      hasRedirected.current = true;
    }
  }, [user, router]);

  const handleMagicLink = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    console.log("=== DEBUGGING SUPABASE EMAIL ===");
    console.log("Current URL:", window.location.href);
    console.log("Origin:", window.location.origin);
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      // Let's try with NO options at all
    });

    console.log("Full Supabase response:", JSON.stringify({ data, error }, null, 2));
    

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email - and tell me which template you actually received!");
    }
    setLoading(false);
  };
 console.log("LoginPage - Rendering with user:", user);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-blue-600">TradeTrackr</CardTitle>
          <CardDescription>Simple CRM for contractors</CardDescription>
        </CardHeader>

        <CardContent>
          {!user && (
            <form onSubmit={handleMagicLink} className="space-y-4">
              {/* ... your form ... */}
            </form>
          )}

          {message && <div className="mt-4 text-sm text-center text-green-600">{message}</div>}
        </CardContent>
      </Card>
    </div>
  );
}