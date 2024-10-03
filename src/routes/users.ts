import exress from "express";
import prisma from "../../prisma/prisma";
import { subHours } from "date-fns";
import { generateKeyPair } from "crypto";
import { GenerateKeyPairs } from "../utils/key-generator";
const router = exress.Router();

router.get("/:userId/active-public-key", async (req, res) => {
  const user_id = req.params.userId;

  const before30Minute = subHours(new Date(Date.now()), 0.5).getUTCDate();

  if (!user_id)
    res.json({
      status: false,
      message: "invalid user id.",
    });
  else {
    const founded = await prisma.keys.findFirst({
      where: {
        user_id,
        created_at: {
          gte: before30Minute,
        },
      },
    });

    if (!founded) {
      try {
        const generatedKeys = await GenerateKeyPairs();

        const newKey = await prisma.keys.create({
          data: {
            user_id,
            public_key: generatedKeys.publicKey,
            private_key: generatedKeys.privateKey,
            created_at: new Date(Date.now()).getUTCDate(),
          },
        });

        res.json({
          status: true,
          key_id: newKey.id,
          key: newKey.public_key,
        });
      } catch (error) {
        res.json({
          status: false,
          message: "generation failed to unhandled reason",
        });
      }
    } else
      res.json({
        status: true,
        key_id: founded.id,
        key: founded.public_key,
      });
  }
});

router.get("/:userId/active-private-key", async (req, res) => {
  const user_id = req.params.userId;

  const before30Minute = subHours(new Date(Date.now()), 0.5).getUTCDate();

  if (!user_id)
    res.json({
      status: false,
      message: "invalid user id.",
    });
  else {
    const founded = await prisma.keys.findFirst({
      where: {
        user_id,
        created_at: {
          gte: before30Minute,
        },
      },
    });

    if (!founded) {
      try {
        const generatedKeys = await GenerateKeyPairs();

        const newKey = await prisma.keys.create({
          data: {
            user_id,
            public_key: generatedKeys.publicKey,
            private_key: generatedKeys.privateKey,
            created_at: new Date(Date.now()).getUTCDate(),
          },
        });

        res.json({
          status: true,
          key_id: newKey.id,
          key: newKey.private_key,
        });
      } catch (error) {
        res.json({
          status: false,
          message: "generation failed to unhandled reason",
        });
      }
    } else
      res.json({
        status: true,
        key_id: founded.id,
        key: founded.private_key,
      });
  }
});

router.get("/:userId/active-keys", async (req, res) => {
  const user_id = req.params.userId;

  const before30Minute = subHours(new Date(Date.now()), 0.5).getUTCDate();

  if (!user_id)
    res.json({
      status: false,
      message: "invalid user id.",
    });
  else {
    const founded = await prisma.keys.findFirst({
      where: {
        user_id,
        created_at: {
          gte: before30Minute,
        },
      },
    });

    if (!founded) {
      try {
        const generatedKeys = await GenerateKeyPairs();

        const newKey = await prisma.keys.create({
          data: {
            user_id,
            public_key: generatedKeys.publicKey,
            private_key: generatedKeys.privateKey,
            created_at: new Date(Date.now()).getUTCDate(),
          },
        });

        res.json({
          status: true,
          keys: newKey,
        });
      } catch (error) {
        res.json({
          status: false,
          message: "generation failed to unhandled reason",
        });
      }
    } else
      res.json({
        status: true,
        keys: founded,
      });
  }
});

router.get("/:userId/keys", async (req, res) => {
  const user_id = req.params.userId;

  if (!user_id)
    res.json({
      status: false,
      message: "invalid user id.",
    });
  else {
    const keys = await prisma.keys.findMany({
      where: {
        user_id,
      },
    });

    if (!keys) {
      res.json({
        status: false,
        message: "key not found.",
      });
    } else
      res.json({
        status: true,
        keys,
      });
  }
});

router.get("/:userId/keys/:keyId", async (req, res) => {
  const user_id = req.params.userId;
  const id = req.params.keyId;

  if (!user_id || !id)
    res.json({
      status: false,
      message: "invalid user or key id.",
    });
  else {
    const founded = await prisma.keys.findUnique({
      where: {
        id,
        user_id,
      },
    });

    if (!founded) {
      res.json({
        status: false,
        message: "key not found.",
      });
    } else
      res.json({
        status: true,
        key: founded,
      });
  }
});

export const usersRouter = router;
