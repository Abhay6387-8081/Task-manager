import {X} from 'lucide-react';
import {motion,AnimatePresence} from 'framer-motion';

function Modal({open,onClose,title,children,maxWidth = 'max-w-lg'}){
    return(
        <AnimatePresence>
            {open &&(
                <motion.div
                className='fixed inset-0 z-[120] flex items-center justify-center p-4'
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                >
                    <div className='absolute inset-0 bg-black/50 ' onClick={onClose}/>
                    <motion.div
                    initial={{opacity:0,scale:0.96,y:10}}
                    animate={{opacity:1,scale:1,y:0}}
                    exit={{opacity:0,scale:0.96,y:10}}
                    transition={{duration:0.2}}
                    className={`relative bg-white rounded-card shadow-cardHover w-full ${maxWidth} max-h-[85vh] overflow-y-auto`}
                    >
                        <div  className='sticky top-0 flex items-center justify-between px-6 py-4 border-ink-300/30 bg-white'>
                            <h2 className='text-base font-semibold text-ink-900'>{title}</h2>
                            <button onClick={onClose} className='text-ink-500 hover:text-ink-900' aria-label='close'>
                                <X size={20}/>
                            </button>
                        </div>
                        <div className='p-6'>{children}</div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}


export default Modal;