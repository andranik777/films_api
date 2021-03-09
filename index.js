filmDescription = [];
let nbr = 0

const rechercheFilm = (titleFilm, yearFilm) => {
    document.querySelector("#main").innerHTML = ""
    a = document.querySelector("#main")
    var obj
    fetch(`http://www.omdbapi.com/?apikey=a4a3f616&s=${titleFilm}&y=${yearFilm}`)
        .then((response) => response.json())
        .then((data) => {
            obj = data;
            if (obj.Response == "False") {
                document.querySelector("#main").innerHTML = `
                <div class ="d-flex justify-content-center mt-5">
                <img src="img/404_page_not_found.jpg">
                <div>
                `
            }
            obj.Search.map((x, i) => {
                showFilm(a, x.Title, x.Year, x.Poster)
            })
            obj.Search.map((x, i) => showDescription(x.imdbID, i))

        })

    const showDescription = (film_id, index) => {
        fetch(`http://www.omdbapi.com/?apikey=a4a3f616&i=${film_id}`)
            .then((response) => response.json())
            .then((response) => {
                obj_desc = response
                desc = document.querySelector("#main").children
                for (let i in desc) {
                    nbr++
                    desc[index].lastElementChild.innerHTML = ` 
                <p style="display:none" id="parag${nbr}" class="modal-content mt-2">${obj_desc.Plot}</p>
                <button onclick='DisplayFilmDescription(document.querySelector("#parag${nbr}"))'class="btn btn-info mt-3">Voir plus</button>
                `
                }
            })

    }

    /* if (data.ok) {
                    desc = document.querySelector("#main").children
                    for (let i in desc) {
                        desc[i].lastElementChild.innerHTML = ` 
                <p>${filmDescription[i]}</p>`
                    }
                }
     */

    const showFilm = (selector, title, year, filmImage) => {
        if (filmImage == "N/A") {
            filmImage = "img/image-not-found.png"
        }
        selector.innerHTML += `
            <div data-aos="fade-right" class="mt-3">
                <h2 class ="text-light">Title : ${title}</h2>
                <p class ="text-light font-weight-bold">Year: ${year}</p>
                <img src=${filmImage} style = " width:50%; max-width:300px;">
                <div class ="description"></div>
            </div>
        `
    }
}


const DisplayFilmDescription = (selector) => {
    selector.setAttribute("data-aos", "zoom-out-left")
    if (selector.style.display == "none") {
        selector.style.display = "block"
    } else {
        selector.style.display = "none"
        selector.removeAttribute("data-aos")
        selector.classList.remove("aos-init")
        selector.classList.remove("aos-animate")
    }
    AOS.init()
}


const scrolli = () => {
    AOS.init()
}

addEventListener("scroll", scrolli)

addEventListener("click", scrolli)


addEventListener("keydown", valider_enter = (e) => { if (e.key == "Enter" && document.querySelector("#recherche").value !== "") { rechercheFilm(document.querySelector("#recherche").value, document.querySelector("#year").value) } })