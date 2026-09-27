import { writeFileSync } from "node:fs";
import { handleProgramArg, die } from "./utils";

const usage = 'Usage: npm run makebin FILEPATH \'OPCODES\'';

const main = () => {
  const filePathArg = process.argv[2];
  const programArg = process.argv[3];

  if (!filePathArg || !programArg) {
    return die(usage);
  }

  const program = handleProgramArg(programArg);

  if (!program || program.length === 0) {
    return die(usage);
  }

  try {
    writeFileSync(filePathArg, Buffer.from(program));
  } catch (err) {
    return die(err.message);
  }
};

main();
