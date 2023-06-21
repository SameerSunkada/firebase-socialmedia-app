import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../../config/Firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"

interface FormData{
    title : string,
    description : string
}

const CreateForm = () => {
    const schema = yup.object().shape({
        title : yup.string().required("title is required"),
        description : yup.string().required("Description is required")
    })

    const { register, handleSubmit, formState : { errors } } = useForm<FormData>({
        resolver : yupResolver(schema)
    })

    const postsRef = collection(db, "posts");
    const [user] = useAuthState(auth);
    const navigate = useNavigate();


    const handleCreatePost = async (data : FormData) => {
        await addDoc(postsRef, {
            ...data,
            username : user?.displayName,
            userId : user?.uid
        })

        navigate("/")
    }


  return (
    <div>
        <form onSubmit={handleSubmit(handleCreatePost)} >
            <input type="text" placeholder="Title..." {...register("title")} />
            <p style = {{color: "red"}}>*{errors.title?.message}</p>
            <textarea placeholder="Description..." {...register("description")} />
            <p style = {{color: "red"}}>*{errors.description?.message}</p>
            <input type="submit" className="submitForm" />
        </form>
    </div>
  )
}

export default CreateForm