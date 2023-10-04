"use client";

import { Trash } from "lucide-react";
import { useEffect } from "react";
import { FancyMultiSelect } from "../ui/FancyMultiSelect";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { MyForm } from "./RegistrationForm";
import {
  disziplinByKey,
  disziplinToMultiselectItem,
  disziplinenByJahrgang,
} from "./disziplinen";

export const Teilnehmer = ({ form }: { form: MyForm }) => {
  const tns = form.watch("teilnehmer");
  useEffect(() => {
    if (tns.every((t) => t.name.trim().length)) {
      form.setValue("teilnehmer", [
        ...tns,
        { name: "", geburtsjahr: 2010, geschlecht: "m", disziplinen: [] },
      ]);
    }

    // console.table(tns);
  }, [form, tns]);

  return (
    <Card className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Teilnehmer</h2>

      <FormDescription className="sm:hidden">
        Tabelle horizontal scrollen um Disziplinen einzutragen.
      </FormDescription>
      <FormField
        control={form.control}
        name="teilnehmer"
        render={({ field }) => {
          const set = <T extends keyof (typeof field.value)[number]>(
            index: number,
            prop: T,
            value: any
          ) => {
            const newData = [...field.value];
            newData[index][prop] = value;
            field.onChange(newData);
          };

          return (
            <FormItem>
              <FormControl>
                <Table className="min-w-[500px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Geburtsjahr</TableHead>
                      <TableHead>Geschlecht</TableHead>
                      <TableHead>Disziplinen</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {field.value.length ? (
                      field.value.map((tn, index) => {
                        return (
                          <TableRow key={`tn_${index}`}>
                            <TableCell>
                              <Input
                                className="w-44"
                                value={tn.name}
                                onChange={(e) =>
                                  set(index, "name", e.currentTarget.value)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <Input
                                className="w-24"
                                value={tn.geburtsjahr}
                                type="number"
                                onChange={(e) => {
                                  set(
                                    index,
                                    "geburtsjahr",
                                    parseInt(e.currentTarget.value)
                                  ),
                                    set(index, "disziplinen", []);
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                onValueChange={(v) =>
                                  set(index, "geschlecht", v)
                                }
                                value={tn.geschlecht}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Geschlecht</SelectLabel>
                                    <SelectItem value={"m"}>m</SelectItem>
                                    <SelectItem value={"w"}>w</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <div className="min-w-80">
                                <FancyMultiSelect
                                  items={disziplinenByJahrgang(tn.geburtsjahr)
                                    .map(disziplinToMultiselectItem)
                                    .filter(
                                      (val) =>
                                        !tn.disziplinen.includes(val.value)
                                    )}
                                  selected={tn.disziplinen
                                    .map(disziplinByKey)
                                    .filter(Boolean)
                                    .map((d) => disziplinToMultiselectItem(d!))}
                                  setSelected={(values) => {
                                    const seen = new Set();
                                    const deduplicated = values.filter(
                                      (value) => {
                                        if (seen.has(value.value)) {
                                          return false;
                                        }
                                        seen.add(value.value);
                                        return true;
                                      }
                                    );

                                    set(
                                      index,
                                      "disziplinen",
                                      deduplicated.map((d) => d.value)
                                    );
                                  }}
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    type="button"
                                    variant={"destructive"}
                                    size={"sm"}
                                    onClick={() => {}}
                                  >
                                    <Trash className="w-3" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>Löschen</AlertDialogHeader>
                                  <AlertDialogDescription>
                                    {tn.name.trim()
                                      ? `${tn.name} wirklich aus der Liste entfernen?`
                                      : "Diesen Eintrag wirklich löschen?"}
                                  </AlertDialogDescription>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Nein, doch nicht
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => {
                                        const originalList = [...tns];
                                        const newList = originalList.filter(
                                          (_t, i) => index !== i
                                        );
                                        form.setValue("teilnehmer", newList);
                                      }}
                                    >
                                      Ja, entfernen
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center text-muted-foreground md:p-2"
                        >
                          Noch keine Teilnehmer
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </Card>
  );
};
