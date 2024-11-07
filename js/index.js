function showNavbar(){
    /* DEFAULT BODY MARGIN AND PADDING
        margin: 0 auto;
        padding: 2rem; 
    */
   // If we don't have hidden class it's because there is navbar. Otherwise navbar it's closed.
   className = document.querySelectorAll('.hidden').length == 0 ? "nav-context" : "hidden";
   // If navbar is hidden keep margin/padding
    const [myBody] = document.getElementsByTagName("body");
    if (className === "hidden") {
        myBody.style.margin = "0 auto";
        myBody.style.padding = "2rem";
        document.getElementsByClassName("hidden")[0].className = "nav-context";
    } else{
        myBody.style.margin = '';
        myBody.style.padding = '';
        document.getElementsByClassName("nav-context")[0].className = "hidden";
    }
}
