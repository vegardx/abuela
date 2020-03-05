import axios from "axios";
import BaseService from "./base";

class PhotoService extends BaseService {
  getAll(album) {
    return axios.get(
      `${this.apiRootDynamic}photos?album=${album || ''}`
    );
  }

  getSelected() {
    return axios.get(
      `${this.apiRootDynamic}photos/active`
    );
  }

  setSelected(photo) {
    return axios.post(
      `${this.apiRootDynamic}photos/active`,
      {
          album: photo.album,
          id: photo.id
      }
    );
  }
}

export default PhotoService;
