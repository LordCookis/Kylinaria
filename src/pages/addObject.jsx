import { useState } from "react"
import { services } from "@/services"

export default function AddObject() {
	const [object, setObject] = useState({
		name: "",
		description: "",
		price: ""
	})
  const [image, setImage] = useState([])

	const addObject = async(e) => {
    e.preventDefault()
    if (!object.name && !image) {return}
    const result = await services.base.add(object, image)
		setObject({
			name: "",
			description: "",
			price: ""
		})
		setImage([])
  }

	const uploadImage = async(e) => setImage(e.target.files[0])

  return(
    <form className="AddObjectPage" onSubmit={addObject}>
      <span className="Span">ДОБАВИТЬ РЕЦЕПТ</span>
      <input className="Input" placeholder="НАЗВАНИЕ БЛЮДА" value={object.name} onChange={(e)=>setObject({...object, name: e.target.value})} autoComplete="off"/>
      <textarea className="Textarea" placeholder="РЕЦЕПТ" value={object.description} onChange={(e)=>setObject({...object, description: e.target.value})} autoComplete="off"/>
      <input className="Input" placeholder="ВРЕМЯ ГОТОВКИ" value={object.price} onChange={(e)=>setObject({...object, price: e.target.value})} autoComplete="off"/>
      <input className="Input" type="file" name={image} onChange={uploadImage} autoComplete="off"/>
      <button className="Button">ДОБАВИТЬ</button>
    </form>
  )
} 