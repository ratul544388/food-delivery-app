import { ReactNode } from "react";

export default function MainLayout({children} : {children: ReactNode}){
    return (
        <div className="min-h-screen h-full">
            {children}
        </div>
    )
}