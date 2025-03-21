import { cn } from '@/lib/utils'

const Navbar = () => {
  return (
    <div
      className={cn(
        'py-4 fixed  top-0 w-full h-[4.5rem] bg-background flex  justify-between items-center px-8 z-[30] border-b'
      )}
    >
      <div className="text-2xl font-bold">PMOP</div>
      <div>yo2</div>
    </div>
  )
}

export { Navbar }
