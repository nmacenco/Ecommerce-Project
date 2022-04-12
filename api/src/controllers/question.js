const {
    Question,
} = require("../db");

const createQuestion = async (req, res) => {
    try {
        let { ProductId, title, description,UserId } = req.body;

        if (!ProductId || !title || !description || !UserId) {
            res.status(402).send({ errorMsg: "Missing data." });
        } else {
            let newQuestion = await Question.create({
                ProductId,
                UserId,
                title,
                description,
            });
            newQuestion
                ? res.status(201).json({ successMsg: "The question has been added to the product.", data: newQuestion })
                : res.status(401).json({ errorMsg: "An error happend adding the question" });
        };
    } catch (error) {
        console.log('el error: ',error)
        res.status(500).send({ errorMsg: error.message });
    }
};

const getQuestions = async (req, res) => {
    try {
        let dataQuestions = await Question.findAll({ attributes: ["id","UserId", "ProductId", "title", "description", "answer"] });

        if (!dataQuestions) {
            res.status(404).send({ errorMsg: "There are no questions available." });
        } else {
            res
                .status(200)
                .send({ successMsg: "Here are your questions.", data: dataQuestions });
        }
    } catch (error) {
        res.status(500).send({ errorMsg: error.message });
    }
};

const getSingleQuestion = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400).send({ errorMsg: "Missing data." });
        } else {
            let singleQuestion = await Question.findOne({
                attributes: ["id", "ProductId","UserId", "title", "description", "answer"],
                where: {
                    id,
                },
            });
            if (!singleQuestion) {
                res.status(404).send({ errorMsg: "Question not found in the database." });
            } else {
                res
                    .status(200)
                    .send({ successMsg: "Here is your product.", data: singleQuestion });
            }
        }
    } catch (error) {
        res.status(500).send({ errorMsg: error.message });
    }
};


const updateQuestion = async (req, res) => {
    let { id, ProductId, UserId, title, description, answer } = req.body;

    try {
        if (!ProductId || !UserId || !title || !description || !answer) {
            res.status(402).send({ errorMsg: "Missing data." });
        } else {
            let questionToUpdate = await Question.findOne({
                where: {
                    id: id,
                    ProductId: ProductId,
                },
            });
            if (!questionToUpdate) {
                res.status(404).send({ errorMsg: "Question not found." });
            } else {
                let updatedQuestion = await questionToUpdate.update({
                    ProductId,
                    UserId,
                    title,
                    description,
                    answer,
                });
                updatedQuestion ?
                    res.status(200).send({
                        successMsg: "Question has been updated in Database",
                        data: `Question id: ${updatedQuestion}`
                    })
                    : res.status(401).json({ errorMsg: "Question hasn't exists in the database." });
            }
        }

    } catch (error) {
        res.status(500).send({ errorMsg: error.message });
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
            deletedQuestion ?
                res.status(200).send({
                    successMsg: "Question has been deleted from Database",
                    data: `Question id: ${deletedQuestion}`
                })
                : res.status(401).json({ errorMsg: "Question hasn't exists in the database." });

        }
    } catch (error) {
        res.status(500).send({ errorMsg: error.message });
    }
};

module.exports = {
    createQuestion,
    updateQuestion,
    getQuestions,
    getSingleQuestion,
    deleteQuestion,
};
