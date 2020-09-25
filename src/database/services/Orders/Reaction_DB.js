import db from '../../models';

export async function createComment(orderId, userId, comment) {
    const newComment = await db.OrderReaction.create({orderId, userId, comment});
    return newComment
}

export async function updateComment(OrderReactionId, newComment) {
    const comment = await db.OrderReaction.findByPk(OrderReactionId);
    if (comment) {
        comment.comment = newComment;
        await comment.save()
    }
    return comment
}

export async function deleteComment() {
    const comment = await db.OrderReaction.findByPk(OrderReactionId);
    if (comment) {
        await comment.destroy()
    }
}