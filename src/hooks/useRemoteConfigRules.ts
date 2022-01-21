export const useRemoteConfigRules = () => {

  const remoteConfigNeedForceUpdate = (nextUpdate: Date, lastFetch: Date) => {
    const current = new Date();
    const hasLastCache = lastFetch.toISOString() === nextUpdate.toISOString();
    if (hasLastCache) return false;
    return current >= nextUpdate;
  };

  const setLastFetch = (date: Date) => {
    sessionStorage.setItem("lastFetch", date.toISOString());
  };

  const getLastFetch = (): Date => {
    const lastFetch = sessionStorage.getItem("lastFetch");
    const lastFetchDate = lastFetch ? new Date(lastFetch) : new Date();
    return lastFetchDate;
  };

  return {
    remoteConfigNeedForceUpdate,
    setLastFetch,
    getLastFetch,
  };
};
