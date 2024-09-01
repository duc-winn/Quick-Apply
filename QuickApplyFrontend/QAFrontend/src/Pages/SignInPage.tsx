import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function SignInPage(){

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

  // Get the previous path the user came from
    const from = location.state?.from?.pathname || "/";

    async function handleLogIn(event: React.FormEvent<HTMLFormElement>){
        setLoading(true); // Start loading
        event.preventDefault();

        const formElements = event.currentTarget.elements as typeof event.currentTarget.elements & {
            username: HTMLInputElement;
            password: HTMLInputElement;
        };

        let username: string = formElements.username.value;
        let password: string = formElements.password.value;
      
        const apiEndpoint = "https://localhost:7129/login-user";

        const body = {
            username: username,
            password: password
        };

        try {
            setErrorMessage(null); // Reset error message
            // Make the API call
            const response = await fetch(apiEndpoint, {
              method: "POST", // POST request
              headers: {
                "Content-Type": "application/json", // Set the Content-Type header
              },
              body: JSON.stringify(body), // Convert the body object to a JSON string
        });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("username", username);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("jsonWebToken", data.JsonWebToken);

                navigate(from, { replace: true });
                window.location.reload();
                // Handle successful login (e.g., redirect, save token to localStorage, etc.)
            } else {
                if (response.status === 404) {
                    setErrorMessage("Username not found. Please check your login details.");
                  } else if (response.status === 409) {
                    setErrorMessage("Password does not match username. Please try again.");
                  } else {
                    setErrorMessage("An unexpected error occurred. Please try again later.");
                  }
            }
        } catch (error) {
            console.error("Error occurred during sign in:", error);
            setErrorMessage("Network error. Please try again later.");
        }
        finally{
            setLoading(false); // Stop loading
        }
    }

    return (
        <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6" onSubmit={handleLogIn}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md get-started-button px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading} // Disable button during loading
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          {errorMessage && (
            <div className="mt-4 text-center text-sm text-red-500">
              {errorMessage}
            </div>
          )}

          <p className="mt-10 text-center text-sm text-white">
            Don't Have An Account?{' '}
            <Link to="/register" className="font-semibold leading-6 text-blue-400 hover:text-indigo-500">
              Register For One Here!
            </Link>
          </p>
        </div>
      </div>
    </>
    );
}

export default SignInPage;