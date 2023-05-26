export default function ButtonComponent({name, hoverColor} : {name:string, hoverColor:string}){
    return(
        <>
            <div className='flex justify-center mb-3'>
                <button className={`border border-black rounded-lg py-1 px-6 duration-300 hover:bg-${hoverColor} transition ease-in-out`}>{name}</button>
            </div>
        </>
    )
}