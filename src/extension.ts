import * as vscode from 'vscode';
import * as pkgUp from 'pkg-up';
import {
	build,
	getOptions,
	watcherUpdate,
} from 'isomor-transpiler';
import { dirname, join, sep } from 'path';
import { exists } from 'fs';
import { promisify } from 'util';

const baseOptions = getOptions();

async function getRootFolder(document: vscode.TextDocument) {
	const pkg = await pkgUp({ cwd: document.fileName });
	if (pkg) {
		const rootFolder = dirname(pkg);
		return rootFolder;
	}
}

function loadOptions(rootFolder: string) {
	const options = {
		...baseOptions,
		srcFolder: join(rootFolder, baseOptions.srcFolder),
		distAppFolder: join(rootFolder, baseOptions.distAppFolder),
	};
	return options;
}

function isIsomorProject(options: any) { // need to export options
	return promisify(exists)(options.srcFolder);
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "isomor-vscode" is now active!');
	const outputChannel = vscode.window.createOutputChannel('isomor');

	let disposable = vscode.commands.registerCommand('extension.isomorBuildAll', async () => {
		if (vscode.window.activeTextEditor) {
			const rootFolder = await getRootFolder(vscode.window.activeTextEditor.document);
			if (rootFolder) {
				const options = loadOptions(rootFolder);
				await build(options);
				vscode.window.showInformationMessage('isomor build all done', rootFolder);
				outputChannel.appendLine(`Build all done ${rootFolder}`);
			}
		}
	});

	context.subscriptions.push(disposable);

	vscode.workspace.onDidSaveTextDocument(async (document: vscode.TextDocument) => {
		const rootFolder = await getRootFolder(document);
		if (rootFolder) {
			const options = loadOptions(rootFolder);
			if (await isIsomorProject(options)) {
				const file = document.fileName.replace(new RegExp(`^${options.srcFolder}${sep}`), '');
				if (file !== document.fileName) {
					console.log('File saved, transpile file', file);
					outputChannel.appendLine(`File saved, transpile file ${file}`);
					watcherUpdate(options)(file);
				} else {
					console.log('No need to update file', file);
				}

				const warnFile = document.fileName.replace(new RegExp(`^${options.distAppFolder}${sep}`), '');
				if (warnFile !== document.fileName) {
					vscode.window.showWarningMessage(
						'Dev folder is src-isomor. This folder will be automatically updated by transpiler.',
						options.srcFolder,
					);
				}
			}
		}
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
