document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav .nav-link");

    // Captura apenas o nome do arquivo atual (ex: "jiu-jitsu.html")
    const currentPage = location.pathname.split("/").slice(-1)[0];

    links.forEach(link => {
        // Extrai o nome do arquivo do href do link (ex: "jiu-jitsu.html")
        const linkPage = link.getAttribute("href").split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
});
