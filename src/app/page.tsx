import { MyQueryClientProvider } from "@/components/registration/QueryClientProvider";
import { RegistrationForm } from "@/components/registration/RegistrationForm";

export default function Home() {
  return (
    <div className="bg-slate-300 dark:bg-slate-800">
      <main className="container p-2">
        <MyQueryClientProvider>
          <RegistrationForm />
        </MyQueryClientProvider>
      </main>
    </div>
  );
}
