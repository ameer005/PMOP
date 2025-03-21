'use client'

import { Navbar } from './navbar'

// import { withProtected } from '@/hooks/routerProtector'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full ">
      <div className="h-[4.5rem] w-full relative">
        <Navbar />
      </div>

      <div className="flex">
        <div className="flex flex-1 justify-center">
          <div className="w-full max-w-[85rem] ">
            <main className="w-full md:px-3 px-6 py-6">{children}</main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout
