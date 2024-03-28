import 'dotenv/config';

export const TG_AUTH_TOKEN = process.env.TG_AUTH_TOKEN;
export const COC_AUTH_TOKEN = process.env.COC_AUTH_TOKEN;
export const PORT = process.env.PORT || 3000;
export const API_SERVICE_URL = 'https://cocproxy.royaleapi.dev/v1';
export const CLAN_ID = '%232GUYURGLL';

export const maxStarsPossible = 3;
export const commands = {
  cw: /\/cw/,
};
export const endpoints = {
  currentWar: `${API_SERVICE_URL}/clans/${CLAN_ID}/currentwar`,
};
