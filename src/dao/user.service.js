import userModel from './models/users.model.js';

class UserService {
constructor() {
    this.model = userModel;
    }

    async getALL() {
        return await this.model.find();
    }

    async getByEmail(email) {
        return await this.model.findOne({ email: email});
    }

    async createUser(userData) {
        return await this.model.create(userData);
    }

}


const userService = new UserService() ;
export default userService;
