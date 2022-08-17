// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {
  ExtensionContext,
  languages,
  commands,
  Disposable,
  workspace,
} from "vscode";
import { InlayHintsProvider } from "./InlayHintsProvider";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

let disposables: Disposable[] = [];

export function activate(context: ExtensionContext) {
  const inlayHintsProvider = new InlayHintsProvider();

  languages.registerInlayHintsProvider("*", inlayHintsProvider);

  commands.registerCommand("uuid-easy.enableEasyUuid", () => {
    workspace.getConfiguration("uuid-easy").update("showEasyUuid", true, true);
  });

  commands.registerCommand("uuid-easy.disableEasyUuid", () => {
    workspace.getConfiguration("uuid-easy").update("showEasyUuid", false, true);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {
  if (disposables) {
    disposables.forEach((item) => item.dispose());
  }
  disposables = [];
}
