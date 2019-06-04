import { BBIframeBackend } from "..";
import Iframe from "../../common/BBAbstractBackend/iframe";

export default class BBIframe extends Iframe {
    private backend: BBIframeBackend;
    private category: string;

    constructor(category: string, backend: BBIframeBackend) {
        super();
        this.backend = backend;
        this.category = category;
    }

    public setUrl(parameters: BBBackend.iframeParameters): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "setUrl", parameters);
    }

    public chooseFiles(parameters: BBBackend.iframeParameters): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "chooseFiles", parameters);
    }

    public setComment(parameters: BBBackend.iframeParameters): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "setComment", parameters);
    }

    public submitAssignmentAttempt(parameters: BBBackend.iframeParameters): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "submitAssignmentAttempt", parameters);
    }
}
