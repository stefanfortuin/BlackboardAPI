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
}
