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

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved

#### Errors/Bugs:

#### Tests:

#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):

#### Total estimated time it took to complete project:

#### Link to GitHub Repo:
