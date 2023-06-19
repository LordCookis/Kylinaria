import { useQuery } from "@tanstack/react-query"
import { services } from "@/services"
import Image from "next/image"
import Link from "next/link"
import Loading from "@/components/Loading"

export default function MainPage() {
  const thisObject = useQuery({
    queryKey: ['thisObject'],
    queryFn: () => services.base.objects()
  })

  return(
    <div className="MainPage">
      {thisObject.data?.map((item) => 
      <Link href={`./${item.id}`} key={item.id}>
        <div className="Object">
          <Image src={item.image} height={200} width={350} alt=""/>
          <div className="ObjectText">
            <span className="ObjectSpan">{item.name}</span>
            <span className="ObjectSpan">Время готовки - {item.price} минут</span>
          </div>
        </div>
      </Link>).reverse()}
      {(thisObject.isFetching) && <Loading/>}
    </div>
  )
}
