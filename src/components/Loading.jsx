import Image from "next/image"
import Zagryzka from '@/assets/loading.gif'

export default function Loading() {
  return(
    <div className='Loading'><Image src={Zagryzka} height={500} width={650}/></div>
  )
}