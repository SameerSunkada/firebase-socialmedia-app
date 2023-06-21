import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/Firebase";
import { Post as PostInterface} from "./Main"
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
    post : PostInterface;
}

interface Like {
    likeId : string,
    userId : string
}

const Post = ({ post } : Props) => {

    const [likes, setLikes] = useState<Like[] | null>(null);
    const likesRef = collection(db, "likes");
    const [user] = useAuthState(auth);

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        setLikes(data.docs.map( doc => ({ userId : doc.data().userI, likeId : doc.id })))
    }

    const addLike = async () => {
        try{
            const newDoc = await addDoc(likesRef, {
                userId : user?.uid,
                postId : post.id
            })
            if(user){
                setLikes((prev) => prev? [...prev, {userId : user.uid, likeId : newDoc.id }] : [{userId : user.uid, likeId : newDoc.id }]);
            }
        } catch(err){
            console.log(err);
        }
    }

    const removeLike = async () => {
        try{
            const likeQuery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid));
            const likeData = await getDocs(likeQuery);
            const likeId = likeData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);
            await deleteDoc(likeToDelete);
            await addDoc(likesRef, {
                userId : user?.uid,
                postId : post.id
            })
            if(user){
                setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
            }
        } catch(err){
            console.log(err);
        }
    }

    const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

    const likesDoc = query(likesRef, where("postId", "==", post.id));
    
    useEffect(() => {
        getLikes();
    }, []);

  return (
    <div style={{border : "blue 10px slateblue"}}>
        <div className="title">
            <h1> {post.title} </h1>
        </div>
        <div className="body">
            <p> {post.description} </p>
        </div>
        <div className="footer">
            <p> @{post.username} </p>
            {user && <button onClick={hasUserLiked? removeLike : addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>}
            {likes && <p>Likes: {likes?.length}</p>}
        </div>
    </div>
  )
}

export default Post