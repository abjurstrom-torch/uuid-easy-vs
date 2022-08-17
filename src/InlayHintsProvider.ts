import * as vscode from "vscode";
import { UuidEasy } from "uuid-easy";

/**
 * InlayHintsProvider
 */
export class InlayHintsProvider implements vscode.InlayHintsProvider {
  private regex: RegExp;

  constructor() {
    this.regex =
      /([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)/gi;
  }

  onDidChangeInlayHints?: vscode.Event<void> | undefined;
  provideInlayHints(
    document: vscode.TextDocument,
    range: vscode.Range,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.InlayHint[]> {
    if (
      vscode.workspace.getConfiguration("uuid-easy").get("showEasyUuid", true)
    ) {
      const regex = new RegExp(this.regex);
      const text = document.getText();
      let matches;
      const inlayHints = [];

      while ((matches = regex.exec(text)) !== null) {
        const line = document.lineAt(document.positionAt(matches.index).line);
        const indexOf = line.text.indexOf(matches[0]);

        const position = new vscode.Position(line.lineNumber, indexOf);
        const guid = new UuidEasy(matches[0]);
        inlayHints.push(new vscode.InlayHint(position, `${guid.debug}: `));
      }
      return inlayHints;
    }

    return [];
  }
}
