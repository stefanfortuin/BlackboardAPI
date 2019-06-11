import { Backend } from ".";

export default class BBIframe {

    public setUrl(parameter: string): Promise<string> {        
        return Backend.getBackend().iframe.setUrl(parameter);
    }

    public chooseFiles(): Promise<string> {
        return Backend.getBackend().iframe.chooseFiles();
    }

    public setComment(parameter: string): Promise<string> {

        return Backend.getBackend().iframe.setComment(parameter);
    }

    public submitAssignmentAttempt():Promise<string> {
        return Backend.getBackend().iframe.submitAssignmentAttempt();
    }

    public removeIframe(): Promise<string> {
        return Backend.getBackend().iframe.removeIframe();
    }
}
