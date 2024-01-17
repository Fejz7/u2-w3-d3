const getLibrary = function () {
    fetch("https://striveschool-api.herokuapp.com/books")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 404) {
                throw new Error("error 404 page not found");
            } else if (response.status === 500) {
                throw new Error("error 500 internal server error");
            } else {
                throw new Error("error");
            }
        })
        .then((data) => {
            const rowContainer = document.getElementsByClassName("row")[0];
            data.forEach((book) => {
                const card = document.createElement("div");
                card.classList.add("col");
                card.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <img src="${book.img}" class="card-img-top" alt="${book.title}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">prezzo: ${book.price}</p>
                            <a href="#" class="btn btn-primary" onclick="removeCardFromDOM(event)">ELIMINA</a>
                        </div>
                    </div>
                `;
                rowContainer.appendChild(card);
            });
        })
        .catch((error) => {
            console.error(error);

        });
};

function removeCardFromDOM(event) {

    const cardToRemove = event.target.closest(".card");
    if (cardToRemove) {
        cardToRemove.remove();
    }
}


getLibrary();