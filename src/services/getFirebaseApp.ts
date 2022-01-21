import { getApps, initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebase";

export const getFirebaseApp = () => {
  const appName = "defaultApp"
  const apps = getApps();
  let app = apps.find((app) => app.name === appName);
  if (!app) {
    app = initializeApp(firebaseConfig, appName);
  }
  return app;
};
