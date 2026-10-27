import {motion} from 'framer-motion';

function StatCard({icon:Icon,label,value,accent='text-brand-600',delay=0}){
    return(
        <motion.div
        initial={{opacity:0,y:12}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.3,delay}}
        className='rounded-card border border-ink-300/40 bg-white p-5'
        >
            <div className='flex items-center justify-between mb-3'>
                <span className='text-xs text-ink-500'>{label}</span>
                <Icon size={18} className={accent} />
            </div>
            <p className='text-2xl font-bold text-ink-900'>{value}</p>
        </motion.div>
    )
}
export default StatCard;