import { parseCSV } from "../src/basic-parser";
import * as path from "path";
import { z } from "zod";

const TEST_CSV_PATH = path.join(__dirname, "../data/peopleschema.csv");

test("parseCSV works with input schema", async () => {
	const schema = z.tuple([z.string(), z.string()]);

	const result = await parseCSV(TEST_CSV_PATH, schema);

	expect(result).toEqual([
		["Alice", "London"],
		["Bob", "Boston"],
		["Charlie", "Lexington"],
		["Nim", "Tampa"],
	]);
});