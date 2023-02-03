import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
  console.log(chalk.bgRed(" ERROR: ") + " " + error);
};

const printSuccess = (message) => {
  console.log(chalk.bgGreen(" SUCCESS: ") + " " + message);
};

const printHelp = () => {
  console.log(
    dedent`
      ${chalk.bgCyan(" HELP ")}
      No parameters - display weather
      -s [CITY] set your city
      -h to get help about CLI
      -t [API_KEY] to set token for CLI`
  );
};

export { printError, printSuccess, printHelp };
