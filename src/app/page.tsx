import { RegistrationForm } from "@/components/registration/RegistrationForm";

export default function Home() {
  return (
    <div className="bg-slate-200 dark:bg-slate-800">
      <main className="container p-2">
        <RegistrationForm />
      </main>
    </div>
  );
}
