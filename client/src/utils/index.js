export function getRandomName() {
  const randomPath = Math.random().toString(36).substring(2);
  return randomPath
}

export function withPreAndPostExecutionBehavior(fn, preFn = () => { }, afterFn = () => { }) {
  return async function (...args) {
    try {
      await preFn(...args)
      return await fn(...args);
    } finally {
      await afterFn(...args)
    }
  };
}

export function withPostExecutionBehavior(fn, afterFn) {
  return async function (...args) {
    try {
      return await fn(...args);
    } finally {
      await afterFn(...args)
    }
  };
}

export function withPreExecutionBehavior(fn, beforeFn) {
  return async function (...args) {
    await beforeFn(...args);
    return await fn(...args);
  };
}

