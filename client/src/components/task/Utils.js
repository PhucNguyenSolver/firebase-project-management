export const timeSince = (date) => {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  // return Math.floor(seconds) + " seconds";
  return "A few seconds";
}

/**
 * @param {int} seconds 
 * @returns {string} - X years / X months /...
 */
export function secondsToTimeUnit(seconds) {
  let years = seconds / 31536000;
  if (years >= 1) return Math.floor(years) + " years";

  let months = seconds / 2592000;
  if (months >= 1) return Math.floor(months) + " months";

  let days = seconds / 86400;
  if (days >= 1.5) return Math.floor(days) + " days";

  let hours = seconds / 3600;
  if (hours >= 1) return Math.floor(hours) + " hours";

  let minutes = seconds / 60;
  if (minutes >= 1) return Math.floor(minutes) + " minutes";

  return "A few seconds";
}