import { disziplinByKey } from "@/components/registration/disziplinen";
import { FormSchema } from "@/components/registration/schema";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export const sendConfirmationMail = async (data: FormSchema) => {
  // Create a transporter using SMTP settings
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net", // like 'smtp.sendgrid.net' if you are still using SendGrid's SMTP
    port: 465, // typically 587 for secure SMTP
    secure: true, // true for 465, false for other ports
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY, // or use an API key if it's SendGrid SMTP
    },
  });

  // Set up email data
  const mailOptions: Mail.Options = {
    from: "Fit for Future <felix@lifesaving.team>",
    to: data.email,
    bcc: "Juergen Wohlgemuth <jgw@ennigerloh.dlrg.de>",
    replyTo: "Juergen Wohlgemuth <jgw@ennigerloh.dlrg.de>",
    subject: `Meldung der Ortsgruppe ${data.ortsgruppe} zu Fit for Future 2023`,
    html: confirmationEmailHtml(data),
  };

  // Send the email
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log(`Message sent: ${info.response}`);
  } catch (error: any) {
    console.error(`Error sending email: ${error.message}`);
    throw error;
  }
};

const confirmationEmailHtml = (data: FormSchema) => {
  const html = `
  <!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
  body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
  table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
  img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
  p { display:block;margin:13px 0; }</style><!--[if mso]>
<noscript>
<xml>
<o:OfficeDocumentSettings>
  <o:AllowPNG/>
  <o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
</noscript>
<![endif]--><!--[if lte mso 11]>
<style type="text/css">
  .mj-outlook-group-fix { width:100% !important; }
</style>
<![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
.mj-column-per-100 { width:100% !important; max-width: 100%; }
}</style><style media="screen and (min-width:480px)">.moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }</style><style type="text/css"></style><!-- Link the Inter font --></head><body style="word-spacing:normal;background-color:rgb(203, 213, 225);"><div style="background-color:rgb(203, 213, 225);"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;padding-top:40px;word-break:break-word;"><div style="font-family:Inter, sans-serif;font-size:24px;font-weight:bold;line-height:1;text-align:center;color:#000000;">Fit for Future 2023</div></td></tr><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Inter, sans-serif;font-size:14px;font-weight:bold;line-height:1;text-align:center;color:#777777;">Bestätigung der Meldung</div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:0 20px;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:560px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td style="background-color:#ffffff;border-radius:10px;vertical-align:top;padding:5px;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"><tbody><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Inter, sans-serif;font-size:20px;font-weight:bold;line-height:1;text-align:left;color:#333333;">Meldedaten</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Inter, sans-serif;font-size:13px;line-height:20px;text-align:left;color:#000000;"><strong>Email:</strong> ${
    data.email
  }<br><strong>Ortsgruppe:</strong> ${
    data.ortsgruppe
  }</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Inter, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#000000;"><strong>Ansprechpartner:</strong><br>${
    data.ansprechpartner.name
  } (Tel.: ${
    data.ansprechpartner.telefon
  })</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Inter, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#000000;"><strong>Gebühren:</strong><br>IBAN: ${
    data.gebuehren.iban
  }<br>Kontoinhaber: ${
    data.gebuehren.kontoinhaber
  }</div></td></tr><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Inter, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#000000;"><strong>Kampfrichter:</strong><br>Name: ${
    data.kampfrichter.name
  }<br>Qualifikation: ${
    data.kampfrichter.qualifikation
  }</div></td></tr><!-- Simplifying the participant list for brevity --><tr><td align="left" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Inter, sans-serif;font-size:13px;line-height:22px;text-align:left;color:#000000;"><strong>${
    data.teilnehmer.length
  } Teilnehmer:</strong><br>${data.teilnehmer
    .filter((t) => !!t.name)
    .map(
      (teilnehmer) =>
        `- ${teilnehmer.name} (${teilnehmer.geburtsjahr}, ${
          teilnehmer.geschlecht === "m" ? "männlich" : "weiblich"
        }) Disziplinen: [${teilnehmer.disziplinen
          .map(disziplinByKey)
          .map((d) => d?.displayName)
          .join(", ")}]`
    )
    .join(
      "<br>"
    )}</div></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]--><div style="margin:0px auto;max-width:600px;"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;"><tbody><tr><td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]--><div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;"><table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%"><tbody><tr><td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;"><div style="font-family:Inter, sans-serif;font-size:14px;font-weight:bold;line-height:1;text-align:center;color:#777777;">Vielen Dank für Deine Meldung. Bei Fragen dazu wende Dich an <a href="mailto:jgw@ennigerloh.dlrg.de">jgw@ennigerloh.dlrg.de</a>.</div></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]></td></tr></table><![endif]--></div></body></html>
  `;
  return html;
};
