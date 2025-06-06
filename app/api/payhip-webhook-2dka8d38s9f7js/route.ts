import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    const eventType = payload.event;
    const email = payload.data?.email;

    if (!email || !["subscription_created", "subscription_deleted"].includes(eventType)) {
      return NextResponse.json({ message: "Ignored or malformed webhook" });
    }

    const newPlan = eventType === "subscription_created" ? "pro" : "free";

    const { error } = await supabase
      .from("profiles")
      .update({ plan: newPlan })
      .eq("email", email);

    if (error) {
      console.error("Supabase update error:", error);
      return NextResponse.json({ error: "Failed to update user plan" }, { status: 500 });
    }

    return NextResponse.json({ message: `User plan updated to '${newPlan}'` });
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
