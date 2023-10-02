export type Disziplin = {
  key: string;
  displayName: string;
  jahrgang_verfuegbar: number[];
};

export const anzahlDisziplinen = (jahrgang: number): number =>
  jahrgang >= 2013 ? 3 : 4;

export const disziplinen: Disziplin[] = [
  {
    key: "25mHindernis",
    displayName: "25m Hindernis",
    jahrgang_verfuegbar: [2016, 2015],
  },
  {
    key: "25mFreiFlGurt",
    displayName: "25m Freistil mit Flossen und Gurtretter",
    jahrgang_verfuegbar: [2016, 2015],
  },
  {
    key: "50mHindernis",
    displayName: "50m Hindernis",
    jahrgang_verfuegbar: [2014, 2013],
  },
  {
    key: "50mFreiFlGurt",
    displayName: "50m Freistil mit Flossen und Gurtretter",
    jahrgang_verfuegbar: [2014, 2013],
  },
  {
    key: "25mBeinschlag",
    displayName: "25m Beinschlag mit Brett",
    jahrgang_verfuegbar: [2016, 2015, 2014, 2013],
  },
  {
    key: "100mHindernis",
    displayName: "100m Hindernis",
    jahrgang_verfuegbar: [2011, 2012],
  },
  {
    key: "50mRettenTauchring",
    displayName: "50m Retten eines Tauchringes",
    jahrgang_verfuegbar: [2012],
  },
  {
    key: "5mKombiTauchring",
    displayName: "50m Kombi (Tauchring)",
    jahrgang_verfuegbar: [2011, 2012],
  },
  {
    key: "50mRettenKleinePuppe",
    displayName: "50m Retten einer kleine Puppe",
    jahrgang_verfuegbar: [2011, 2010],
  },
  {
    key: "50mFlossen",
    displayName: "50m Flossen",
    jahrgang_verfuegbar: [2012],
  },
  {
    key: "100mFlossen",
    displayName: "100m Flossen",
    jahrgang_verfuegbar: [2011],
  },
  {
    key: "50mLifesaverOhnePuppe",
    displayName: "50m Lifesaver (ohne Puppe)",
    jahrgang_verfuegbar: [2012],
  },
  {
    key: "100mLifesaverOhnePuppe",
    displayName: "100m Lifesaver (ohne Puppe)",
    jahrgang_verfuegbar: [2011, 2010],
  },
  {
    key: "100mSuperLifesaverOhnePuppe",
    displayName: "100m Super Lifesaver (ohne Puppe)",
    jahrgang_verfuegbar: [2009, 2010],
  },
  {
    key: "50mLifesaver",
    displayName: "50m Lifesaver",
    jahrgang_verfuegbar: [2009],
  },
  {
    key: "50mRettenPuppe",
    displayName: "50m Retten einer Puppe",
    jahrgang_verfuegbar: [2008, 2009],
  },
  {
    key: "150mHindernis",
    displayName: "150m Hindernis",
    jahrgang_verfuegbar: [2010],
  },
  {
    key: "50mKombi",
    displayName: "50m Kombi",
    jahrgang_verfuegbar: [2009, 2010],
  },
  {
    key: "50mRettenKleinePuppeFlossen",
    displayName: "50m Retten einer kleinen Puppe mit Flossen",
    jahrgang_verfuegbar: [2010],
  },
  {
    key: "100mRettenKleinePuppeFlossen",
    displayName: "100m Retten einer kleinen Puppe mit Flossen",
    jahrgang_verfuegbar: [2009],
  },
  {
    key: "100mRettenPuppeFlossen",
    displayName: "100m Retten einer Puppe mit Flossen",
    jahrgang_verfuegbar: [2008],
  },
  {
    key: "200mHindernis",
    displayName: "200m Hindernis",
    jahrgang_verfuegbar: [2008, 2009],
  },
  {
    key: "100mKombiRettungsübung",
    displayName: "100m Kombinierte Rettungsübung",
    jahrgang_verfuegbar: [2008],
  },
  {
    key: "100mLifesaver",
    displayName: "100m Lifesaver",
    jahrgang_verfuegbar: [2008],
  },
  {
    key: "200mSuperLifesaver",
    displayName: "200m Super Lifesaver",
    jahrgang_verfuegbar: [2008],
  },
];

export const disziplinenByJahrgang = (jahrgang: number) =>
  disziplinen.filter((d) => d.jahrgang_verfuegbar.includes(jahrgang));

export const disziplinToMultiselectItem = (d: Disziplin) => ({
  label: d.displayName,
  value: d.key,
});

export const disziplinByKey = (key: string): Disziplin | undefined =>
  disziplinen.find((d) => d.key === key);
