import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import {
  PORT,
  SERVER_URL,
  COC_AUTH_TOKEN,
  TG_AUTH_TOKEN,
  maxStarsPossible,
  commands,
  commandsToEndpointMap,
  endpoints,
} from './constants.js';
import { getTimeLeftText, getWarResultsText } from './helpers.js';
import { sendRequest } from './request.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Server for cw tracker tg bot');
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}...`);
});

const bot = new TelegramBot(TG_AUTH_TOKEN, { polling: true });

const getCwInfo = async (endpoint) => {
  const authHeaders = {
    Authorization: `Bearer ${COC_AUTH_TOKEN}`,
  };

  const data = await sendRequest(endpoint, authHeaders);
  const { state, teamSize, attacksPerMember, startTime, endTime, clan, opponent } = data;

  if (state === 'notInWar') {
    return `clan is not currently in war`;
  }
  return `
${clan.name} vs ${opponent.name}
${getWarResultsText(state, clan.stars, opponent.stars, clan.destructionPercentage, opponent.destructionPercentage)}
${clan.stars} : ${opponent.stars}
${getTimeLeftText(state, endTime, startTime)}

${clan.name}
stars: ${clan.stars}/${maxStarsPossible * teamSize}
attacks: ${clan.attacks}/${attacksPerMember * teamSize}
destruction: ${clan.destructionPercentage}%

${opponent.name}
stars: ${opponent.stars}/${maxStarsPossible * teamSize}
attacks: ${opponent.attacks}/${attacksPerMember * teamSize}
destruction: ${opponent.destructionPercentage}%
`;
};

bot.onText(commands.getBothCw(), async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  try {
    const endpoint = commandsToEndpointMap[text];
    if (!endpoint) {
      return;
    }
    const message = await getCwInfo(endpoint);
    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, `Failed to fetch data. [${error.message}]`);
  }
});

// server wake up
const wakeUpServer = () => {
  sendRequest(SERVER_URL);
};

const tenMinutes = 10 * 60 * 1000;

setInterval(wakeUpServer, tenMinutes);
wakeUpServer();
