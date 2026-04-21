class DBRepo {
    Model;
    constructor(Model) {
        this.Model = Model;
    }
    async Create({ data, options, }) {
        return await this.Model.create(data, options);
    }
    async findOne({ filter, projection, options, }) {
        return await this.Model.findOne(filter, projection, options);
    }
}
export default DBRepo;
