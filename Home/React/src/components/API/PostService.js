import axios from "axios";

class PostService {

    static async getAll() { /* Используем статический метод для получения данных */

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');

        return response.data;
    }
}

export default PostService;