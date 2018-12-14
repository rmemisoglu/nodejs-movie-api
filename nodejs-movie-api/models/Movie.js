const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` alaný zorunludur'],
        maxlength: [15, '`{PATH}` alaný (`{VALUE}`), (`{MAXLENGTH}`) karakterden küçük olmalýdýr'],
        minlength: [2, '`{PATH}` alaný (`{VALUE}`), (`{MINLENGTH}`) karakterden büyük olmalýdýr']
    },
    category: {
        type: String,
        maxlength: 30,
        minlength: 2
    },
    country: {
        type: String,
        maxlength: 30,
        minlength: 2
    },
    year: {
        type: Number,
        max: 2040,
        min: 1900
    },
    imdb_score: {
        type: Number,
        max: 10,
        min:0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('movie', MovieSchema);