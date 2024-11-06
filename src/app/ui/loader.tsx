export default function Loader (){
    return (
        <div className='flex justify-center items-center bg-transparent h-full'>
            <span className='sr-only'>Loading...</span>
            <div className='h-2.5 w-2.5 bg-primary-50 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-2.5 w-2.5 mx-1 bg-primary-50 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-2.5 w-2.5 bg-primary-50 rounded-full animate-bounce'></div>
        </div>
    )
}