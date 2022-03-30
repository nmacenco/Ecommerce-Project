const { Router } = require("express");

const router = Router();


router.delete("/dogdelete", async (req, res) => {

  const id = req.query.id;
  let dogDeleted = await Dog.destroy({
    where: {
      id,
    },
  });

  res.status(200).send("Raza borrada con exito");

});

module.exports = router;
