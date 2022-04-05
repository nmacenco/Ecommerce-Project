const {
    Question,
} = require("../db");

const createQuestion = async (req, res) => {
    try {
        let { productid, title, description } = req.body;

        if (!productid || !title || !description) {
            res.status(402).send({ errorMsg: "Missing data." });
        } else {
            let [newQuestion, created] = await Question.Create({
                productid,
                title,
                description
            });
        };
        created
            ? res.status(201).json({ successMsg: "The question has been added to the product.", data: newQuestion })
            : res.status(401).json({ errorMsg: "An error happend adding the question" });
    } catch (error) {
        res.status(500).send({ errorMsg: error });
    }
};

const updateQuestion = async (req, res) => {
    try {
        let questionToUpdate = await Question.findOne({
            where: {
                name: id,
                code: productid,
            },
        });
        if (!questionToUpdate) {
            res.status(404).send({ errorMsg: "Question not found." });
        } else {
            let updatedQuestion = await questionToUpdate.Update({
                productid,
                title,
                description
            });

            res.status(200).send({
                successMsg: "Question successfully updated.",
                data: updatedQuestion,
            });
        }
    } catch (error) {
        res.status(500).send({ errorMsg: error });
    }
};

const getSingleQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({ errorMsg: "Missing data." });
        } else {
            let singleQuestion = await Question.findOne({
                attributes: ["id","ProductId", "title", "description"],
                where: {
                    id,
                },
            });
            if (!singleQuestion) {
                res.status(404).send({ errorMsg: "Product not found." });
            } else {
                res
                    .status(200)
                    .send({ successMsg: "Here is your product.", data: singleQuestion });
            }
        }
    } catch (error) {
        res.status(500).send({ errorMsg: error });
    }
};

const getQuestions = async (req, res) => {
    try {
        let dataQuestions = await Question.findAll({ attributes: ["id", "ProductId", "title", "description"] });
        
        if (!dataQuestions) {
            res.status(404).send({ errorMsg: "There are no questions available." });
        } else {
            res
                .status(200)
                .send({ successMsg: "Here are your questions.", data: dataQuestions });
        }
    } catch (error) {
        res.status(500).send({ errorMsg: error });
    }
};

const deleteQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        Number(id);
        if (!id) {
            res.status(400).send({ errorMsg: "Missing data." });
        } else {
            let deletedQuestion = await Question.destroy({
                where: {
                    id,
                },
            });
            res.status(200).send({
                successMsg: "Question has been deleted in Database",
                data: `Question id: ${deletedQuestion}`,
            });
        }
    } catch (error) {
        res.status(500).send({ errorMsg: error });
    }
};

module.exports = {
    createQuestion,
    updateQuestion,
    getQuestions,
    getSingleQuestion,
    deleteQuestion,
};
