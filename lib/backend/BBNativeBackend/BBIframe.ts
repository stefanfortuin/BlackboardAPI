import Iframe from '../../common/BBAbstractBackend/iframe';

export default class BBIframe extends Iframe {

    private iframe: any = document.createElement("iframe");

    public setUrl(parameter: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.iframe.setAttribute("src", parameter);

            this.iframe.setAttribute("scrolling", "no"); 
            this.iframe.style.display = "none";
            this.iframe.style.width = "200px"; 
            this.iframe.style.height = "200px";
            this.iframe.style.position = "absolute";
            this.iframe.style.top = "129px";
            this.iframe.style.left = "33px";
            this.iframe.id = "upload-iframe";

            document.body.appendChild(this.iframe);

            const result = "Url has been set";
            resolve(result);
        })
    }

    public chooseFiles(): Promise<string> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {  
                var divs = this.iframe.contentDocument.getElementsByTagName("div"); 
                var button = this.iframe.contentWindow.document.getElementById('newFile_chooseLocalFile');
                for (var i = 0; i < divs.length; i++) {
                    divs[i].style.display = 'none';
                }
                this.iframe.contentDocument.body.appendChild(button);
                this.iframe.style.width = "90%";
                this.iframe.style.height = "30px";
                this.iframe.style.display = "";
                this.iframe.style.borderWidth = "0px";
                this.iframe.contentDocument.body.style.marginTop = "0px";
                this.iframe.contentDocument.body.style.backgroundColor = "#ffffff";
                this.iframe.contentDocument.body.style.background = "none";
            }, 1000);

            const result = "Display Button";
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

    public setSubmission(parameter: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const iframeBox = this.iframe.contentDocument.getElementById("studentSubmission.text_ifr");
            iframeBox.contentDocument.getElementById("tinymce").innerHTML = parameter;

            const result = "Submission has been set";
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

    public removeIframe(): Promise<string> {
        return new Promise((resolve, reject) => {
            document.body.removeChild(this.iframe);
            const result = "Iframe has been deleted";
            resolve(result);
        })
    }

    public getAttachedFiles(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            let fileTable = this.iframe.contentWindow.document.getElementById('newFile_table_body');
            let fileList = [];
            if(fileTable == null)
                resolve(fileList)
            for(let i = 0; i < fileTable.getElementsByTagName('tr').length; i++){
                let tr = fileTable.getElementsByTagName('tr')[i];
                if(tr.getElementsByClassName('fileName')[0]){
                    fileList.push(tr.getElementsByClassName('fileName')[0].textContent);
                }
            }
            resolve(fileList);
        })
    }

    public hideIframe(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.iframe.style.display = 'none';
            const result = "Iframe has been hidden";
            resolve(result);
        })
    }
    
    public submissionSent(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            let message = this.iframe.contentWindow.document.getElementById('goodMsg1');
            let result = false;
            if(message == null)
                resolve(result);
            result = message.textContent.includes("Success");
            resolve(result);
        })
    }

    public setCommentTeacher(parameter: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const commentIframe = this.iframe.contentWindow.document.getElementById('feedbacktext_ifr');
            const commentBox = commentIframe.contentWindow.document.getElementById('tinymce');
            commentBox.getElementsByTagName('p')[0].innerHTML = parameter;

            const result = "Commit has been set";
            resolve(result);
        })
    }

    public setGrade(parameter: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.iframe.contentWindow.document.getElementById('currentAttempt_grade').value = parameter;
            const result = "Grade has been set";
            resolve(result);
        })
    }

    public submitMark(): Promise<string> {
        return new Promise((resolve, reject) => {
        this.iframe.contentWindow.document.getElementById('currentAttempt_submitButton').click();   
        const result = "Mark has been submitted";
        resolve(result);
        })
    }
}