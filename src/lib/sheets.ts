import { FormSchema } from "@/components/registration/schema";
import { google } from "googleapis";

import { disziplinByKey } from "@/components/registration/disziplinen";

const sheetsApi = google.sheets({ version: "v4" });

const spreadsheetId = process.env.SPREADSHEET_ID;
const templateSheetId = parseInt(process.env.TEMPLATE_SHEET_ID!);

const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON!);

const generateRandomString = (length: number) => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
};

export const createDataSheetFromTemplate = async (
  data: FormSchema
): Promise<void> => {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const newSheetName = `${data.ortsgruppe} (#${generateRandomString(4)})`;

  // Duplicate the template sheet
  const duplicateSheetResponse = await sheetsApi.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [
        {
          duplicateSheet: {
            newSheetName,
            sourceSheetId: templateSheetId,
            insertSheetIndex: 999,
          },
        },
      ],
    },
    auth,
  });

  const newSheetId =
    duplicateSheetResponse.data.replies?.[0].duplicateSheet?.properties
      ?.sheetId;

  if (!newSheetId)
    throw new Error(
      "Error creating sheet. No 'newSheetId' received in response."
    );

  const promises: Promise<unknown>[] = [];

  promises.push(
    replacePlaceholderWithValue({
      auth,
      sheetName: newSheetName,
      placeholder: "EMAIL",
      value: data.email,
    })
  );
  promises.push(
    replacePlaceholderWithValue({
      auth,
      sheetName: newSheetName,
      placeholder: "ORTSGRUPPE",
      value: data.ortsgruppe,
    })
  );
  promises.push(
    replacePlaceholderWithValue({
      auth,
      sheetName: newSheetName,
      placeholder: "ANSPRECHPARTNER_NAME",
      value: data.ansprechpartner.name,
    })
  );
  promises.push(
    replacePlaceholderWithValue({
      auth,
      sheetName: newSheetName,
      placeholder: "ANSPRECHPARTNER_TEL",
      value: data.ansprechpartner.telefon,
    })
  );
  promises.push(
    replacePlaceholderWithValue({
      auth,
      sheetName: newSheetName,
      placeholder: "KARI_NAME",
      value: data.kampfrichter.name,
    })
  );
  promises.push(
    replacePlaceholderWithValue({
      auth,
      sheetName: newSheetName,
      placeholder: "KARI_LIZENZ",
      value: data.kampfrichter.qualifikation,
    })
  );
  promises.push(
    replacePlaceholderWithValue({
      auth,
      sheetName: newSheetName,
      placeholder: "GEBUEHREN_IBAN",
      value: data.gebuehren.iban,
    })
  );
  promises.push(
    replacePlaceholderWithValue({
      auth,
      sheetName: newSheetName,
      placeholder: "GEBUEHREN_KONTOINHABER",
      value: data.gebuehren.kontoinhaber,
    })
  );
  promises.push(
    replacePlaceholderWithValue({
      auth,
      sheetName: newSheetName,
      placeholder: "MELDEZEITPUNKT",
      value: new Date().toISOString(),
    })
  );
  promises.push(
    replacePlaceholderWithValue({
      auth,
      sheetName: newSheetName,
      placeholder: "TEILNEHMER",
      value: data.teilnehmer
        .filter((t) => !!t.name)
        .map((t) => [
          t.name,
          t.geschlecht,
          t.geburtsjahr + "",
          ...t.disziplinen
            .sort()
            .map((d) => disziplinByKey(d))
            .map((d) => d?.displayName!),
        ]),
    })
  );

  await Promise.all(promises);
};

const replacePlaceholderWithValue = async ({
  auth,
  sheetName,
  placeholder,
  value,
}: {
  auth: any;
  sheetName: string;
  placeholder: string;
  value: string | string[][];
}): Promise<void> => {
  const searchResponse = await sheetsApi.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:AZ100`,
    auth,
  });

  let targetCell: string | null = null;
  const rows = searchResponse.data.values;
  if (rows) {
    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const cells = rows[rowIndex];
      for (let colIndex = 0; colIndex < cells.length; colIndex++) {
        if (cells[colIndex] === placeholder) {
          targetCell = `${String.fromCharCode(65 + colIndex)}${rowIndex + 1}`; // Convert column index to letter
          break;
        }
      }
      if (targetCell) break;
    }
  }

  // Replace the value in the newly created sheet
  if (targetCell) {
    await sheetsApi.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!${targetCell}`,
      valueInputOption: "RAW",
      requestBody: {
        values: typeof value === "string" ? [[value]] : value,
      },
      auth,
    });
  }
};
