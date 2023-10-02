import { formSchema } from "@/components/registration/schema";
import { sendConfirmationMail } from "@/lib/email";

export async function POST(request: Request) {
  const data = formSchema.parse(await request.json());

  console.log("Sending mail now.");
  await sendConfirmationMail(data);

  console.log("Successfully sent mail.");

  return Response.json({ success: true });
}

export async function GET(request: Request) {
  return Response.json({ success: "yes" });
}
