import { getArgs } from "./helpers/arg.js";
import { getIcon, getWeather } from "./services/api.service.js";
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from "./services/log.service.js";
import {
  getKeyValue,
  saveKeyValue,
  TOKEN_DICTIONARY,
} from "./services/storage.service.js";

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

const saveCity = async (city) => {
  if (!city.length) {
    printError("No city name");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("City name saved successfully");
  } catch (error) {
    printError(error.message);
  }
};

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
    const weather = await getWeather(city);
    printWeather(weather, getIcon(weather.weather[0].icon));
  } catch (error) {
    if (error?.response?.status == 404) {
      printError("Wrong city name");
    } else if (error?.response?.status == 401) {
      printError("Wrong token");
    } else if (error?.response?.status == 400) {
      printError("Please set city name with command -s [CITY]");
    } else {
      printError(error.message);
    }
  }
};

const iniCLI = async () => {
  const args = getArgs(process.argv);
  if (args.h) {
    return printHelp();
  }

  if (args.s) {
    return await saveCity(args.s);
  }

  if (args.t) {
    return await saveToken(args.t);
  }

  return await getForecast();
};

iniCLI();
