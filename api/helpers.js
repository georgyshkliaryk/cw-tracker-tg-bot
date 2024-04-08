import { warStateTypes } from './constants.js';

const getDateFromString = (dateString) => {
  const year = parseInt(dateString.substring(0, 4));
  const month = parseInt(dateString.substring(4, 6)) - 1;
  const day = parseInt(dateString.substring(6, 8));
  const hours = parseInt(dateString.substring(9, 11));
  const minutes = parseInt(dateString.substring(11, 13));
  const seconds = parseInt(dateString.substring(13, 15));

  return new Date(Date.UTC(year, month, day, hours, minutes, seconds));
};

const convertMsToTime = (ms) => {
  let seconds = Math.floor(ms / 1000);
  let minutes = Math.floor(seconds / 60);

  seconds = seconds % 60;

  let hours = Math.floor(minutes / 60);

  minutes = minutes % 60;

  const days = Math.floor(hours / 24);

  hours = hours % 24;
  hours += days * 24;

  const daysString = days ? `${days}d ` : '';
  const hoursString = hours ? `${hours}h ` : '';
  const minutesString = minutes ? `${minutes}m ` : '';
  const secondsString = seconds ? `${seconds}s` : '0s';

  return daysString + hoursString + minutesString + secondsString;
};

const getTimeTillEnd = (endTime) => {
  const now = new Date();
  const timeTillEnd = getDateFromString(endTime).getTime() - now.getTime();
  if (timeTillEnd <= 0) {
    return '0s';
  }

  return convertMsToTime(timeTillEnd);
};

export const getTimeLeftText = (state, endTime, startTime) => {
  if (state === warStateTypes.war) {
    return `war ends in ${getTimeTillEnd(endTime)}`;
  }
  if (state === warStateTypes.preparation) {
    return `war starts in ${getTimeTillEnd(startTime)}`;
  }

  return 'war ended';
};

export const getWarResultsText = (state, clanStars, opponentStars, destruction, opponentDestruction) => {
  if (state === warStateTypes.war) {
    return '[IN WAR]';
  }
  if (state === warStateTypes.preparation) {
    return '[PREPARATION]';
  }
  if (clanStars > opponentStars) {
    return '[ENDED - WIN]';
  }
  if (clanStars < opponentStars) {
    return '[ENDED - LOSE]';
  }
  if (destruction > opponentDestruction) {
    return '[ENDED - WIN]';
  }
  if (destruction < opponentDestruction) {
    return '[ENDED - LOSE]';
  }
  return '[ENDED - DRAW]';
};
