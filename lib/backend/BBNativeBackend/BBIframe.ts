import Iframe from '../../common/BBAbstractBackend/iframe';

export default class BBIframe extends Iframe {

    private iframe: any = document.createElement("iframe");

    public setUrl(parameter: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.iframe.setAttribute("src", parameter);

            this.iframe.setAttribute("scrolling", "no"); 
            this.iframe.style.width = "200px"; 
            this.iframe.style.height = "200px";
            this.iframe.style.position = "absolute";
            this.iframe.style.top = "129px";
            this.iframe.style.left = (screen.width - 118) / 2 + "px";
            this.iframe.id = "upload-iframe";
            document.body.appendChild(this.iframe);

            setTimeout(() => {  
                var divs = this.iframe.contentDocument.getElementsByTagName("div"); 
                var button = this.iframe.contentWindow.document.getElementById('newFile_chooseLocalFile');
                for (var i = 0; i < divs.length; i++) { 
                    divs[i].style.display = 'none';         
                }
                this.iframe.contentDocument.body.appendChild(button);
                this.iframe.style.width = "118px";
                this.iframe.style.height = "17px";
                this.iframe.contentDocument.body.style.marginTop = "0px";
                this.iframe.contentDocument.body.style.backgroundColor = "#ffffff";
                this.iframe.contentDocument.body.style.background = "none";
            }, 1000); 

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
