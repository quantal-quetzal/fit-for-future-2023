import { formSchema } from "@/components/registration/schema";
import { sendConfirmationMail } from "@/lib/email";
import { createDataSheetFromTemplate } from "@/lib/sheets";

export async function POST(request: Request) {
  const data = formSchema.parse(await request.json());

  console.log(`${data.ortsgruppe} registered.`);

  console.log("Sending mail now.");
  await sendConfirmationMail(data);

  console.log("Successfully sent mail.");

  console.log("Creating data sheet.");
  await createDataSheetFromTemplate(data);
  console.log("Successfully created data sheet.");

  return Response.json({ success: true });
}
