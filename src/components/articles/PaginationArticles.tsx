import Link from "next/link";

interface PaginationProps {
  pages:number;
  pageNumber:number;
  route:string
}

const PaginationArticles = ({pageNumber , pages,route}:PaginationProps) => {
  let pagesArray :number[] = []
  pagesArray = [...Array(pages).keys()].map(i=>i+1) // [1,2,3,4,5] without map will start from 0
  return (
    <div className='flex  items-center justify-center mt-2 mb-10'>
       {pageNumber > 1 && (
         <Link href={`${route}?pageNumber=${ pageNumber > 1 ?   pageNumber -1 : pageNumber }`} 
            className="border border-gray-700 py-1 px-3 font-semibold text-xl cursor-pointer hover:bg-gray-200 transition" 
            >Prev</Link>
       )}
        {pagesArray.map(page=>(
            <Link href={`${route}?pageNumber=${page}`}
            className= {` ${pageNumber === page && "bg-gray-400"} border border-gray-700 py-1 px-3 font-semibold text-xl cursor-pointer hover:bg-gray-200 transition`}
            key={page}>{page}</Link>
        ))}
        {pageNumber !== pages && (
          <Link href={`${route}?pageNumber=${ pageNumber < pages ?   pageNumber + 1 : pageNumber }`} 
            className="border border-gray-700 py-1 px-3 font-semibold text-xl cursor-pointer hover:bg-gray-200 transition" 
            >Next</Link>
        )}
    </div>
  )
}

export default PaginationArticles