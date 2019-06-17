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

    public setSubmission(parameter: string): Promise<string> {
        return Backend.getBackend().iframe.setSubmission(parameter);
    }

    public submitAssignmentAttempt():Promise<string> {
        return Backend.getBackend().iframe.submitAssignmentAttempt();
    }

    public removeIframe(): Promise<string> {
        return Backend.getBackend().iframe.removeIframe();
    }

    public getAttachedFiles() : Promise<string[]> {
        return Backend.getBackend().iframe.getAttachedFiles();
    }

    public hideIframe(): Promise<string> {
        return Backend.getBackend().iframe.hideIframe();
    }

    public submissionSent(): Promise<boolean> {
        return Backend.getBackend().iframe.submissionSent();
    }

    public setCommentTeacher(parameter: string): Promise<string> {
        return Backend.getBackend().iframe.setCommentTeacher(parameter);
    }

    public setGrade(parameter: string): Promise<string> {
        return Backend.getBackend().iframe.setGrade(parameter);
    }

    public submitMark(): Promise<string> {
        return Backend.getBackend().iframe.submitMark();
    }
}
