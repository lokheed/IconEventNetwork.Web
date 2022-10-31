import { ApiParameters, ClientBase, CollectionSuccessResponse, HeadshotInfo } from "./client-base";

export class TestimonialClient extends ClientBase {
    private endpoint = "/api/testimonials";

    constructor() {
        super();
    }

    public getTestimonials(parameters?: ApiParameters) {
        return new Promise<CollectionSuccessResponse<GetTestimonialsResponse>>((resolve, reject) => {
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

export interface GetTestimonialsResponse{
    Company: string;
    Name: string;
    Quote: string;
    Headshot: HeadshotInfo;
}