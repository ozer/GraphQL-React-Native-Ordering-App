const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type : String },
    created_at: { type: Date, default: new Date() },
    products : [{
        type : Schema.Types.ObjectId,
        ref : 'product'
    }]
})

CategorySchema.statics.addProduct = function(name,price,quantity,id){
    const Product = mongoose.model('product');
    console.log("price : "+price);
    console.log("quantity : "+quantity);
    return this.findById(id)
        .then(category => {
            const product = new Product({name,price,quantity,category})
            category.products.push(product);
            return Promise.all([
                product.save(),category.save()
            ]).then(([product,category])=>category);
        })

}

CategorySchema.statics.findProducts = function (id) {
    return this.findById(id)
        .populate('products')
        .then(category => category.products);
}

mongoose.model('category', CategorySchema);