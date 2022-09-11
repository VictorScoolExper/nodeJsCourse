const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'Please provide Rating'],
    },
    title:{
        type: String,
        trim: true,
        required:[true, 'Please provide review title'],
        maxlength: 100,
    },
    comment:{
        type:String,
        required: [true, 'please provide a review comment'],
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product:{
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
    }
}, { timestamps: true });
//this line ensure that the user can only leave one review per product
ReviewSchema.index({product:1, user:1}, {unique:true});

ReviewSchema.statics.calculateAverageRatingTotalReviews = async function(productId){
    const result = await this.aggregate([
        {$match:{product:productId}},
        {$group:{
            _id:'$product',
            averageRating:{$avg:'$rating'},
            numOfReviews:{$sum: 1},

        }}
    ]);
    console.log(result);
    try {
        await this.model('Product').findOneAndUpdate({_id:productId}, {
            averageRating:Math.ceil(result[0]?.averageRating || 0),
            numOfReviews:result[0]?.numOfReviews || 0,
        })
    } catch (error) {
        console.log(error);
    }
};

ReviewSchema.post('save', async function(){
    await this.constructor.calculateAverageRatingTotalReviews(this.product)
});

ReviewSchema.post('remove', async function(){
    await this.constructor.calculateAverageRatingTotalReviews(this.product)
});

module.exports = mongoose.model('Review', ReviewSchema);