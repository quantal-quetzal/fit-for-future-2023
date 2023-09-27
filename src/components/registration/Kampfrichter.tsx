"use client";

import { Card } from "../ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { MyForm } from "./RegistrationForm";

export const Kampfrichter = ({ form }: { form: MyForm }) => {
  return (
    <Card className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Kampfrichter</h2>
      <FormField
        control={form.control}
        name="kampfrichter.name"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Name</FormLabel>
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
        name="kampfrichter.qualifikation"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>Qualifikation</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row flex-wrap gap-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0 border border-input p-2 rounded">
                    <FormControl>
                      <RadioGroupItem value={"F1"} />
                    </FormControl>
                    <FormLabel className="font-normal">F1</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 border border-input p-2 rounded">
                    <FormControl>
                      <RadioGroupItem value={"E1"} />
                    </FormControl>
                    <FormLabel className="font-normal">E1</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 border border-input p-2 rounded">
                    <FormControl>
                      <RadioGroupItem value={"D1"} />
                    </FormControl>
                    <FormLabel className="font-normal">D1</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 border border-input p-2 rounded">
                    <FormControl>
                      <RadioGroupItem value={"keine"} />
                    </FormControl>
                    <FormLabel className="font-normal">keine</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </Card>
  );
};
