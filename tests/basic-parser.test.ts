import { parseCSV } from "../src/basic-parser";
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const EMPTY_CSV_PATH = path.join(__dirname, "../data/empty.csv")
const EMPTY_FIELDS_CSV_PATH = path.join(__dirname, "../data/empty-fields.csv")
const COMMAS_CSV_PATH = path.join(__dirname, "../data/commas.csv")
const QUOTES_CSV_PATH = path.join(__dirname, "../data/quotes.csv")

/*
PEOPLE.CSV
*/

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)

  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parser should ignore blank lines", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  expect(results).toHaveLength(6);
  expect(results[5]).toEqual(["Yoojin", "20"]);
});

/*
EMPTY.CSV
*/

test("parsing empty CSV yields empty results", async () => {
  const results = await parseCSV(EMPTY_CSV_PATH);
  expect(results).toEqual([]);
});

/*
EMPTY-FIELDS.CSV
*/

test("parser preserves empty middle field", async () => {
  const results = await parseCSV(EMPTY_FIELDS_CSV_PATH);
  expect(results[2]).toEqual(["Bob", "", "Providence"]);
});

test("parser preserves empty first field", async () => {
  const results = await parseCSV(EMPTY_FIELDS_CSV_PATH);
  expect(results[4]).toEqual(["", "Nim", "New York"]);
});

test("parser preserves empty last field", async () => {
  const results = await parseCSV(EMPTY_FIELDS_CSV_PATH);
  expect(results[3]).toEqual(["Charlie", "25", ""]);
});

/*
COMMAS.CSV
*/

test("parser handles commas within quoted fields", async () => {
  const results = await parseCSV(COMMAS_CSV_PATH);
  expect(results[1]).toEqual(["Alice", "veggies, milk"]);
  expect(results[2]).toEqual(["Bob", "chia seeds"]);
  expect(results[3]).toEqual(["Nim", "yogurt, mangos, yum"]);
});

/*
QUOTES.CSV
*/

test("parseCSV handles escaped double quotes", async () => {
  const results = await parseCSV(QUOTES_CSV_PATH);
  expect(results[1]).toEqual(["Yoojin", 'Yoojin said "hi"']);
});
