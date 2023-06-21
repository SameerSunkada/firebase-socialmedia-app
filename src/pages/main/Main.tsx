import { collection, getDocs } from "firebase/firestore"
import { db } from "../../config/Firebase"
import { useEffect, useState } from "react";
import Post from "./Post";

export interface Post{
  id : string,
  title : string,
  description : string,
  userId : string,
  username : string
}

const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postsRef = collection(db,"posts")

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(data.docs.map( doc => ({...doc.data(), id : doc.id})) as Post[]);
  }

  useEffect(() => {
    getPosts();
  },[])
  return (
    <div>
      {postsList?postsList.map((post) => (
        <Post post = { post } />
      )) : <h1>No Posts Available</h1>}
    </div>
  )
}

export default Main