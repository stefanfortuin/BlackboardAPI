import { HTTPRequest } from '../../common';
import Groups from '../../common/BBAbstractBackend/groups';

export default class BBGroups extends Groups {
  public getGroups(parameters: BBBackend.CourseID): Promise<BBBackend.IGroup[]> {
      const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/groups";
      return new Promise((resolve, reject) => {
          HTTPRequest.getAsync(path).then((response) => {
              const allGroupInformation = JSON.parse(response);
              const responseInfo = new Array<BBBackend.IGroup>();

              allGroupInformation.results.forEach((result) => {
                  const resultObject: BBBackend.IGroup = {
                      id: result.id,
                      name: result.name,
                      desc: result.description
                  };

                  responseInfo.push(resultObject);
              });

              resolve(responseInfo);
          });
      });
  }

  public getUsers(parameters: BBBackend.GroupInformation): Promise<BBBackend.IGroupUsers[]> {
    const path = "/learn/api/public/v1/courses/" + parameters.courseId + "/groups/" + parameters.groupId + "/users";
    return new Promise((resolve, reject) => {
        HTTPRequest.getAsync(path).then((response) => {
            const allUserInformation = JSON.parse(response);
            const responseInfo = new Array<BBBackend.IGroupUsers>();

            allUserInformation.results.forEach((result) => {
                const resultObject: BBBackend.IGroupUsers = {
                    id: result.id
                }
                responseInfo.push(resultObject);
            });
            resolve(responseInfo);
        })
    })
  }
}
