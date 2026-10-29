import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({page,totalPages,onPageChange}){
    return(
        <div>
            <button
            onClick={()=>onPageChange(page-1)}
            disabled={page<=1}
            className="p-2 rounded-lg border border-ink-300/50 disabled:opacity-40 hover:bg-surface-bg"
            aria-label="Previous page"
            >
                <ChevronLeft size={16}/>
            </button>
            <span className="text-sm text-ink-700">Page {page} of {totalPages}</span>
            <button 
            onClick={()=>onPageChange(page+1)}
            disabled={page>=totalPages}
            className="p-2 rounded-lg border border-ink-300/50 disabled:opacity-40 hover:bg-surface-bg"
            aria-label="Next page"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    )
}

export default Pagination;