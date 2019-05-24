import Backend from "./Backend";

export default class BBGroup {
    private _courseId: string;

    private groups: BBBackend.IGroup[];
    private users: BBBackend.IGroupUsers[];

    constructor(courseId: string) {
        this._courseId = courseId;
    }

    get courseId(): string {
        return this._courseId;
    }

    public getGroups(): Promise<BBBackend.IGroup[]> {
        return new Promise((resolve, reject) => {
            if (this.groups) {
                resolve(this.groups);
                return;
            }

            const parameters: BBBackend.CourseID = {
                courseId: this.courseId
            };

            Backend.getBackend().groups.getGroups(parameters).then((information) => {
                this.groups = information;
                resolve(this.groups);
            });
        });
    }

    public getUsers(parameter : string): Promise<BBBackend.IGroupUsers[]> {
        return new Promise((resolve, reject) => {
            if (this.users){ 
                resolve(this.users);
                return;
            };

            const parameters: BBBackend.GroupInformation = {
                courseId: this.courseId,
                groupId: parameter
            };

            Backend.getBackend().groups.getUsers(parameters).then((information) => {
                this.users = information;
                resolve(this.users);
            })
        });
    }

}
