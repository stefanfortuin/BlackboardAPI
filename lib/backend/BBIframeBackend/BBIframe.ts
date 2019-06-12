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

    public setUrl(parameter: string): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "setUrl", parameter);
    }

    public chooseFiles(): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "chooseFiles");
    }

    public setComment(parameter: string): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "setComment", parameter);
    }

    public submitAssignmentAttempt(): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "submitAssignmentAttempt");
    }

    public removeIframe(): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "removeIframe");
    }

    public getAttachedFiles() : Promise<string[]> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getAttachedFiles");
    }

    public hideIframe(): Promise<string> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "hideIframe");
    }

    public submissionSent(): Promise<boolean> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "submissionSent");
    }
}
