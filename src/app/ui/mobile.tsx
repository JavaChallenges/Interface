export default function MobileNotice (){
    return (
        <div style={{height: "calc( 100% - 20px )"}} className='flex justify-center items-center bg-transparent h-full'>
            <p className={"text-center"}>
                Diese Seite unterstützt derzeit keine Geräte mit geringer Bildschirmbreite. Falls möglich, verwende dein Gerät im Querformat oder besuche die Seite auf einem Gerät mit einem größeren Bildschirm.
            </p>
        </div>
    )
}