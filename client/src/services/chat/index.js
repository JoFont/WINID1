

export const createGroupChat = async firebase => {
  try {
    const db = firebase.firestore();
    const newDoc = await db.collection("chatGroups").add({
      meta: {
        id: "tempId",
        type: "Pending State"
      }
    });

    return newDoc;
  } catch (error) {
    throw error;
  }
};

export const updateGroupChatMeta = async (firebase, data) => {
  try {
    const db = firebase.firestore();
    const newDoc = await db.collection("chatGroups").doc(data.docId).update({
      meta: {
        id: data.id,
        type: data.type
      }
    });

    return newDoc;
  } catch (error) {
    throw error;
  }
}