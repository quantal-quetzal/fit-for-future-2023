"use client";

import { Listbox } from "@headlessui/react";
import { Portal } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

const people = [
  { id: 1, name: "Durward Reynolds", unavailable: false },
  { id: 2, name: "Kenton Towne", unavailable: false },
  { id: 3, name: "Therese Wunsch", unavailable: false },
  { id: 4, name: "Benedict Kessler", unavailable: true },
  { id: 5, name: "Katelyn Rohan", unavailable: false },
];

export function MyListbox() {
  const [selectedPeople, setSelectedPeople] = useState<typeof people>([
    people[0],
  ]);

  return (
    <Listbox value={selectedPeople} onChange={setSelectedPeople} multiple>
      <Listbox.Button>
        <Input value={selectedPeople.map((p) => p.name).join()} />
      </Listbox.Button>
      <Listbox.Options>
        <Portal>
          <Card className="absolute z-10">
            {people.map((person) => (
              <Listbox.Option
                key={person.id}
                value={person}
                disabled={person.unavailable}
              >
                {person.name}
              </Listbox.Option>
            ))}
          </Card>
        </Portal>
      </Listbox.Options>
    </Listbox>
  );
}
