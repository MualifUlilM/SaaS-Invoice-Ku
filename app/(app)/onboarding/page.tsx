import { redirect } from "next/navigation";
import { BusinessProfileForm } from "@/components/app/BusinessProfileForm";
import { requireAuthenticatedUser } from "@/lib/queries/auth";

export default async function OnboardingPage() {
  const context = await requireAuthenticatedUser();

  if (context.profile?.onboarding_completed_at && context.business) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Card top — indigo header */}
        <div className="bg-indigo-600 text-white px-8 py-10">
          <p className="text-lg font-bold tracking-tight">InvoiceKu</p>
          <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
            Selamat Datang di InvoiceKu!
          </h1>
          <p className="mt-2 text-indigo-100 text-sm">
            Mari setup bisnis Anda untuk mulai mengelola invoice dengan mudah.
          </p>

          {/* Step indicator */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-white text-indigo-600 text-xs font-bold flex items-center justify-center">
                1
              </div>
              <span className="text-sm font-medium text-white">Profil Bisnis</span>
            </div>
            <div className="h-px flex-1 bg-indigo-400" />
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-indigo-500 text-indigo-200 text-xs font-bold flex items-center justify-center">
                2
              </div>
              <span className="text-sm text-indigo-200">Dashboard</span>
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="px-8 py-8">
          <BusinessProfileForm mode="onboarding" />
        </div>
      </div>
    </div>
  );
}
