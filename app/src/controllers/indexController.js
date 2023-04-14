const fs = require('fs');
const path = require('path');

const productsDB = path.join(__dirname, '../old_database/productsDB.json');

const products = JSON.parse(fs.readFileSync(productsDB, 'utf-8'));


module.exports = {

    
    
    index: (req, res) => {
        let oferta = products.filter(product => product.discount > 0);
        res.render("home", {
            products,
            oferta,
            session: req.session
        })
    },

    search: (req, res) => {
		let { keywords } = req.query
        let text = keywords.toLowerCase()
        let listProduct = []
       

        products.forEach(product => {
		let porNombre = product.name.toLowerCase()
        let porPet = product.pet.toLowerCase()
        let porCategory = product.category.toLowerCase()

		if(porNombre.indexOf(text) !== -1 || porPet.indexOf(text) !== -1 || porCategory.indexOf(text) !== -1){
		listProduct.push(product)
		}

		})


		res.render(`products/results`, {
			keywords,
			listProduct,
            session: req.session
		})
	},
	 admin: (req, res) => {
        res.render("users/admin")
    },
    error: (req, res) => {
        res.render("error",{
        session: req.session
    })
    },

    carrito: (req, res) => {
        let oferta = products.filter(product => product.discount > 0);
        let carrito = [ ]
        
        req.session.user.carrito.forEach(idproducto=>{
            let productoEncontrado=products.find(producto=>{
                return producto.id==idproducto
            })
            carrito.push(productoEncontrado)
        })
        res.render("products/carrito",{
            session: req.session,
               oferta,carrito
      
        })
    }, 
    comprar:(req,res)=>{
    let productoGuardado=req.params.id;
   req.session.user.carrito.push(Number(productoGuardado))
   res.redirect("/carrito")
},
   /*  borrarProducto:(req,res)=>{
        let id=req.body.id;
        let borrar=producto.filter(producto=>{
         })
    } */
}