import * as vscode from 'vscode';
import * as pkgUp from 'pkg-up';
import {
	getOptions,
	watcherUpdate,
} from 'isomor-transpiler';
import { dirname, join } from 'path';

const baseOptions = getOptions();

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "isomor-vscode" is now active!');

	let disposable = vscode.commands.registerCommand('extension.isomorBuildAll', () => {
		vscode.window.showInformationMessage('isomor re-build all');
	});

	context.subscriptions.push(disposable);

	vscode.workspace.onDidSaveTextDocument(async (document: vscode.TextDocument) => {
		const pkg = await pkgUp({ cwd: document.fileName });
		if (pkg) {
			const rootFolder = dirname(pkg);
			const options = {
				...baseOptions,
				srcFolder: join(rootFolder, baseOptions.srcFolder),
				distAppFolder: join(rootFolder, baseOptions.distAppFolder),
			};
			// vscode.window.showInformationMessage('opt', JSON.stringify(options));
			const file = document.fileName.replace(rootFolder, '');
			vscode.window.showInformationMessage('File saved', file);
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
