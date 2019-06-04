import { Backend } from ".";

export default class BBIframe {
    private iframe: any;

    constructor() {
        this.iframe = document.createElement("iframe");
    }

    public setUrl(parameter: string): Promise<string> {        
        const parameters: BBBackend.iframeParameters = {
            iframe: this.iframe,
            content: parameter
        };

        return Backend.getBackend().iframe.setUrl(parameters);
    }

    public chooseFiles(): Promise<string> {
        const parameters: BBBackend.iframeParameters = {
            iframe: this.iframe,
            content: null
        };

        return Backend.getBackend().iframe.chooseFiles(parameters);
    }

    public setComment(parameter: string): Promise<string> {
        const parameters: BBBackend.iframeParameters = {
            iframe: this.iframe,
            content: parameter
        };

        return Backend.getBackend().iframe.setComment(parameters);
    }

    public submitAssignmentAttempt():Promise<string> {
        const parameters: BBBackend.iframeParameters = {
            iframe: this.iframe,
            content: null
        };

        return Backend.getBackend().iframe.setComment(parameters);
    }
}
