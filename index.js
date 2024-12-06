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

export { G5Fetch };
