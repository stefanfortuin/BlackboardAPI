import Iframe from '../../common/BBAbstractBackend/iframe';

export default class BBIframe extends Iframe {
    public setUrl(parameters: BBBackend.iframeParameters): Promise<string> {
        const iframe = parameters.iframe;
        return new Promise((resolve, reject) => {
            iframe.setAttribute("src", parameters.content);
            iframe.style.width = "0px";
            iframe.style.height = "0px";
            document.body.appendChild(iframe);

            const result = "Url has been set";
            resolve(result);
        })
    }

    public chooseFiles(parameters: BBBackend.iframeParameters): Promise<string> {
        const iframe = parameters.iframe;
        return new Promise((resolve, reject) => {
            iframe.contentWindow.document.getElementById('newFile_localBrowse').click();

            const result = "File has been chosen";
            resolve(result);
        })
    }

    public setComment(parameters: BBBackend.iframeParameters): Promise<string> {
        const iframe = parameters.iframe;
        return new Promise((resolve, reject) => {
            const commentIframe = iframe.contentWindow.document.getElementById('student_commentstext_ifr');
            const commentBox = commentIframe.contentWindow.document.getElementById('tinymce');
            commentBox.getElementsByTagName('p')[0].innerHTML = parameters.content;

            const result = "Commit has been set";
            resolve(result);
        })
    }

    public submitAssignmentAttempt(parameters: BBBackend.iframeParameters): Promise<string> {
        const iframe = parameters.iframe;
        return new Promise((resolve, reject) => {
           iframe.contentWindow.document.getElementsByClassName('submit button-1')[0].click();

            const result = "Assignment attempt has been submit";
            resolve(result);
        })
    }
}
