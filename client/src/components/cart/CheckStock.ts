
// billing_address: "Mendoza"
// details: (2) [{…}, {…}]
// 0:
// amount: 325
// image: "https://thotcomputacion.com.uy/wp-content/uploads/2015/07/ath.jpg"
// price: 325
// productId: 1
// productName: "Equipo AMD Athlon 3000G – 8Gb – SSD – Radeon™ Vega 3 Graphics"
// quantity: 1
// stock: 5
// [[Prototype]]: Object
// email_address: "nico@gmail.com"
// id: 1
// shipping_address: "aaaaa-aaaa-aaaa"
// status: "PENDING"
// total_amount: 700
// user: "Nico Macenco"
// userID: 6

// id(pin):1
// name(pin):"Equipo AMD Athlon 3000G – 8Gb – SSD – Radeon™ Vega 3 Graphics"
// image(pin):"https://thotcomputacion.com.uy/wp-content/uploads/2015/07/ath.jpg"
// price(pin):325
// description(pin):"Descripción Gabinete Combo con Fuente y Periféricos Mother Gigabyte / Biostar A320 – Sata III – USB 3.0 Procesador AMD Athlon 3000G 3,5Ghz 2 núcleos – 4 hilos Memoria 8Gb DDR4 2666mhz Disco SSD 240Gb Gráficos Radeon™ Vega 3"
// weight(pin):5
// stock(pin):5
// soldCount(pin):10
// BrandId(pin):1
// brand(pin):"Amd"
// SubcategoryId(pin):1
// subcategory(pin):"Equipos AMD"
// CategoryId(pin):1
// category(pin):"Equipos armados"
// isInDiscount(pin):false
// discountPercent(pin):0
// discountQty(pin):0
// isActive(pin):true


// 0:
// image: "https://thotcomputacion.com.uy/wp-content/uploads/2015/01/3-1.jpg"
// price: 375
// productId: 2
// productName: "Equipo AMD Athlon 3000G Gamer – Radeon™ Vega 3 Graphics"
// quantity: 2
// stock: 5

export function CheckStock ( productsCart : any , products :any  ) {
  
    let noStockProducts = [];
    for (let i = 0; i < productsCart.length; i++) {
        for (let j = 0; j < products.length; j++) {
            if (productsCart[i].productId === products[j].id) {
                if ( productsCart[i].quantity > products[j].stock ){
                    noStockProducts.push(productsCart[i].productName)
                }
            }
        }
    }
    return noStockProducts ; 
}