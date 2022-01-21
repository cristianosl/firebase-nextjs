import { getRemoteConfig } from "firebase/remote-config";
import { getFirebaseApp } from "./getFirebaseApp";

export const getFirebaseRemoteConfig = (
  minimumFetchIntervalMillis?: number
) => {
  const app = getFirebaseApp();
  const remoteConfig = getRemoteConfig(app);
  if (minimumFetchIntervalMillis) {
    remoteConfig.settings.minimumFetchIntervalMillis =
      minimumFetchIntervalMillis;
  }
  remoteConfig.defaultConfig = {
    MY_CONF: "Welcome2",
  };
  return remoteConfig;
};
