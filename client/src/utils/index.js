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

