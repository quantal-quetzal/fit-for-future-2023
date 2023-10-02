import { Success } from "./Success";

async function Page() {
  return (
    <div className="bg-slate-200 dark:bg-slate-800">
      <main className="container p-2">
        <Success />
      </main>
    </div>
  );
}

export default Page;
