import { Baby, CircleEllipsis, Fullscreen, House, MousePointer2 } from 'lucide-react';

export default function Sidebar() {
    return (
        <section className="w-16 h-full bg-gray-800 text-white p-4 flex flex-col items-center gap-16">
            <Baby/>
            <div className='flex flex-col gap-8 cursor-pointer'>
                <House/>
                <MousePointer2/>
                <Fullscreen/>
                <CircleEllipsis/>
            </div>
        </section>
    )
}
