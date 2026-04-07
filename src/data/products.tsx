export interface Product {

  id: string;
  name: string;
  category: 'Notebooks' | 'Smartphones' | 'Periféricos' | 'Hardware';
  condition: 'Novo' | 'Seminovo';
  profile: 'Gamer' | 'Trabalho/Estudo' | 'Uso Casual';
  brand: string;
  price: number;
  image: string;
  specs: string[];
  installments: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Notebook Gamer Acer Nitro V15',
    category: 'Notebooks',
    condition: 'Seminovo',
    profile: 'Gamer',
    brand: 'Acer',
    price: 4890,
    image: '/NitroV15.jpeg',
    specs: ['RTX 2050 4GB', 'Intel Core I5 13420H', '16GB DDR5', 'SSD NVME 512GB'],
    installments: 10
  },
  {
    id: '2',
    name: 'Notebook Dell Inspiron 15',
    category: 'Notebooks',
    condition: 'Seminovo',
    profile: 'Trabalho/Estudo',
    brand: 'Dell',
    price: 3299.00,
    image: '/logopreta.png',
    specs: ['Intel Core i5 12ª Gen', '8GB RAM', 'SSD 256GB', 'Tela 15.6" Full HD'],
    installments: 10
  },
  {
    id: '3',
    name: 'Samsung Galaxy S23 Ultra 256GB',
    category: 'Smartphones',
    condition: 'Novo',
    profile: 'Uso Casual',
    brand: 'Samsung',
    price: 4899.00,
    image: 'logopreta.png',
    specs: ['Snapdragon 8 Gen 2', '12GB RAM', 'Câmera 200MP', 'Tela 6.8" AMOLED'],
    installments: 10
  },
  {
    id: '4',
    name: 'Xiaomi Poco X8 Pro Max',
    category: 'Smartphones',
    condition: 'Novo',
    profile: 'Gamer',
    brand: 'Xiaomi',
    price: 3590.00,
    image: 'pocox8pro.jpg',
    specs: ['MDimensity 8500 Ultra', '8GB RAM', 'Câmera 108MP', 'Bateria 5000mAh'],
    installments: 10
  },
  {
    id: '5',
    name: 'iPhone 14 Pro 128GB',
    category: 'Smartphones',
    condition: 'Seminovo',
    profile: 'Uso Casual',
    brand: 'Apple',
    price: 4299.00,
    image: 'logopreta.png',
    specs: ['A16 Bionic', 'Câmera 48MP', 'Dynamic Island', 'Tela 6.1" Super Retina'],
    installments: 10
  },
  {
    id: '6',
    name: 'Motorola Edge 40 Neo',
    category: 'Smartphones',
    condition: 'Novo',
    profile: 'Uso Casual',
    brand: 'Motorola',
    price: 1599.00,
    image: 'logopreta.png',
    specs: ['Dimensity 7030', '8GB RAM', 'Câmera 50MP', 'Tela 6.5" pOLED'],
    installments: 10
  },
  {
    id: '7',
    name: 'Notebook Lenovo IdeaPad 3i',
    category: 'Notebooks',
    condition: 'Seminovo',
    profile: 'Trabalho/Estudo',
    brand: 'Lenovo',
    price: 2299.00,
    image: 'logopreta.png',
    specs: ['Intel Core i3 11ª Gen', '8GB RAM', 'SSD 256GB', 'Tela 15.6"'],
    installments: 10
  },
  {
    id: '8',
    name: 'Notebook Gamer Acer Nitro 5',
    category: 'Notebooks',
    condition: 'Novo',
    profile: 'Gamer',
    brand: 'Acer',
    price: 4799.00,
    image: 'logopreta.png',
    specs: ['RTX 3050 4GB', 'Intel Core i5 12ª Gen', '16GB RAM', 'SSD 512GB'],
    installments: 10
  }
];

export const categories = ['Notebooks', 'Smartphones', 'Periféricos', 'Hardware'];
export const conditions = ['Novo', 'Seminovo'];
export const profiles = ['Gamer', 'Trabalho/Estudo', 'Uso Casual'];
export const brands = ['Samsung', 'Xiaomi', 'Apple', 'Motorola', 'Dell', 'Lenovo', 'Acer'];