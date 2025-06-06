"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase"; // or wherever your supabase.ts lives
import { UpgradeButton } from "@/components/UpgradeButton"


const AccountPage = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [plan, setPlan] = useState<"free" | "pro">("free");

  useEffect(() => {
    const fetchUserAndPlan = async () => {
      const sessionRes = await supabase.auth.getSession();
      const session = sessionRes?.data?.session;

      if (!session?.user) {
        console.warn("No active session found.");
        return;
      }

      const user = session.user;
      setUserEmail(user.email || "");

      const { data, error } = await supabase
  .from("profiles")
  .select("plan")
  .eq("id", user.id)
  .single();

if (error) {
  console.error("Error fetching plan:", error.message);
  setPlan("free");
} else {
  console.log("Fetched plan data:", data); // <-- NEW LINE
  const fetchedPlan = data?.plan?.toLowerCase();
  setPlan(fetchedPlan === "pro" ? "pro" : "free");
}

    };

    fetchUserAndPlan();
  }, []);

  function convertToCSV(data: any[]) {
  const headers = Object.keys(data[0]);
  const rows = data.map((row) =>
    headers.map((field) => `"${(row[field] ?? "").toString().replace(/"/g, '""')}"`).join(",")
  );
  return [headers.join(","), ...rows].join("\r\n");
}

  const handleExportData = async () => {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session?.user) {
    alert("You must be logged in to export your data.");
    return;
  }

  const userId = session.user.id;

  const { data: clients, error } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching client data:", error.message);
    alert("Failed to fetch your client data.");
    return;
  }

  if (!clients || clients.length === 0) {
    alert("No client data to download.");
    return;
  }

  // Convert to CSV
  const csv = convertToCSV(clients);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "client-data.csv";
  a.click();
  URL.revokeObjectURL(url);
};


  const handleDeleteAccount = async () => {
  const confirmDelete = confirm("Are you sure you want to delete your account? This cannot be undone.");
  if (!confirmDelete) return;

  try {
    // Step 1: Get user session to retrieve their ID
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session?.user) {
      console.error("Error getting session:", sessionError?.message);
      alert("Unable to verify session. Please log in again.");
      return;
    }

    const userId = session.user.id;

    // Step 2: Call the API route to delete account and data
    const res = await fetch("/api/delete-account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Unknown error deleting account");
    }

    // Step 3: Sign out after deletion
    await supabase.auth.signOut();
    alert("Your account has been deleted.");
    router.push("/");
  } catch (err: any) {
    console.error("Error deleting account:", err.message);
    alert("Something went wrong while deleting your account. Please try again or contact support.");
  }
};


  return (
    <div className="flex flex-col min-h-screen text-gray-800">
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 text-center">Account Settings</h1>

        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h2 className="text-xl font-semibold">Your Plan</h2>
            <p className="mt-1">
              Current Plan: <strong>{plan === "pro" ? "Pro" : "Free"}</strong>
            </p>
            {plan === "free" ? (
              
                <UpgradeButton />
              
            ) : (
              <>
              <Button variant="destructive" className="mt-2">
                Downgrade to Free
              </Button>
              <p className="text-sm text-red-600 mt-2">
      <strong>Note:</strong> Downgrading will permanently delete all clients beyond the free plan’s 5-client limit.
    </p>
  </>
            )}
            
          </div>

          <div>
            <h2 className="text-xl font-semibold">Security</h2>
            <p className="mt-1 text-sm text-gray-600">
  Need to change your password? Just log out and hit <strong>"Forgot Password?"</strong> on the login screen — we’ll send you a secure reset link by email.
</p>

          </div>

          <div>
            <h2 className="text-xl font-semibold">Data</h2>
            <Button variant="outline" onClick={handleExportData}>
              Download My Client Data
            </Button>
          </div>

          <div className="border border-red-300 p-4 rounded">
            <h2 className="text-xl font-semibold text-red-600">Danger Zone</h2>
            <p className="text-sm text-gray-600 mt-1">
              Deleting your account is permanent. All your data will be removed.
            </p>
            <Button variant="destructive" className="mt-2" onClick={handleDeleteAccount}>
              Delete My Account
            </Button>
          </div>

          <div className="mt-8">
            <Link
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
