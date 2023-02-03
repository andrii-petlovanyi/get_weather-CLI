import { getArgs } from "./helpers/arg.js";
import { getWeather } from "./services/api.service.js";
import { printError, printHelp, printSuccess } from "./services/log.service.js";
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("No token");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Token saved successfully");
  } catch (error) {
    printError(error.message);
  }
};

const iniCLI = async () => {
  const args = getArgs(process.argv);
  if (args.h) {
    printHelp();
  }

  if (args.s) {
    return;
  }

  if (args.t) {
    return saveToken(args.t);
  }

  await getWeather("Lviv");
};

iniCLI();
