import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  const userId = req.query.id;
  switch (req.method) {
    case "GET":
      const user = await prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
      });
      return res.status(200).json(user);
    case "PATCH":
      //set lastSeen to current time
      const userData = await prisma.user.update({
        where: {
          id: Number(userId),
        },
        data: {
          lastSeen: new Date().toISOString(),
          ...req.body,
        },
      });
      console.log("patch", userData);
      return res.status(200).json(userData);
    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}
