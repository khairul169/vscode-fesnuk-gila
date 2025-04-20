// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { exec } from "child_process";

async function onError() {
  vscode.window.showErrorMessage("😡 error mulu, mending fesnuk ajh.");
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Buka fesnuk
  const uri = vscode.Uri.parse("https://facebook.com");
  vscode.env.openExternal(uri);

  await new Promise((resolve) => setTimeout(resolve, 500));

  // Tutup vscode
  if (process.platform === "linux" || process.platform === "darwin") {
    exec("pkill code");
  } else if (process.platform === "win32") {
    exec("taskkill /IM Code.exe /F");
  }
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const diagChange = vscode.languages.onDidChangeDiagnostics(() => {
    const diagnostics = vscode.languages.getDiagnostics();
    const errors = diagnostics.flatMap(([_, diags]) =>
      diags.filter((d) => d.severity === vscode.DiagnosticSeverity.Error)
    );

    if (errors.length >= 1) {
      onError();
    }
  });

  context.subscriptions.push(diagChange);
}

// This method is called when your extension is deactivated
export function deactivate() {}
