import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from 'next/router'
import { services } from "@/services"
import { useMutation } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import Loading from "@/components/Loading"

export default function ObjectPage() {
  const session = useQuery({
    queryKey: ['session'],
    queryFn: () => console.log()
  })

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
    console.log(image)
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
    <>
    <div className="ObjectPage">
      <div>
        <div className="PriceDiv">
          <span className="SpanTime">Время готовки: </span>
          <input className="InputPrice" value={object.price} disabled={!editState} onChange={(e)=>setObject({...object, price: e.target.value})} autoComplete="off"/>
          <span className="Span"> минут</span>
        </div>
        <textarea className="Textarea" value={object.description} onChange={(e)=>setObject({...object, description: e.target.value})} disabled={!editState} autoComplete="off"/>
      </div>
      <div className="RightDiv">
        <div className="InfoDiv">
          <div className="ImageDiv">
            <Image src={object.image} height={600} width={1050} alt=""/>
          </div>
          <input className="InputName" value={object.name} onChange={(e)=>setObject({...object, name: e.target.value})} disabled={!editState} autoComplete="off"/>
          <div className="AdminPanel">
            {session.data ?
            !editState
            ?
            <>
            <button className="Button" onClick={()=>setEditState(true)}>ИЗМЕНИТЬ</button>
            <button className="Button" onClick={delObject}>УДАЛИТЬ</button>
            </>
            :
            <>
            <input className="InputImage" name={object.image} type="file" onChange={uploadImage} autoComplete="off"/>
            <button className="Button" onClick={editObject}>ПОДТВЕРДИТЬ</button>
            <button className="Button" onClick={cansel}>ОТМЕНИТЬ</button>
            </>
            :
            <></>}
          </div>
        </div>
        <div className="ExitDiv">
          <Link className="Button" href="/">ЗАКРЫТЬ</Link>
        </div>
      </div>
    </div>
    {(thisObject.isFetching || sendUpdate.isLoading) && <Loading/>}
    </>
  )
}