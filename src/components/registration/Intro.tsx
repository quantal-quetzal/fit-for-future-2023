"use client";

import { Card } from "../ui/card";

export const Intro = () => {
  return (
    <Card className="p-4 mt-6 space-y-6">
      <p className="text-sm">
        Hier kannst Du Deine Meldung für die 2. Nachwuchs-Sichtung »Fit for
        Future« der DLRG Ennigerloh für 5- bis 14-jährige Kinder absetzen. Die
        komplette Ausschreibung findest du unter{" "}
        <a
          className="underline decoration-purple-400"
          href="https://rettungssport.com/wettkampf/2-fit-for-future-2023/"
        >
          https://rettungssport.com/wettkampf/2-fit-for-future-2023/
        </a>
        .
      </p>
    </Card>
  );
};
