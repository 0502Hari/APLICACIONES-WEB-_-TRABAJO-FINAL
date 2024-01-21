
const DogSchema = new mongoose.Schema({
  id: {
    type: ObjectId,
    required: false,
  },
  Nombre: {
    type: String,
    required: true,
  },
  idArray_Tareas: {
    type: Array,
    required: true,
    validate: {
        validator: function (value) {
            return value > 0;
            },
            message: () => "Please enter a valid age",
        },
  },
  isGoodBoy: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const Dog = mongoose.model("Dog", DogSchema);

module.exports = { Dog };