import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const CORRECT_CSV_PATH = path.join(__dirname, "../data/schemaCorrect.csv");
const INCORRECT_CSV_PATH = path.join(__dirname, "../data/schemaIncorrect.csv");

test("parseCSV works with input schema and correct csv", async () => {
	const schema = z.tuple([z.string(), z.string()]);

	const result = await parseCSV(CORRECT_CSV_PATH, schema);

	expect(result).toEqual([
		["Alice", "London"],
		["Bob", "Boston"],
		["Charlie", "Lexington"],
		["Nim", "Tampa"],
	]);
});

test("parseCSV returns error with input schema and incorrect csv", async () => {
	const schema = z.tuple([z.string(), z.string()]);
	const result = await parseCSV(CORRECT_CSV_PATH, schema);
	expect(result).toEqual(z.ZodError)
});

test("parseCSV returns string[][] when input schema undefined", async () => {
	const result = await parseCSV(INCORRECT_CSV_PATH);
	expect(result).toEqual([
		["Alice", "London"],
		["Bob", "Boston"],
		["Charlie", "Lexington"],
		["Nim", "Tampa"],
	]);
});