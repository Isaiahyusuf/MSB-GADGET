import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-gray-50 px-6 py-12"><Suspense fallback={<p className="text-gray-500">Loading password reset...</p>}><ResetPasswordForm /></Suspense></main>;
}
