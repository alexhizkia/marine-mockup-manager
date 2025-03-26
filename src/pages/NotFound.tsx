
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-navy-900 p-4">
      <div className="w-full max-w-md animate-fadeIn">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="h-24 w-24 rounded-full bg-marine-100 dark:bg-marine-900/20 flex items-center justify-center">
              <FileQuestion className="h-12 w-12 text-marine-600 dark:text-marine-300" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-gray-100">Page Not Found</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            We couldn't find the page you were looking for. It might have been moved or doesn't exist.
          </p>
          <div className="space-y-3">
            <Button 
              className="w-full btn-hover"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Dashboard
            </Button>
            <Button 
              variant="outline" 
              className="w-full btn-hover"
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
