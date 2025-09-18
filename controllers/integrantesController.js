export default {
    async show(req, res) {
        res.render("integrantes/show", {
            title: "Integrantes",
        });
    }
}