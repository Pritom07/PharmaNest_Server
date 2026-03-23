import { prisma } from "../../lib/prisma";
import { T_review } from "../../types/review.type";

const createReviewOrUpdate = async (payLoad: T_review) => {
  const res = await prisma.reviews.upsert({
    where: {
      order_id: payLoad.order_id,
    },
    update: {
      customer_id: payLoad.customer_id,
      comment: payLoad.comment,
    },
    create: payLoad,
  });

  return res;
};

const getAllReviews = async () => {
  const res = await prisma.reviews.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      customer: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return res;
};

export const reviewServices = { createReviewOrUpdate, getAllReviews };
