import * as vscode from 'vscode';
import * as pkgUp from 'pkg-up';
import {
	getOptions,
	watcherUpdate,
} from 'isomor-transpiler';
import { dirname, join, sep } from 'path';

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
			const file = document.fileName.replace(new RegExp(`^${options.srcFolder}${sep}`), '');
			if (file !== document.fileName) {
				console.log('File saved, update file', file);
				watcherUpdate(options)(file);
			} else {
				console.log('No need to update file', file);
			}
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
