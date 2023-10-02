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

export const Allgemein = ({ form }: { form: MyForm }) => {
  return (
    <Card className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Allgemein</h2>
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>E-Mail Adresse</FormLabel>
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
        name="ortsgruppe"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Ortsgruppe</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Für welche Ortsgruppe meldest du?
              </FormDescription>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={form.control}
        name="ansprechpartner.name"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Name des Ansprechpartners</FormLabel>
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
        name="ansprechpartner.telefon"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Mobilnummer des Ansprechpartners</FormLabel>
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
