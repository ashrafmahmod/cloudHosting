// must name error.js or error.ts to catch page to handle errors in next
"use client" // must be client component
import Link from "next/link"

 // i wanna get error mesages in error page next handle this page auto and error message u just need to define the error as prop
 // next so smart it cathes error u just throw new Error() and next will auto catch error happens in any page.tsx in app folder without ur handle if u wanna make erro.tsx just for article u just make error.tsx in article folder so this error page any other page cant see it
interface ErrorPageProps {
    error:Error;
    reset:()=> void // reset method re render the page
}

const ErrorPage = ({error,reset}:ErrorPageProps) => {
  return (
    <div className="fix-height pt-7 text-center ">
        <div className="text-3xl text-red-600 font-semibold">
            Something went wrong
        </div>
        <h2 className="text-gray-700 my-3 text-xl">Error message: {error.message}</h2>
        <button onClick={()=>reset()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Try again</button>
        <Link className="text-xl underline text-blue-700 block mt-6" href="/">Go to home page</Link>
    </div>
  )
}

export default ErrorPage