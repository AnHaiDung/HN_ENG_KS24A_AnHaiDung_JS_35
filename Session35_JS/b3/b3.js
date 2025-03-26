const STORAGE_KEY = "products";

function getProducts() {
  const storedProducts = localStorage.getItem(STORAGE_KEY);
  return storedProducts ? JSON.parse(storedProducts) : [];
}

function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

if (!localStorage.getItem(STORAGE_KEY)) {
  saveProducts([
    {
      id: 1,
      name: "Laptop Dell XPS 15",
      price: 35990000,
      image: "https://www.techone.vn/wp-content/uploads/2023/09/0020074_iphone-15-pro-max-128gb_550.jpeg",
      description: "Laptop cao cấp với màn hình 15 inch, CPU Intel Core i7 và RAM 16GB.",
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max",
      price: 32990000,
      image: "https://www.techone.vn/wp-content/uploads/2023/09/0020074_iphone-15-pro-max-128gb_550.jpeg",
      description: "Điện thoại flagship của Apple với camera 48MP và chip A17 Pro.",
    },
    {
      id: 3,
      name: "Samsung Galaxy S24 Ultra",
      price: 28990000,
      image: "https://www.techone.vn/wp-content/uploads/2023/09/0020074_iphone-15-pro-max-128gb_550.jpeg",
      description: "Điện thoại Android mạnh mẽ với bút S-Pen và camera siêu zoom.",
    }
  ]);
}

const wrapper = document.getElementById("productWrapper");
const searchBtn = document.getElementById("searchProduct");
const searchInput = document.getElementById("search");

function displayProducts(list) {
  wrapper.innerHTML = "";

  if (list.length === 0) {
    wrapper.innerHTML = "<p>Không tìm thấy sản phẩm nào.</p>";
    return;
  }

  list.forEach(product => {
    const html = `
      <div class="product-box">
        <img src="${product.image}" alt="${product.name}" class="product-img" />
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price.toLocaleString()} VNĐ</div>
      </div>
    `;
    wrapper.innerHTML += html;
  });
}

searchBtn.addEventListener("click", () => {
  const rawInput = searchInput.value;
  const keyword = rawInput.toLowerCase();

  const products = getProducts();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));

  displayProducts(filtered);
});

document.addEventListener("DOMContentLoaded", () => {
  displayProducts(getProducts());
});
