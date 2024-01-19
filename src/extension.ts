import { ExtensionContext, window } from 'vscode'
import { LanguageClient } from 'vscode-languageclient/node'

let client: LanguageClient

export const activate = (context: ExtensionContext) => {
    try {
        const serverOptions = {
            command: "brack",
            args: [
                "language-server"
            ]
        }
        const clientOptions = {
            documentSelector: [
                {
                    scheme: 'file',
                    language: 'brack'
                }
            ],
        }
        client = new LanguageClient(
            "brack-language-server",
            "Brack Language Server",
            serverOptions,
            clientOptions
        )
        client.start()
    } catch (error) {
        window.showErrorMessage("brack-language-server could not be started.")
    }
}

export const deactivate = (): Thenable<void> | undefined => {
    if (!client) {
        return undefined
    }
    return client.stop()
}
