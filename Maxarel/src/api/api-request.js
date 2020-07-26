import {axiosInstance} from "./api-instance";

const METHOD_GET = "get";
const METHOD_POST = "post";
const METHOD_PUT = "put";
const REQ_JSON = "json";
const REQ_FORM_DATA = "form-data";
const METHOD_DELETE = "delete"
export class APIRequest {
        doRequest() {
            switch (this.method) {
                case METHOD_GET:
                    axiosInstance.get(this.url, { params: this.params})
                        .then(response => this.onAPIResponse(response))
                        .catch(error => this.onAPIError(error));
                    break;
                case METHOD_PUT:
                    axiosInstance.put(this.url, this.params)
                        .then(response => this.onAPIResponse(response))
                        .catch(error => this.onAPIError(error));
                    break;
                case METHOD_DELETE: 
                    this.config.data = this.params;
                    axiosInstance.delete(this.url, this.config)
                    .then(response => this.onAPIResponse(response))
                    .catch(error => this.onAPIError(error));
                    break;
                case METHOD_POST:
                default:
                    axiosInstance.post(this.url, this.params, this.config)
                        .then(response => this.onAPIResponse(response))
                        .catch(error => this.onAPIError(error));
                    break;
            }
    }

    config = {
        headers: {
            "Content-Type": 'application/json'
        },
    }

    onAPIResponse = (response) => {
        //this.onResponse(response, this.reqID);
        this.onResponse(response);
    };

    onAPIError = (error) => {
        //this.onError(error, this.reqID);
        console.log("Error", error)
        this.onError(error);
    };

    static
    Builder = class {

        constructor() {
            this.axios = new APIRequest();
        }

        reqURL(url) {
            this.axios.url = url;
            return this;
        }

        post() {
            this.axios.method = METHOD_POST;
            return this;
        }

        get() {
            this.axios.method = METHOD_GET;
            return this;
        }

        put() {
            this.axios.method = METHOD_PUT;
            return this;
        }

        delete() {
            this.axios.method = METHOD_DELETE;
            return this;
        }

        jsonParams(params) {
            this.axios.reqType = REQ_JSON;
            this.axios.params = params;
            return this;
        }

        paramsGet(params)
        {
            this.axios.params = params;
            return this;
        }

        paramsDelete(params)
        {
            this.axios.params = params;
            return this;
        }

        params(key, value) {
            this.axios.reqType = REQ_FORM_DATA;
            if (this.axios.params === undefined || this.axios.params === null) {
                this.axios.params = new FormData();
            }
            this.axios.params.append(key, value);
            return this;
        }

        addFile(key, uri, type = "image/jpeg", name = "") {
            this.axios.reqType = REQ_FORM_DATA;
            if (this.axios.params === undefined || this.axios.params === null) {
                this.axios.params = new FormData();
            }
            this.axios.params.append(key, {
                uri: uri,
                type: type, // or photo.type
                name: name
            });
            return this;
        }


        setReqId(reqID) {
            this.axios.reqID = reqID;
            return this;
        }

        setLoading(isLoading) {
            this.axios.isLoading = isLoading;
            return this;
        }

        response(onResponse) {
            this.axios.onResponse = onResponse;
            return this;
        }

        error(onError) {
            this.axios.onError = onError;
            return this;
        }

        build() {
            return this.axios;
        }
    }
}