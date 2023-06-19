import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

export default function NavBar() {
  const session = useQuery({
    queryKey: ['session'],
    queryFn: () => console.log()
  })

  return(
    <div className='NavBar'>
      <Link href='/' className='Link'>САЙТ</Link>
      {!session.data ? <Link href='/logReg' className='Link'>ВОЙТИ</Link> : <Link href='/logReg' className='Link'>ЗАРЕГИСТРИРОВАТЬ</Link>}
      {session.data ? <Link href='/addObject' className='Link'>ДОБАВИТЬ</Link> : <></>}
    </div>
  )
}