   let currentPage = 1;
        const itemsPerPage = 9; // Número de itens por página

        function searchProducts() {
            const searchQuery = document.getElementById('search-input').value;
            const apiUrl = `https://diwserver.vps.webdock.cloud/products/search?query=${searchQuery}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const products = data;

                    // Limpar a lista de produtos
                    document.getElementById('products').innerHTML = '';

                    if (products.length === 0) {
                        // Mensagem de erro quando nenhum produto for encontrado
                        const errorElement = document.createElement('p');
                        errorElement.className = 'error-message';
                        errorElement.innerText = 'Nenhum produto encontrado.';
                        document.getElementById('products').appendChild(errorElement);

                        // Desativar botões de paginação
                        document.getElementById('prev-page').disabled = true;
                        document.getElementById('next-page').disabled = true;
                    } else {
                        // Adicionar os produtos à lista
                        const startIndex = (currentPage - 1) * itemsPerPage;
                        const endIndex = startIndex + itemsPerPage;
                        const productsToShow = products.slice(startIndex, endIndex);

                        productsToShow.forEach(product => {
                            const productElement = document.createElement('div');
                            productElement.className = 'product';

                            const imgElement = document.createElement('img');
                            imgElement.src = product.image;

                            const titleElement = document.createElement('h2');
                            titleElement.innerText = product.title; // Título do produto

                            const priceElement = document.createElement('p');
                            priceElement.innerText = 'Preço: $' + product.price;

                            const buttonElement = document.createElement('button');
                            buttonElement.innerText = 'Ver Detalhes';

                            // Adicionar evento de clique ao botão para redirecionar para a página de detalhes do produto
                            buttonElement.addEventListener('click', function() {
                                redirectToProductDetails(product.id);
                            });

                            productElement.appendChild(imgElement);
                            productElement.appendChild(titleElement);
                            productElement.appendChild(priceElement);
                            productElement.appendChild(buttonElement);

                            document.getElementById('products').appendChild(productElement);
                        });

                        // Ativar/desativar botões de paginação
                        document.getElementById('prev-page').disabled = currentPage === 1;
                        document.getElementById('next-page').disabled = endIndex >= products.length;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        function prevPage() {
            if (currentPage > 1) {
                currentPage--;
                searchProducts();
            }
        }

        function nextPage() {
            currentPage++;
            searchProducts();
        }

        function redirectToProductDetails(productId) {
            // Redirecionar para a página de detalhes do produto com base no ID
            window.location.href = `product-details.html?id=${productId}`;
        }