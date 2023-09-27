"use server";

import { redirect } from "next/navigation";
import { FormSchema } from "./schema";

export async function submit(values: FormSchema) {
  console.log("submitted", values);
  redirect(`/success`);
}
