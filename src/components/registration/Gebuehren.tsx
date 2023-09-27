"use client";

import { Card } from "../ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { MyForm } from "./RegistrationForm";

export const Gebuehren = ({ form }: { form: MyForm }) => {
  return (
    <Card className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Gebühren</h2>
      <FormDescription>
        Von folgendem Konto darf die Teilnahmegebühr sowie die Kaution für
        Kampfrichter eingezogen werden
      </FormDescription>
      <FormField
        control={form.control}
        name="gebuehren.iban"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>IBAN</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="gebuehren.kontoinhaber"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Kontoinhaber</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </Card>
  );
};
