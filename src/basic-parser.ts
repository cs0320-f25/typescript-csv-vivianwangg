import * as fs from "fs";
import * as readline from "readline";
import { z, ZodSafeParseResult } from "zod";

/**
 * This is a JSDoc comment. Similar to JavaDoc, it documents a public-facing
 * function for others to use. Most modern editors will show the comment when 
 * mousing over this function name. Try it in run-parser.ts!
 * 
 * File I/O in TypeScript is "asynchronous", meaning that we can't just
 * read the file and return its contents. You'll learn more about this 
 * in class. For now, just leave the "async" and "await" where they are. 
 * You shouldn't need to alter them.
 * 
 * @param path The path to the file being loaded.
 * @returns a "promise" to produce a 2-d array of cell values
 */


export async function parseCSV<T>(path: string, schema?: z.ZodType<T>): Promise< ZodSafeParseResult<T>[] | string[][]> {
  const fileStream = fs.createReadStream(path);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity, // handle different line endings
  });

  if(schema){
    const rows: ZodSafeParseResult<T>[] = [];
    for await (const line of rl) {
      const values = line.split(",").map((v) => v.trim());
      const parsed = schema.safeParse(values);
      rows.push(parsed);
    }
    return rows;
  } else{
    const rows: string[][] = [];
    for await (const line of rl) {
      const values = line.split(",").map((v) => v.trim());
      rows.push(values);
    }
    return rows;
  }
}