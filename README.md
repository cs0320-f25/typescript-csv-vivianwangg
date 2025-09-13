# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.

Fixes:

1. Handle cases where there are commas inside a string field eg. (Yoojin, 20, "spinach, mango")
2. Handle nested quotes inside a string field

Enhancements:

3. Return objects instead of String[][] using the first row as header fields
4. Let user specify more information about the CSV: number of fields, type for each fields
5. Conversions for fields when needed eg "thirty" -> 30

- #### Step 2: Use an LLM to help expand your perspective.

Parsing Robustness - consider:

- quoted fields which might contain additional commas, quotes, or newlines
- empty rows
- variable row lengths (define how to handle when row length doesn't match header)

Schema, Validation, & Types:

- allow the caller to pass in a schema (zod) that describes a row
- validate the rows against the schema to ensure each row satisfies the caller intention
- type safety: use the schema to produce strongly typed objects

Error Handling & Reporting:

- Report line number and context when parsing fails
- Let caller choose whether malformed rows should stop parsing or be skipped + logged

Performance & Scalability:

- To handle larger files: support streaming parse rather than loading the entire file into memory

- #### Step 3: use an LLM to help expand your perspective.

  Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition.

  1. As a user of the parser, I want quoted fields that contain commas, newlines, or quotes to be handled correctly so my quoted inputs will be processed exactly as written. - Functionality - Both
  2. As a user of the parser, I want to define the expected structure of each row so I can rely on the parsed output matching the shape I need. - Extensibility - Both
  3. As a user, I want clear error messages with row and column details when parsing fails, so I can quickly identify and fix problems in my CSV file. - Extensibility - LLM
  4. As a user of the parser, I want to parse CSV files efficiently so that I can efficiently handle very large datasets without running out of memory. - Functionality - LLM

  Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.)

  - I initially used my unit tests for task A to find errors in the basic parser and proposed fixes given these errors. I started prompting the LLM with a general statement then got more specific; the results also became more specific as the LLM gathered more context about the existing basic-parser. As I prompted for more suggestions, the LLM gave more creative, 'nice to have' features while the first features it proposed were needed fixes and basic enhancements. It resonated with me that that LLM prioritized the fundamental functionality of the parser before making other suggestions. It didn't resonate with me that the LLM output was a bit disorganized at first - I prompted it to create distinct categories.

### Design Choices

### 1340 Supplement

- #### 1. Correctness

1. Each line in the CSV file should be read as a row.
2. Within a row, fields should be separated correctly. The parser should not introduce extra fields or combine fields incorrectly.
3. If a field is wrapped in quotes, the parser should respect it as a single value, even if it contains commas inside.
4. When using a schema, each parsed field should either match the expected type or return an error.

- #### 2. Random, On-Demand Generation

Instead of only checking a few specific example csvs that I have written (which are only a few lines each), with
random, on-demand generation, I could expand testing to larger data sets with more variety in structure. These data
sets might also include further edge cases and more complicated scenarios which I have not thought of in my own
csv testing files.

- #### 3. Overall experience, Bugs encountered and resolved
  This sprint differed from prior programming assignments as it is the first assignment I've done in Typescript and first
  time working with the concept of a parser. In particular, I was unsure of what the return type of my parser function should be and how to implement it in a way that is consistent with the original tests from task A. I solved this issue by talking with peers/TAs in collab hours. There was definitely a learning curve but I feel more comfortable with these topics now.

#### Errors/Bugs:

There are still existing errors in this parser that violate the user stories from task B. For instance, under the
current implementation, having commas in a quoted field will not parse correctly.

#### Tests:

In task A, I tried to test edge cases and potentially unexpected inputs. I also looked at the basic parser implementation
and guessed at what would make it parse a file incorrectly. In task C, I tested each return case of my parser: when no schema was
provided, when a schema was provided and all lines were correctly formatted, when a schema was provided but some lines
were incorrectly formatted.

These tests are located in two separate test files:

1. basic-parser.test.ts includes my tests after task A (no schema inputs) [TASK A]
2. schema-parser.test.ts includes my tests with schema inputs [TASK C]

#### How To…

to run run-parser.ts: npm run run
to run basic-parser unit tests with no schema input (task A): npm test basic-parser.test.ts
to run tests with schema inputs (task C): npm test schema-parser.test.ts

#### Team members and contributions (include cs logins):

See collaborators

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):

jgcasale - discussed parser return types during collab hours
yliao36 - discussed overload signatures in reference to edstem post #56
ChatGPT helped explain the concept of union types and use cases/expected behavior of a parser

#### Total estimated time it took to complete project: 8 hours

#### Link to GitHub Repo: https://github.com/cs0320-f25/typescript-csv-vivianwangg
