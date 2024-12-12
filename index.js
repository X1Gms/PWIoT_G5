const G5Fetch = async (url, method = "GET", headers = {}, body = null) => {
  try {
    const options = {
      method, // Ensure the HTTP method is passed correctly
      headers: {
        "Content-Type": "application/json",
        ...headers, // Merge any additional headers
      },
    };

    // Only include body if it's not null and if it's not a GET request
    if (body && method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options); // Make the fetch request
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json(); // Parse JSON response
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error; // Rethrow or handle the error as needed
  }
};

const setSessionWithExpiry = (
  value,
  key = "session",
  expirationMinutes = 30
) => {
  const now = new Date();
  const sessionData = {
    value: value,
    expiry: now.getTime() + expirationMinutes * 60 * 1000,
  };
  sessionStorage.setItem(key, JSON.stringify(sessionData));
};

const getSessionWithExpiry = (key) => {
  const sessionStr = sessionStorage.getItem(key);
  if (!sessionStr) return null;

  const sessionData = JSON.parse(sessionStr);
  const now = new Date();

  if (now.getTime() > sessionData.expiry) {
    sessionStorage.removeItem(key);
    return null;
  }
  return sessionData.value;
};

const validateSession = async () => {
  const session = getSessionWithExpiry("session");
  console.log(session);

  if (!session) return redirectToLogin("No session found.");

  try {
    // Validate session with backend
    const response = await G5Fetch(
      "http://localhost:80/login.php",
      "POST",
      {
        "Content-Type": "application/json",
      },
      session
    );

    if (!response.success) {
      redirectToLogin();
    }
  } catch (error) {
    console.error("Error during session validation:", error);
    redirectToLogin();
  }
};

const redirectToLogin = (message) => {
  sessionStorage.removeItem("session"); // Clear session
  window.location.href = "/src/pages/home/login.html"; // Redirect to login
};

export { G5Fetch, setSessionWithExpiry, validateSession };
