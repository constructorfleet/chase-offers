// import { FactoryProvider, Scope } from "@nestjs/common";
// import {
//   ClickSelectorConfig,
//   CountSelectorConfig,
//   SelectorConfigs,
//   SendKeysSelectorConfig,
// } from "src/config";
// import { SelectorHandler } from ".";
// import { SelectorClickHandler } from "./click-selector.handler";
// import { SelectorCountHandler } from "./count-selector.handler";
// import { SelectorSendKeysHandler } from "./send-keys-selector.handler";

// export const

// export const SelectorHandlerFactory: FactoryProvider = {
//   provide: SelectorHandlerKey,
//   scope: Scope.TRANSIENT,
//   inject: [CurrentSelectorConfig],
//   useFactory: <SelectorConfigType extends SelectorConfigs>(
//     selectorConfig: SelectorConfigType
//   ): SelectorHandler => {
//     switch (true) {
//       case selectorConfig instanceof ClickSelectorConfig:
//         return new SelectorClickHandler(selectorConfig);
//       case selectorConfig instanceof SendKeysSelectorConfig:
//         return new SelectorSendKeysHandler(selectorConfig);
//       case selectorConfig instanceof CountSelectorConfig:
//         return new SelectorCountHandler(selectorConfig);
//     }
//   },
// };
