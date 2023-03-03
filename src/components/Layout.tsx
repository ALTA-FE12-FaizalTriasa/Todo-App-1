import React, {FC} from 'react'

interface LayoutProps{
    children?: React.ReactNode
    mode?: boolean
}


const Layout: FC<LayoutProps> = ({ children, mode }) => {
    return (
        <div
            className={`flex flex-col min-h-screen w-screen ${mode ? "bg-slate-900" : "bg-base-100"}`}
            >
            <div className="flex-1 width-5/6">{children}</div>
        </div>
    )
}
export default Layout