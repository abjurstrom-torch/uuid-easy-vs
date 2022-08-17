"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlayHintsProvider = void 0;
const vscode = require("vscode");
const uuid_easy_1 = require("uuid-easy");
/**
 * InlayHintsProvider
 */
class InlayHintsProvider {
    constructor() {
        this.regex =
            /([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)/gi;
    }
    provideInlayHints(document, range, token) {
        if (vscode.workspace.getConfiguration("uuid-easy").get("showEasyUuid", true)) {
            const regex = new RegExp(this.regex);
            const text = document.getText();
            let matches;
            const inlayHints = [];
            while ((matches = regex.exec(text)) !== null) {
                const line = document.lineAt(document.positionAt(matches.index).line);
                const indexOf = line.text.indexOf(matches[0]);
                const position = new vscode.Position(line.lineNumber, indexOf);
                const guid = new uuid_easy_1.UuidEasy(matches[0]);
                inlayHints.push(new vscode.InlayHint(position, `${guid.debug}: `));
            }
            return inlayHints;
        }
        return [];
    }
}
exports.InlayHintsProvider = InlayHintsProvider;
//# sourceMappingURL=InlayHintsProvider.js.map