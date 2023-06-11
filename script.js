//NAVBAR RESPONSIVA-------------------------------------------------------------------------------------
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    navbarToggler.addEventListener("click", function () {
        navbarCollapse.classList.toggle("show");
    });

    $(document).ready(function() {
        $('.carousel').carousel({
          interval: 20 
        });
      });
      
// INICIO DO CODIGO INDEX -------------------------------------------------------------------------
let currentPage = 1;
let totalPages = 1;

// Função para carregar os produtos da API
function loadProducts(page, category = '') {
    let apiUrl = `https://diwserver.vps.webdock.cloud/products?page=${page}`;

    if (category) {
        apiUrl += `&category=${category}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const products = data.products;
            const totalPages = data.totalPages;

            // Limpar a lista de produtos
            document.getElementById('products').innerHTML = '';

            // Adicionar os produtos à lista
            products.forEach(product => {
                const productElement = document.createElement('div');
                productElement.className = 'product';

                const imgElement = document.createElement('img');
                imgElement.src = product.image;

                const titleElement = document.createElement('h2');
                titleElement.innerText = product.title;

                const categoryElement = document.createElement('p');
                categoryElement.innerText = 'Categoria: ' + product.category;

                const priceElement = document.createElement('p');
                priceElement.innerText = 'Preço: $' + product.price;

                const buttonElement = document.createElement('button');
                buttonElement.innerText = 'Ver Mais';

                // Adicionar evento de clique ao botão para redirecionar para a página de detalhes do produto
                buttonElement.addEventListener('click', function() {
                    window.location.href = `product-details.html?id=${product.id}`;
                });

                productElement.appendChild(imgElement);
                productElement.appendChild(titleElement);
                productElement.appendChild(categoryElement);
                productElement.appendChild(priceElement);
                productElement.appendChild(buttonElement);

                document.getElementById('products').appendChild(productElement);
            });

            // Atualizar a página atual e o número total de páginas
            updateCurrentPage(page, totalPages);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Atualizar a página atual ao carregar a primeira página de produtos
function updateCurrentPage(page, total) {
    currentPage = page;
    totalPages = total;
    updatePagination();
}

// Função para carregar a próxima página
function loadNextPage() {
    loadProducts(currentPage + 1);
}

// Função para carregar a página anterior
function loadPreviousPage() {
    loadProducts(currentPage - 1);
}

// Atualizar os botões de paginação com base na página atual
function updatePagination() {
    const previousPageButton = document.getElementById('previous-page');
    const nextPageButton = document.getElementById('next-page');

    previousPageButton.classList.remove('disabled');
    nextPageButton.classList.remove('disabled');

    if (currentPage === 1) {
        previousPageButton.classList.add('disabled');
    }

    if (currentPage === totalPages) {
        nextPageButton.classList.add('disabled');
    }
}

// Função para carregar as categorias dos produtos
function loadCategories() {
    fetch('https://diwserver.vps.webdock.cloud/products/categories')
        .then(response => response.json())
        .then(data => {
            const categories = data.categories;

            const categoryDropdown = document.getElementById('category-dropdown');

            categories.forEach(category => {
                const categoryItem = document.createElement('li');
                const categoryLink = document.createElement('a');
                categoryLink.className = 'dropdown-item category-item';
                categoryLink.href = '#';
                categoryLink.dataset.category = category;
                categoryLink.innerText = category;

                categoryItem.appendChild(categoryLink);
                categoryDropdown.appendChild(categoryItem);
            });

            // Adicionar evento de clique aos itens de categoria
            const categoryItems = document.getElementsByClassName('category-item');
            for (let i = 0; i < categoryItems.length; i++) {
                categoryItems[i].addEventListener('click', function() {
                    const selectedCategory = this.dataset.category;
                    loadProducts(1, selectedCategory);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Carregar a primeira página de produtos ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    loadProducts(1);
    loadCategories();
});

// Adicionar eventos de clique aos botões de páginação
document.getElementById('previous-page').addEventListener('click', loadPreviousPage);
document.getElementById('next-page').addEventListener('click', loadNextPage);