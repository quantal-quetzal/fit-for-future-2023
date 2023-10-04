import { Success } from "./Success";

async function Page() {
  return (
    <div className="bg-slate-200 dark:bg-slate-800 h-96 py-8">
      <main className="container">
        <Success />
      </main>
    </div>
  );
}

export default Page;
