export default class BBIframe {
    private iframe: any;

    constructor() {
        this.iframe = document.createElement("iframe");
    }

    public setUrl(parameter: string) {
        this.iframe.setAttribute("src", parameter);
    }

    public chooseFiles() {
        this.iframe.contentWindow.document.getElementById('newFile_localBrowse').click();
    }

    public setComment(parameter: string) {
        const commentIframe = this.iframe.contentWindow.document.getElementById('student_commentstext_ifr');
        const commentBox = commentIframe.contentWindow.document.getElementById('tinymce');
        commentBox.getElementsByTagName('p')[0].innerHTML = parameter;
    }

    public submitAssignmentAttempt() {
        this.iframe.contentWindow.document.getElementsByClassName('submit button-1')[0].click();
    }
}
