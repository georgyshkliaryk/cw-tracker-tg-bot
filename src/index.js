import TelegramBot from 'node-telegram-bot-api';
import { TG_AUTH_TOKEN, API_SERVICE_URL, CLAN_ID, maxStarsPossible, commands } from './constants.js';
import { getTimeLeftText, getWarResultsText } from './helpers.js';
import { sendRequest } from './request.js';

const bot = new TelegramBot(TG_AUTH_TOKEN, { polling: true });

const currentWarEndpoint = `${API_SERVICE_URL}/clans/${CLAN_ID}/currentwar`;

bot.onText(commands.cw, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const data = await sendRequest(currentWarEndpoint);
    const { state, teamSize, attacksPerMember, startTime, endTime, clan, opponent } = data;

    let message = '';
    if (state === 'notInWar') {
      message = `${clan.name} is not in war`;
    }
    message = `
${clan.name} vs ${opponent.name}
${getWarResultsText(state, clan.stars, opponent.stars, clan.destructionPercentage, opponent.destructionPercentage)}
${clan.stars} : ${opponent.stars}
${getTimeLeftText(state, endTime, startTime)}
______________________________________
${clan.name}
stars: ${clan.stars}/${maxStarsPossible * teamSize}
attacks: ${clan.attacks}/${attacksPerMember * teamSize}
destruction: ${clan.destructionPercentage}%
______________________________________
${opponent.name}
stars: ${opponent.stars}/${maxStarsPossible * teamSize}
attacks: ${opponent.attacks}/${attacksPerMember * teamSize}
destruction: ${opponent.destructionPercentage}%
`;
    bot.sendMessage(chatId, message);
  } catch (error) {
    bot.sendMessage(chatId, `Failed to fetch data, try again later. [${error.message}]`);
  }
});
