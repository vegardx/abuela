import axios from "axios";
import BaseService from "./base";

class PhotoService extends BaseService {
  getAll() {
    return axios.get(
      `${this.apiRootDynamic}photos`
    );
  }

  getSelected() {
    return axios.get(
      `${this.apiRootDynamic}photos/active`
    );
  }

  setSelected(id) {
    return axios.post(
      `${this.apiRootDynamic}photos/active`,
      {
          id: id
      }
    );
  }
}

export default PhotoService;
