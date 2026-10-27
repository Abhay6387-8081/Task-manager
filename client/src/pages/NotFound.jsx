import { Link } from "lucide-react";
import Button from '../components/ui/Button';

function NotFound(){
    return(
        <div className="max-w-xl mx-auto px-4 py-24 text-center">
            <h1 className="text-3xl font-bold text-ink-900 mb-2">404</h1>
            <p className="text-ink-500 mb-6">Page not found.</p>
            <Link to='/' >
            <Button>Back to Dashboard</Button>
            </Link>
        </div>
    );
}

export default NotFound;