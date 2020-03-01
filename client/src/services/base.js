class BaseService {
    apiRoot = "/static/";
    apiRootDynamic = window.location.port === "3000" ? `http://localhost:8080/api/` : `/api/`;
    apiRootDownload = window.location.port === "3000" ? `http://localhost:8080/api/` : `/api/`;
}

export default BaseService;
