"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Allgemein } from "./Allgemein";
import { Gebuehren } from "./Gebuehren";
import { Kampfrichter } from "./Kampfrichter";
import { Teilnehmer } from "./Teilnehmer";
import { Zusammenfassung } from "./Zusammenfassung";
import { FormSchema, formSchema } from "./schema";
import { submit } from "./submit";

export type MyForm = UseFormReturn<FormSchema, any, undefined>;

export const RegistrationForm = () => {
  const form: MyForm = useForm<FormSchema>({
    defaultValues: {
      email: "",
      ortsgruppe: "",
      ansprechpartner: {
        name: "",
        telefon: "",
      },
      gebuehren: {
        iban: "",
        kontoinhaber: "",
      },
      kampfrichter: {
        name: "",
        qualifikation: "keine",
      },
      teilnehmer: [
        {
          name: "Felix Gehring",
          geburtsjahr: 1986,
          geschlecht: "m",
          disziplinen: [],
        },
      ],
    },
    resolver: zodResolver(formSchema),
  });

  const [_isPending, startTransition] = useTransition();

  const onSubmit = form.handleSubmit((data) => {
    startTransition(() => {
      submit(data);
    });
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6 pb-10">
        <Allgemein form={form} />
        <Gebuehren form={form} />
        <Kampfrichter form={form} />
        <Teilnehmer form={form} />
        <Zusammenfassung form={form} />
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-400 to-pink-600 w-full font-bold shadow-lg"
        >
          Jetzt anmelden
        </Button>
      </form>
    </Form>
  );
};
