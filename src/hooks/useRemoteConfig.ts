/* eslint-disable unused-imports/no-unused-vars */
import {
  fetchAndActivate,
  getValue,
  RemoteConfig,
} from "firebase/remote-config";
import { useEffect, useRef, useState } from "react";
import { getFirebaseRemoteConfig } from "../services/getFirebaseRemoteConfig";
import { useFirestore } from "./useFirestore";
import { useRemoteConfigRules } from "./useRemoteConfigRules";

type Confs = "MY_CONF";

type RemoteConfigProps = () => {
  getConfigByName: (name: Confs) => Promise<string | undefined>;
  loadedRemoteConfig: boolean;
};

export const useRemoteConfig: RemoteConfigProps = () => {
  const { remoteConfigNeedForceUpdate, getLastFetch, setLastFetch } =
    useRemoteConfigRules();
  const [loadedRemoteConfig, setLoadedRemoteConfig] = useState(false);
  const { loading: loadingNextUpdateDate, getNextUpdateDate } = useFirestore();

  const refRemoteConfig = useRef<RemoteConfig>();

  useEffect(() => {
    const loadData = async () => {
      const lastFetch = getLastFetch();
      const nextUpdate = await getNextUpdateDate();
      let remoteConfigTime: number | undefined;
      if (remoteConfigNeedForceUpdate(nextUpdate, lastFetch)) {
        console.log("atualizou cache");
        remoteConfigTime = 2000;
        setLastFetch(nextUpdate);
      }
      refRemoteConfig.current = getFirebaseRemoteConfig(remoteConfigTime);
      console.log(`refRemoteConfig.current`, refRemoteConfig.current);
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getConfigByName = async (name: Confs) => {
    if (!refRemoteConfig.current) {
      console.log("retornou");
      return;
    }
    const b = await fetchAndActivate(refRemoteConfig.current);
    setLoadedRemoteConfig(b);
    console.log("b", b);
    try {
      const myConf = getValue(refRemoteConfig.current, name);
      console.log("myConf", myConf);
      return myConf.asString();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return {
    getConfigByName,
    loadedRemoteConfig,
  };
};
