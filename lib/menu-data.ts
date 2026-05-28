export type MenuItem = {
  name: string
  description: string
  price: string
  priceNum: number
}

export const TACOS: MenuItem[] = [
  { name: 'Carne Asada', description: 'Grilled skirt steak, pico, guacamole', price: '$5', priceNum: 5 },
  { name: 'Al Pastor', description: 'Marinated pork, pineapple, cilantro, onion', price: '$5', priceNum: 5 },
  { name: 'Pollo Adobado', description: 'Chipotle chicken, avocado crema, jalapeño', price: '$4.50', priceNum: 4.5 },
  { name: 'Pescado', description: 'Crispy fried fish, purple slaw, lime crema', price: '$5', priceNum: 5 },
  { name: 'Barbacoa', description: 'Slow-braised beef, salsa verde, white onion', price: '$5', priceNum: 5 },
  { name: 'Vegano 🌱', description: 'Roasted poblano, black bean, mango salsa', price: '$4', priceNum: 4 },
]

export const PLATES: MenuItem[] = [
  { name: 'Taco Plate', description: '3 tacos + Mexican rice + beans', price: '$14', priceNum: 14 },
  { name: 'Burrito Bowl', description: 'Your choice of protein, rice, guac, pico', price: '$13', priceNum: 13 },
  { name: 'Quesadilla Grande', description: 'Oaxacan cheese, peppers, crema', price: '$12', priceNum: 12 },
]

export const EXTRAS: MenuItem[] = [
  { name: 'Guacamole + Chips', description: 'House-made fresh', price: '$8', priceNum: 8 },
  { name: 'Elotes Callejeros', description: 'Street-style corn, cotija, chili lime', price: '$6', priceNum: 6 },
  { name: 'Extra Jalapeños', description: '', price: '$2', priceNum: 2 },
]

export const DRINKS: MenuItem[] = [
  { name: 'Horchata', description: 'House rice milk, cinnamon', price: '$4', priceNum: 4 },
  { name: 'Agua Fresca', description: 'Hibiscus / Watermelon / Tamarind', price: '$4', priceNum: 4 },
  { name: 'Mexican Coke', description: 'Glass bottle, cane sugar', price: '$4', priceNum: 4 },
  { name: 'Jarritos', description: 'Mandarin, lime, or tamarind', price: '$4', priceNum: 4 },
]

export const DESSERTS: MenuItem[] = [
  { name: 'Churros', description: 'Cinnamon sugar, cajeta dipping sauce', price: '$7', priceNum: 7 },
  { name: 'Tres Leches Cup', description: 'House-made, fresh strawberries', price: '$6', priceNum: 6 },
]
