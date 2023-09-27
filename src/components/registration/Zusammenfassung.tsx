"use client";

import { Card } from "../ui/card";
import { FormDescription } from "../ui/form";
import { MyForm } from "./RegistrationForm";

export const Zusammenfassung = ({ form }: { form: MyForm }) => {
  return (
    <Card className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Zusammenfassung</h2>
      <FormDescription>
        Mit Klick auf den unten stehenden Button meldest du folgende Daten.
      </FormDescription>
    </Card>
  );
};
