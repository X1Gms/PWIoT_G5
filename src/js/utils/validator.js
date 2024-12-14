try {
    const session = sessionStorage.getItem("session");
    const role = JSON.parse(session).value.role;
    const id = JSON.parse(session).value.id;
    const page = window.location.href.toString();
getData();
    function getData() {
        fetch("http://127.0.0.1/blocker.php", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            role: role,
            id: id,
            page: page
          }),
        })
          .then((response) => {
            if (!response.ok) throw new Error("Failed getting information"); // Print error on console if it gets errors.
            return response.json(); // Parse response to Json
          })
          .then((data) => {
            console.log("g")
            if (data.success === 0){
              if(data.redirect === "dashboard")window.location.replace("http://127.0.0.1:3000/src/pages/dashboard/home.html")
              // if(data.redirect === "dashboard")window.location.replace("http://127.0.0.1:3000/")


            }
          })
          .catch((error) => console.error(error));
      }
      
    
} catch (error) {
    console.error(error);
}
