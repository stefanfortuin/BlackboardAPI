import Iframe from '../../common/BBAbstractBackend/iframe';

export default class BBIframe extends Iframe {
    public setUrl(parameter: string): string {
        return "Url has been set";
    }

    public chooseFiles(): string {
        return "File has been chosen";
    }

    public setComment(parameter: string): string {
        return "Commit has been set";
    }

    public submitAssignmentAttempt(): string {
        return "Assignment attempt has been submit";
    }
}
