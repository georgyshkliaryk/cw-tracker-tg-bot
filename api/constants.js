import 'dotenv/config';

export const TG_AUTH_TOKEN = process.env.TG_AUTH_TOKEN;
export const COC_AUTH_TOKEN = process.env.COC_AUTH_TOKEN;
export const PORT = process.env.PORT || 3000;
export const API_SERVICE_URL = 'https://cocproxy.royaleapi.dev/v1';
export const CLAN_ID = '%23YLQQUY2U';
export const CLAN_ID2 = '%232RGQL98GL';

export const maxStarsPossible = 3;
export const commands = {
  cw: '/cw',
  cw2: '/cw2',
  getBothCw() {
    return new RegExp(`${this.cw}|${this.cw2}`);
  },
};
export const endpoints = {
  currentWar: `${API_SERVICE_URL}/clans/${CLAN_ID}/currentwar`,
  currentWar2: `${API_SERVICE_URL}/clans/${CLAN_ID2}/currentwar`,
};
export const commandsToEndpointMap = {
  [commands.cw]: endpoints.currentWar,
  [commands.cw2]: endpoints.currentWar2,
};
