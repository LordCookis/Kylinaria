import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from 'next/router'
import { services } from "@/services"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"

export default function ObjectPage() {
  //const session = useQuery({
  //  queryKey: ['session'],
  //  queryFn: () => console.log()
  //})

  const [object, setObject] = useState({
    name: "",
		description: "",
		image: "",
		price: ""
  })
  const [objectCopy, setObjectCopy] = useState({})
  const [image, setImage] = useState([])
  const [editState, setEditState] = useState(false)
  const router = useRouter()
  const { id } = router.query

  const thisObject = useQuery({
    queryKey: ['thisObject'],
    queryFn: () => services.base.objects(),
    onSuccess: (data) => {
      setObject(data.filter((item) => item.id == id)[0])
      setObjectCopy(data.filter((item) => item.id == id)[0])
    }
  })

  const editObject = async() => {
    sendUpdate.mutate()
		setEditState(false)
    console.log(object)
  }

  const sendUpdate = useMutation({
    mutationFn: () => {
      return services.base.upd(id, object, image)
    },
    onSuccess: () => thisObject.refetch()
  })

  const delObject = async() => {
    await services.base.del(id)
    router.push('/')
    thisObject.refetch()
  }

  const cansel = () => {
    setEditState(false)
    setObject(objectCopy)
  }

  const uploadImage = async(e) => setImage(e.target.files[0])

  return(
    <div className="ObjectPage">
      <Image src={object.image} height={400} width={600} alt=""/>
      <input className="ObjectInput" value={object.name} onChange={(e)=>setObject({...object, name: e.target.value})} disabled={!editState} autoComplete="off"/>
      <textarea className="ObjectInput" value={object.description} onChange={(e)=>setObject({...object, description: e.target.value})} disabled={!editState} autoComplete="off"/>
      <input className="ObjectInput" value={object.price} disabled={!editState} onChange={(e)=>setObject({...object, price: e.target.value})} autoComplete="off"/>
      <Link className="ObjectButton" href="/">ЗАКРЫТЬ</Link>
      <div className="AdminPanel">
        {!editState
        ?
        <>
        <button className="AdminButton" onClick={()=>setEditState(true)}>ИЗМЕНИТЬ</button>
        <button className="AdminButton" onClick={delObject}>УДАЛИТЬ</button>
        </>
        :
        <>
        <input name={object.image} type="file" onChange={uploadImage} autoComplete="off"/>
        <button className="AdminButton" onClick={editObject}>ПОДТВЕРДИТЬ</button>
        <button className="AdminButton" onClick={cansel}>ОТМЕНИТЬ</button>
        </>
        }
      </div>
    </div>
  )
}