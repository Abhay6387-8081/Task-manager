function Topbar({title,action}){
    return (
        <header className="sticky top-0 z-30 bg-surface-bg/80 backdrop-blur-sm border-b border-ink-300/30 px-6 py-4">
            <h1 className="text-lg font-bold text-ink-900">{title}</h1>
            {action}
        </header>
    )
}

export default Topbar;