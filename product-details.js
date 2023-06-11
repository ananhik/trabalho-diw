// Função para obter os parâmetros da URL
function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlParams.entries());
    return params;
}

// Função para remover as tags HTML do texto
function stripHTMLTags(text) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;
    return tempElement.textContent || tempElement.innerText || '';
}

// Função para obter os detalhes do produto a partir da API
function getProductDetails(productId) {
    const apiUrl = `https://diwserver.vps.webdock.cloud/products/${productId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(product => {
            document.getElementById('product-image').src = product.image;
            document.getElementById('product-title').innerText = product.title;
            document.getElementById('product-description').innerHTML = product.description;
            document.getElementById('product-composition').innerText = stripHTMLTags(product.composition);
            document.getElementById('product-season').innerText = product.season;
            document.getElementById('product-color').innerText = product.baseColour;
            document.getElementById('product-brand').innerText = product.brandName;
            document.getElementById('product-usage').innerText = product.usage;
            document.getElementById('product-article-number').innerText = product.articleNumber;
            document.getElementById('product-base-colour').innerText = product.baseColour;
            document.getElementById('product-year').innerText = product.year;
            document.getElementById('product-article-type').innerText = product.articleType;
            document.getElementById('product-display-categories').innerText = product.displayCategories;
            document.getElementById('product-category').innerText = product.category;
            document.getElementById('product-rating').innerText = 'Rating: ' + product.rating.rate + ' (Count: ' + product.rating.count + ')';
            document.getElementById('product-price').innerText = 'Price: $' + product.price;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Obter o ID do produto a partir dos parâmetros da URL
const urlParams = getUrlParams();
const productId = urlParams.id;

// Obter os detalhes do produto e exibi-los na página
getProductDetails(productId);

