import { BBIframeBackend } from "..";
import Groups from "../../common/BBAbstractBackend/groups";

export default class BBGroups extends Groups {
    private backend: BBIframeBackend;
    private category: string;

    constructor(category: string, backend: BBIframeBackend) {
        super();
        this.backend = backend;
        this.category = category;
    }

    public getGroups(parameters: BBBackend.CourseID): Promise<BBBackend.IGroup[]> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getGroups", parameters);
    }

    public getUsers(parameter: BBBackend.GroupInformation): Promise<BBBackend.IGroupUsers[]> {
        return this.backend.sendMessageThroughConnectionManager(this.category, "getUsers", parameter);
    }
}
