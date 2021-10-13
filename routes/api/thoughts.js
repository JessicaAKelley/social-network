const router = require("express").Router();
const db = require("../../models");

router
  .route("/")
  .get((req, res) => {
    db.Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((e) => {
        console.log(e);
        res.json(e);
      });
  })
  .post((req, res) => {
    db.Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((e) => {
        console.log(e);
        res.json(e);
      });
  });

router
  .route("/:id")
  .get((req, res) => {
    db.Thought.findById(req.params.id)
      .then((thought) => res.json(thought))
      .catch((e) => {
        console.log(e);
        res.json(e);
      });
  })
  .put((req, res) => {
    db.Thought.findOneAndUpdate(
      req.params.id,
      {
        thoughtText: req.body.thoughtText,
      },
      {
        new: true,
      }
    )
      .then((thought) => res.json(thought))
      .catch((e) => {
        res.json(e);
      });
  })
  .delete((req, res) => {
    db.Thought.deleteOne({ _id: req.params.id })
      .then((thought) => res.json(thought))
      .catch((e) => {
        res.json(e);
      });
  });

router.route("/:thoughtId/reactions").post((req, res) => {
  db.Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    {
      $push: {
        reactions: req.body,
      },
    },
    {
      new: true,
    }
  )
    .then((thought) => res.json(thought))
    .catch((e) => {
      res.json(e);
    });
});

router.route("/:thoughtId/reactions/:reactionId").delete((req, res) => {
  db.Thought.findByIdAndUpdate(
    req.params.thoughtId,
    {
      $pull: {
        reactions: {
          _id: req.params.reactionId,
        },
      },
    },
    {
      new: true,
    }
  )
    .then(() => res.json("Reaction was deleted!"))
    .catch((e) => {
      res.json(e);
    });
});

module.exports = router;