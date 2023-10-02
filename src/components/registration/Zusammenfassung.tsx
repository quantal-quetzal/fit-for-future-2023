"use client";

import { ReactNode } from "react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { MyForm } from "./RegistrationForm";
import { disziplinByKey } from "./disziplinen";

export function TypographyP() {
  return (
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      The king, seeing how much happier his subjects were, realized the error of
      his ways and repealed the joke tax.
    </p>
  );
}

export function span({ children }: { children: ReactNode }) {
  return <small className="text-sm font-medium leading-none">{children}</small>;
}

export const Zusammenfassung = ({ form }: { form: MyForm }) => {
  const data = form.watch();
  if (!form.formState.isValid) {
    return null;
  }

  return (
    <Card className="p-4 space-y-6 text-sm">
      <h2 className="text-xl font-bold">Zusammenfassung</h2>
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-bold">Email:</span> <span>{data.email}</span>
          <br />
          <span className="font-bold">Ortsgruppe:</span>{" "}
          <span>{data.ortsgruppe}</span>
        </div>

        <div>
          <span className="font-bold">Ansprechpartner:</span>
          <div className="ml-3 text-gray-900">
            {" "}
            {`${data.ansprechpartner.name} (Tel.: ${data.ansprechpartner.telefon})`}
          </div>
        </div>

        <div>
          <span className="font-bold">Gebühren:</span>
          <div className="ml-3">IBAN: {data.gebuehren.iban}</div>
          <div className="ml-3">
            Kontoinhaber: {data.gebuehren.kontoinhaber}
          </div>
        </div>

        <div>
          <span className="font-bold">Kampfrichter:</span>
          <div className="ml-3">Name: {data.kampfrichter.name}</div>
          <div className="ml-3">
            Qualifikation: {data.kampfrichter.qualifikation}
          </div>
        </div>

        <div>
          <span className="font-bold">Teilnehmer:</span>
          <ul className="list-disc pl-5">
            {data.teilnehmer
              .filter((t) => t.name.trim())
              .map((teilnehmer, index) => (
                <li key={index} className="mb-2">
                  <span>
                    {`${teilnehmer.name} (${teilnehmer.geburtsjahr}, ${
                      teilnehmer.geschlecht === "m" ? "männlich" : "weiblich"
                    })`}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    Disziplinen: [
                    {teilnehmer.disziplinen.map(disziplinByKey).map((d) => {
                      return (
                        <Badge variant={"secondary"} key={d?.key}>
                          {d?.displayName}
                        </Badge>
                      );
                    })}
                    ]
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};
