import componentVariants, {
  ToastConfig,
  ToastVariant,
} from "config/app/components";
import * as themes from "config/themes";

export interface AppConfig {
  title: string;
  logo: string;
  id: string;
  theme: Record<string, any>;
  isProduction: boolean;
  componentVariants: {
    toast: ToastConfig;
  };
}

const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const APP_TITLE = process.env.NEXT_PUBLIC_APP_TITLE;
const APP_LOGO = process.env.NEXT_PUBLIC_APP_LOGO;
const isProduction = process.env.NODE_ENV === "production";

const TOAST = process.env.NEXT_PUBLIC_TOAST || "one";

if (!APP_ID || !APP_TITLE) {
  throw new Error("No APP_ID or APP_TITLE provided in the .env file");
}

const appConfig: AppConfig = {
  id: APP_ID,
  title: APP_TITLE,
  logo: APP_LOGO as string,
  isProduction,
  // @ts-ignore
  theme: themes[APP_ID],
  componentVariants: {
    toast: componentVariants.toastVariants[TOAST as ToastVariant],
  },
};

export default appConfig;
