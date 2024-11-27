export default function Circleprogress({className, labelNumber, title, subtitle, percentage, color, additionalText}:
    {
        color?: string,
        title:string,
        className?: string,
        percentage: number,
        subtitle?: string,
        additionalText?: string,
        labelNumber: string|number
    }) {
    const mappedPercentage = (percentage / 100) * 75;
    if(!color){color = "#2563eb"}
    return (
        <div
            className={`${className} grid h-full w-full grid-cols-6 flex-wrap content-center items-center rounded-2xl bg-white px-6 shadow-xl`}>
            <div className="col-span-2 relative size-[6.5rem] rounded-[100%] bg-white">
                <svg className="size-full rotate-[135deg]" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="18" cy="18" r="16" fill="none" className="strokeCurrent text-gray-200"
                            strokeWidth="2" strokeDasharray="75 100" strokeLinecap="round"></circle>

                    <circle style={{color:color}} cx="18" cy="18" r="16" fill="none" className="stroke-current"
                            strokeWidth="2" strokeDasharray={`${mappedPercentage} 100`} strokeLinecap="round"></circle>
                </svg>

                <div style={{color:color}} className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center">
                    <span className="text-2xl font-bold">{labelNumber}</span>
                    <span style={{color:color}}  className="block">{subtitle}</span>
                </div>
            </div>

            <p className={"col-span-3 ml-5 font-medium text-gray-600 sm:text-xl"}>{title}</p>

            <span style={{color:color}} className="ml-auto hidden text-xl font-medium sm:block">{additionalText}</span>
        </div>
    )
}