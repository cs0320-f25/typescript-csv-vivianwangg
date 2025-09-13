import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const CORRECT_CSV_PATH = path.join(__dirname, "../data/schemaCorrect.csv");
const INCORRECT_CSV_PATH = path.join(__dirname, "../data/schemaIncorrect.csv");
const NOSCHEMA_CSV_PATH = path.join(__dirname, "../data/noschema.csv");

test("parseCSV parses CSV with all successful rows", async () => {
    const schema = z.tuple([z.string(), z.coerce.number()]);

    const result = await parseCSV(CORRECT_CSV_PATH, schema);

    result.forEach((row) => {
      if ("success" in row) {
        expect(row.success).toBe(true);
      } else {
        throw new Error("Expected ZodSafeParseResult");
      }
    });
}); 

test("returns ZodSafeParseResult[] when schema is provided and some rows are invalid", async () => {
  const schema = z.tuple([z.string(), z.coerce.number()]);

  const result = await parseCSV(INCORRECT_CSV_PATH, schema);

  if ("success" in result[0] && "success" in result[1] && "success" in result[2]) {
    expect(result[0].success).toBe(true); 
    expect(result[1].success).toBe(false);  
    expect(result[2].success).toBe(true);   
  } else {
    throw new Error("Expected ZodSafeParseResult[], got string[][]");
  }
});

test("returns string[][] when no schema is provided", async () => {
    const result = await parseCSV(NOSCHEMA_CSV_PATH);

    expect(result).toEqual([
      ["X", "Y", "Z"],
      ["1", "2", "3"],
      ["4", "5", "6"],
    ]);
});
