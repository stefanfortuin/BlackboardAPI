export default class BBIframe {
    private ifrm: any;

    constructor() {
        this.ifrm = document.createElement("iframe");
    }

    public setUrl(parameter: string){
        this.ifrm.setAttribute("src", parameter);
    }

    public chooseFiles() {
        this.ifrm.contentWindow.document.getElementById('newFile_localBrowse').click()
    }

    public setComment(parameter: string) {
        let commentIframe = this.ifrm.contentWindow.document.getElementById('student_commentstext_ifr')
			
        let commentBox = commentIframe.contentWindow.document.getElementById('tinymce')
        
        commentBox.getElementsByTagName('p')[0].innerHTML = parameter;
    }

    public submitAssignmentAttempt(){
        this.ifrm.contentWindow.document.getElementsByClassName('submit button-1')[0].click()
    }
}
