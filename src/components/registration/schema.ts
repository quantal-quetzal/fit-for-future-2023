import z from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Bitte eine gültige E-Mail-Adresse eintragen." }),
  ortsgruppe: z
    .string()
    .min(1, "Bitte den Namen der meldenden Ortsgruppe angeben."),
  ansprechpartner: z.object({
    name: z.string().min(1, "Bitte einen Ansprechpartner angeben."),
    telefon: z
      .string()
      .min(
        1,
        "Wir benötigen eine Telefonnummer unter der der Ansprechpartner erreichbar ist."
      ),
  }),
  gebuehren: z.object({
    iban: z.string().min(1, "Bitte eine gültige IBAN angeben."),
    kontoinhaber: z.string().min(1, "Bitte den Kontoinhaber angeben."),
  }),
  kampfrichter: z.object({
    name: z.string().min(1, "Bitte einen Kampfrichter namentlich melden."),
    qualifikation: z.enum(["F1", "E1", "D1", "keine"]),
  }),
  teilnehmer: z.array(
    z.object({
      name: z.string(),
      geburtsjahr: z.coerce.number(),
      geschlecht: z.enum(["m", "w"]),
      disziplinen: z.array(z.string()),
    })
  ),
});

export type FormSchema = z.infer<typeof formSchema>;
