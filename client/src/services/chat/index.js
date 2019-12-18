

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

export const sendChatMessage = async (firebase, groupId, data) => {
  try {
    const db = firebase.firestore();
    const newMessage = await db.collection("chatGroups").doc(groupId).collection("messages").add({
      photoUrl: data.photoUrl,
      text: data.text,
      displayName: data.displayName,
      username: data.username,
      playerId: data.playerId,
      date: firebase.firestore.FieldValue.serverTimestamp()
    });

    return newMessage;
  } catch (error) {
    throw error;
  }
}

export const sendChatStatus = async (firebase, groupId, data) => {
  try {
    const db = firebase.firestore();
    const newMessage = await db.collection("chatGroups").doc(groupId).collection("messages").add({
      isNotification: true,
      type: data.type,
      text: data.text,
      date: firebase.firestore.FieldValue.serverTimestamp()
    });
    return newMessage;
  } catch (error) {
    throw error;
  }
}