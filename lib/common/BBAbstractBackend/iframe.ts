/**
 * A class that contains all Iframe-related functions.
 * @memberof BBAbstractBackend
 */
export default abstract class Iframe {

    /**
     * Sets the url of the iframe
     * @param parameters The parameters to use with this function.
     */
    public abstract setUrl(parameter: string);

    /**
     * Opens a pop-up to choose the file that the user would like to submit of the assignmentAttempt
     */
    public abstract chooseFiles();

    /**
     * Sets the comment of the assignmentAttempt
     * @param parameters The parameters to use with this function.
     */
    public abstract setComment(parameter: string);

    /**
     * Submits the assignmentAttempt
     */
    public abstract submitAssignmentAttempt();

     /**
     * Removes the Iframe
     */
    public abstract removeIframe();

    /**
     * Shows the attached files of the iframe
     */
    public abstract getAttachedFiles();

    /**
     * Hides the iframe
     */
    public abstract hideIframe();

    /**
     * Looks if the submission has been sent to blackboard
     */
    public abstract submissionSent();

    /**
     * Sets the teacher comments on a assignment attempt
     */
    public abstract setCommentTeacher(parameter: string);

    /**
     * Sets the grade of the student on a assignment attempt
     */
    public abstract setGrade(parameter: string);

    /**
     * submits the marks given by the teacher on a attempt
     */
    public abstract submitMark();
}
