// File: /app/api/delete-account/route.ts

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Delete user-related data (e.g., clients)
  const { error: clientError } = await supabaseAdmin
    .from("clients")
    .delete()
    .eq("user_id", userId);

  if (clientError) {
    console.error("Error deleting client data:", clientError.message);
    return NextResponse.json({ error: "Failed to delete client data" }, { status: 500 });
  }

  // Delete the user from auth
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (deleteError) {
    console.error("Error deleting user:", deleteError.message);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }

  return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
}
