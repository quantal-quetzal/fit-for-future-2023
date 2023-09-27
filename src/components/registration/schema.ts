import z from "zod";

export const formSchema = z.object({
  email: z.string(),
  ortsgruppe: z.string(),
  ansprechpartner: z.object({
    name: z.string(),
    telefon: z.string(),
  }),
  gebuehren: z.object({
    iban: z.string(),
    kontoinhaber: z.string(),
  }),
  kampfrichter: z.object({
    name: z.string(),
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
