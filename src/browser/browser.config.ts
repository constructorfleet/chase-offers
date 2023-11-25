import { registerAs } from "@nestjs/config";

export const BrowserConfig = registerAs(
    'Browser.Config',
    () => {
        return {}
    },
);