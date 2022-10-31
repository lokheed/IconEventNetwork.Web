import { ApiParameters, ClientBase, HeadshotInfo, SuccessResponse } from "./client-base";

export class LeadershipTeamMemberClient extends ClientBase {
    private endpoint = "/api/leadership-team-members";

    constructor() {
        super();
    }

    public getLeadershipTeamMembers(parameters?: ApiParameters) {
        return new Promise<SuccessResponse<GetLeadershipTeamMembersResponse[]>>((resolve, reject) => {
            let query = this.stringifyParameters(parameters);
            fetch(
                `${this.baseUrl}${this.endpoint}?${query}`,
                {
                    method: "GET",
                })
                .then(response => {
                    return resolve(this.processResponse(response));
                })
                .catch(error => reject(error));
        });
    }
}

export interface GetLeadershipTeamMembersResponse{
    Bio: string;
    FirstName: string;
    LastName: string;
    Title: string;
    Headshot: HeadshotInfo;
}