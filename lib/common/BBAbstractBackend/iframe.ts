/**
 * A class that contains all Iframe-related functions.
 * @memberof BBAbstractBackend
 */
export default abstract class Iframe {

    /**
     * Sets the url of the iframe
     * @param parameters The parameters to use with this function.
     */
    public abstract setUrl(parameters: BBBackend.iframeParameters);

    /**
     * Opens a pop-up to choose the file that the user would like to submit of the assignmentAttempt
     */
    public abstract chooseFiles(parameters: BBBackend.iframeParameters);

    /**
     * Sets the comment of the assignmentAttempt
     * @param parameters The parameters to use with this function.
     */
    public abstract setComment(parameters: BBBackend.iframeParameters);

    /**
     * Submits the assignmentAttempt
     */
    public abstract submitAssignmentAttempt(parameters: BBBackend.iframeParameters);
}
