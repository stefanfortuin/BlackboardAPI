import { BBIframeBackend } from "..";
import Iframe from "../../common/BBAbstractBackend/iframe";

export default class BBGroups extends Iframe {
    private backend: BBIframeBackend;
    private category: string;
    private url: string;
    private ifrm: any;

    constructor(category: string, backend: BBIframeBackend) {
        super();
        this.backend = backend;
        this.category = category;
    }

    public setUrl(parameter: string) {
        return this.backend.sendMessageThroughConnectionManager(this.category, "setUrl", parameter);
    }

    public chooseFiles() {
        return this.backend.sendMessageThroughConnectionManager(this.category, "chooseFiles");
    }

    public setComment(parameter: string) {
        return this.backend.sendMessageThroughConnectionManager(this.category, "setComment", parameter);
    }

    public submitAssignmentAttempt() {
        return this.backend.sendMessageThroughConnectionManager(this.category, "submitAssignmentAttempt");
    }
}
