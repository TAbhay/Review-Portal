import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    Reviews(url = 'api/review/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            update: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        }
    }
}