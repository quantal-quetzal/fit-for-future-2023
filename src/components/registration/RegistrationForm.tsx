"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { UseFormReturn, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Allgemein } from "./Allgemein";
import { Gebuehren } from "./Gebuehren";
import { Kampfrichter } from "./Kampfrichter";
import { Teilnehmer } from "./Teilnehmer";
import { Zusammenfassung } from "./Zusammenfassung";
import { FormSchema, formSchema } from "./schema";

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
      teilnehmer: [],
    },
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const { mutateAsync: submit, isLoading } = useMutation({
    mutationFn: async (data: FormSchema) => {
      await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    },
  });

  const onSubmit = async (values: FormSchema) => {
    await submit(values);
    // router.push("/success");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pb-10">
        <Allgemein form={form} />
        <Gebuehren form={form} />
        <Kampfrichter form={form} />
        <Teilnehmer form={form} />
        <Zusammenfassung form={form} />
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-purple-400 to-pink-600 w-full font-bold shadow-lg"
        >
          Jetzt anmelden
        </Button>
      </form>
    </Form>
  );
};
