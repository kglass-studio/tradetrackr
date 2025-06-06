// components/ManageSubscriptionButton.tsx

"use client";

export function ManageSubscriptionButton() {
  return (
    <a
      href="https://payhip.com/b/YOUR-PRODUCT-ID/manage"
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-blue-600 hover:underline"
    >
      Manage Subscription
    </a>
  );
}
