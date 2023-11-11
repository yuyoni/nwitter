import { dbService, storageService } from "fbase";
import { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");

    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();

      if (nweetObj.attachmentUrl !== "") {
        await storageService.refFromURL(nweetObj.attachmentUrl).delete();
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({ text: newNweet });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form>
            <input onChange={onChange} value={newNweet} required />
          </form>
          <button onClick={toggleEditing}>Cancle</button>
          <button onClick={onSubmit}>Update</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>
          {nweetObj.attachmentUrl && (
            <img src={nweetObj.attachmentUrl} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>X</button>
              <button onClick={toggleEditing}>edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
