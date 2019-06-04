import Iframe from '../../common/BBAbstractBackend/iframe';

export default class BBIframe extends Iframe {

    private iframe: any = document.createElement("iframe");

    public setUrl(parameter: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.iframe.setAttribute("src", parameter);
            this.iframe.style.width = "0px";
            this.iframe.style.height = "0px";
            document.body.appendChild(this.iframe);

            const result = "Url has been set";
            resolve(result);
        })
    }

    public chooseFiles(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.iframe.contentWindow.document.getElementById('newFile_localBrowse').click();

            const result = "File has been chosen";
            resolve(result);
        })
    }

    public setComment(parameter: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const commentIframe = this.iframe.contentWindow.document.getElementById('student_commentstext_ifr');
            const commentBox = commentIframe.contentWindow.document.getElementById('tinymce');
            commentBox.getElementsByTagName('p')[0].innerHTML = parameter;

            const result = "Commit has been set";
            resolve(result);
        })
    }

    public submitAssignmentAttempt(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.iframe.contentWindow.document.getElementsByClassName('submit button-1')[0].click();

            const result = "Assignment attempt has been submit";
            resolve(result);
        })
    }
}
