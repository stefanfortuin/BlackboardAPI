/* tslint:disable:max-line-length */

import { HTTPRequest, Utilities } from '../../common';
import Courses from '../../common/BBAbstractBackend/courses';

export default class BBCourses extends Courses {
    public getEnrolledCourses(parameters: BBBackend.EnrolledCoursesParameter): Promise<BBBackend.ICourseID[]> {
        const path = "/learn/api/public/v1/users/" + parameters.userId + "/courses?offset=" + parameters.offset;
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const allCourseInformation = JSON.parse(response);
                const responseInfo = new Array<BBBackend.ICourseID>();

                allCourseInformation.results.forEach((result) => {
                    const resultObject: BBBackend.ICourseID = {
                        id: result.courseId,
                    };

                    responseInfo.push(resultObject);
                });

                resolve(responseInfo);
            });
        });
    }

    public getCourseInformation(parameters: BBBackend.CourseID): Promise<BBBackend.ICourseInformation> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId;
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const courseInformation = JSON.parse(response);

                const resultObject: BBBackend.ICourseInformation = {
                    id: courseInformation.id,
                    uuid: courseInformation.uuid,
                    externalId: courseInformation.externalId,
                    dataSourceId: courseInformation.dataSourceId,
                    courseId: courseInformation.courseId,
                    name: courseInformation.name,
                    description: courseInformation.description,
                    created: courseInformation.created,
                    organization: courseInformation.organization,
                    ultraStatus: courseInformation.ultraStatus,
                    accessCode: courseInformation.enrollment.accessCode,
                    allowGuests: courseInformation.allowGuests,
                    available: courseInformation.availability.available,
                    duration: courseInformation.availability.duration.type,
                    enrollment: courseInformation.enrollment.type,
                    hasChildren: courseInformation.hasChildren,
                    parentId: courseInformation.parentId,
                    locale: courseInformation.locale.force,
                    readOnly: courseInformation.readOnly,
                };

                resolve(resultObject);
            });
        });
    }

    public postCourse(): Promise<string> {
        const path = "/learn/api/public/v1/courses/";
        return new Promise((resolve, reject) => {
            HTTPRequest.postAsync(path, null).then((response) => {
                resolve(response);
            });
        });
    }

    public deleteCourse(parameters: BBBackend.CourseID): Promise<string> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId;
        return new Promise((resolve, reject) => {
            HTTPRequest.deleteAsync(path, null).then((response) => {
                resolve(response);
            });
        });
    }

    public patchCourse(parameters: BBBackend.CourseID): Promise<string> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId;
        return new Promise((resolve, reject) => {
            HTTPRequest.patchAsync(path, null).then((response) => {
                resolve(response);
            });
        });
    }

    public getCourseContents(parameters: BBBackend.CourseID): Promise<BBBackend.ICourseContent[]> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents";
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const allCourseContents = JSON.parse(response);
                const responseInfo = new Array<BBBackend.ICourseContent>();

                allCourseContents.results.forEach((result) => {
                    const resultObject: BBBackend.ICourseContent = {
                        allowGuests: result.availability.allowGuests,
                        available: result.availability.available,
                        body: result.body,
                        created: result.created,
                        description: result.description,
                        hasAssociatedGroups: result.hasAssociatedGroups,
                        hasChildren: result.hasChildren,
                        hasGradebookColumns: result.hasGradebookColumns,
                        id: result.id,
                        parentId: result.parentId,
                        position: result.position,
                        title: result.title,
                    };

                    responseInfo.push(resultObject);
                });

                resolve(responseInfo);
            });
        });
    }

    public postCourseContent(parameters: BBBackend.CourseID): Promise<string> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + '/contents';
        return new Promise((resolve, reject) => {
            HTTPRequest.postAsync(path, null).then((response) => {
                resolve(response);
            });
        });
    }

    public deleteCourseContent(parameters: BBBackend.CourseContentParameter): Promise<string> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + '/contents/' + parameters.contentId;
        return new Promise((resolve, reject) => {
            HTTPRequest.deleteAsync(path, null).then((response) => {
                resolve(response);
            });
        });
    }

    public patchCourseContent(parameters: BBBackend.CourseContentParameter): Promise<string> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents/" + parameters.contentId;
        return new Promise((resolve, reject) => {
            HTTPRequest.patchAsync(path, null).then((response) => {
                resolve(response);
            });
        });
    }

    public getInternshipRequestForm(): Promise<string> {
        const path = "/bbcswebdav/courses/ICT-1819-844/site/tools/register_internship/Aanvraagformulier_Stage_HBO-ICT.html";

        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                resolve(response);
            });
        });
    }

    public getCourseContent(parameters: BBBackend.CourseContentParameter): Promise<BBBackend.ICourseContent> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents/" + parameters.contentId;
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const result = JSON.parse(response);

                const resultObject: BBBackend.ICourseContent = {
                    allowGuests: result.availability.allowGuests,
                    available: result.availability.available,
                    body: result.body,
                    created: result.created,
                    description: result.description,
                    hasAssociatedGroups: result.hasAssociatedGroups,
                    hasChildren: result.hasChildren,
                    hasGradebookColumns: result.hasGradebookColumns,
                    id: result.id,
                    parentId: result.parentId,
                    position: result.position,
                    title: result.title
                };

                resolve(resultObject);
            });
        });
    }

    public getCourseContentChildren(parameters: BBBackend.CourseContentParameter): Promise<BBBackend.ICourseContent[]> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents/" + parameters.contentId + '/children';
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const allCourseContents = JSON.parse(response);
                const responseInfo = new Array<BBBackend.ICourseContent>();

                allCourseContents.results.forEach((result) => {
                    const resultObject: BBBackend.ICourseContent = {
                        allowGuests: result.availability.allowGuests,
                        available: result.availability.available,
                        body: result.body,
                        created: result.created,
                        description: result.description,
                        hasAssociatedGroups: result.hasAssociatedGroups,
                        hasChildren: result.hasChildren,
                        hasGradebookColumns: result.hasGradebookColumns,
                        id: result.id,
                        parentId: result.parentId,
                        position: result.position,
                        title: result.title
                    };

                    responseInfo.push(resultObject);
                });

                resolve(responseInfo);
            });
        });
    }

    public postCourseContentChildren(parameters: BBBackend.CourseContentParameter): Promise<string> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/contents/" + parameters.contentId + '/children';
        return new Promise((resolve, reject) => {
            HTTPRequest.postAsync(path, null).then((response) => {
                resolve(response);
            });
        });
    }

    public getCourseChildren(parameters: BBBackend.CourseID): Promise<BBBackend.ICourseChild[]> {
        const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/children";
        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const allCourseChildren = JSON.parse(response);
                const responseInfo = new Array<BBBackend.ICourseChild>();

                allCourseChildren.results.forEach((result) => {
                    const resultObject: BBBackend.ICourseChild = {
                        created: result.created,
                        datasourceId: result.datasourceId,
                        id: result.id
                    };

                    responseInfo.push(resultObject);
                });

                resolve(responseInfo);
            });
        });
    }

    public getAssignmentCols(parameters: BBBackend.CourseID): Promise<BBBackend.IAssignment[]> {
        const path: string = "/learn/api/public/v2/courses/" + parameters.courseId + "/gradebook/columns";

        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const columns: any[] = JSON.parse(response).results;

                const result: BBBackend.IAssignment[] = [];

                for (const column of columns) {
                    result.push(this.createIAssignment(column));
                }

                resolve(result);
            });
        });
    }

    public getAnnouncements(parameters: BBBackend.CourseID): Promise<BBBackend.IAnnouncement[]> {
        const path: string = "/webapps/blackboard/execute/announcement?method=search&context=course_entry&course_id=" + parameters.courseId + "&viewChoice=2";

        return new Promise((resolve, reject) => {
            HTTPRequest.getAsync(path).then((response) => {
                const parser = new DOMParser();
                const parsedHtml = parser.parseFromString(response, 'text/html');
                const parsedAnnouncements: any[] = [];

                const announcements = parsedHtml.getElementById('announcementList').getElementsByTagName('li');
                let teacher = false;

                for (const a of announcements){
                    if (a.className == "contextmenubar_top"){
                        teacher = true;
                    }
                }

                for (const a of announcements) {
                    if (a.id == "announcementList:insertionMarker.announcementList" || a.className == "contextmenubar_top" || a.id.includes("modify") || a.id.includes("remove")) {
                        continue;
                    }

                    const information = {id: "", title: "", datePosted: "", postedBy: "", postedTo: "", content: ""};
                    let detailDiv = a.getElementsByClassName("details")[0];

                    if (detailDiv === undefined) {
                        detailDiv = a.getElementsByClassName("details tab-group-label")[0];
                    }

                    if (detailDiv.getElementsByTagName("i").length > 0) {
                        if (detailDiv.getElementsByTagName("i")[0].innerText == "Item is not available.") {
                            continue;
                        }
                    }

                    information.id = a.id;
                    if (teacher) {
                        information.title = a.getElementsByTagName("span")[2].innerText;
                    } else {
                        information.title = a.getElementsByTagName("h3")[0].innerText;
                    }

                    information.datePosted = detailDiv.getElementsByTagName("p")[0].getElementsByTagName("span")[0].innerHTML;
                    information.content = detailDiv.getElementsByClassName("vtbegenerated")[0].innerHTML;
                    parsedAnnouncements.push(this.createIAnnouncement(information));
                }
                resolve(parsedAnnouncements);
            });
        });
    }

    /**
     * Creates an IAssignment from a JSON response.
     *
     * @param {any} information
     */
    private createIAssignment(information: any): BBBackend.IAssignment {
        if (typeof information.availability !== "undefined") {
            return {
                attemptsAllowed: information.grading.attemptsAllowed,
                available: Utilities.stringToBoolean(information.availability.available),
                contentId: information.contentId,
                desc: information.description,
                due: information.grading.due,
                id: information.id,
                name: information.name,
                score: information.score.possible
            };
        } else {
            return {
                attemptsAllowed: information.grading.attemptsAllowed,
                available: null,
                contentId: information.contentId,
                desc: null,
                due: information.grading.due,
                id: information.id,
                name: information.name,
                score: information.score.possible
            };
        }
    }

    /**
     * Creates an IAssignment from a JSON response.
     *
     * @param {any} information
     */
    private createIAnnouncement(information: any): BBBackend.IAnnouncement {
        return{
            content: information.content,
            datePosted: information.datePosted,
            id: information.id,
            title: information.title,
        };
    }

}
