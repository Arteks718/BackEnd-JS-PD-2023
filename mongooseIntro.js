const mongoose = require("mongoose");

// Установить соединение
mongoose.connect("mongodb://127.0.0.1:27017/artists");

// создать схему
const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 1,
      maxLength: 64,
      trim: true,
      required: true,
    },
    country: {
      type: String,
      minLength: 2,
      maxLength: 64,
      default: "Ukraine",
    },
    birthday: {
      type: Date,
      max: new Date(),
      required: true,
    },
    careerStartYear: {
      type: Number,
      validate: {
        validator: function (v) {
          return v >= this.birthday.getFullYear();
        },
      },
      max: [new Date().getFullYear(), "Career cannot start later than today"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    isMale: {
      type: Boolean,
    },
  },
  { versionKey: false }
);

const Artists = mongoose.model("Artists", artistSchema);

(async function () {
  try {
    //  CRUD

    //  INSERT - create
    // const newArtist = {
    //   name: "Yuliia Another",
    //   birthday: new Date(2001, 5, 10),
    //   careerStartYear: 2020,
    //   isMale: false,
    //   email: "yuliaanother@example.com",
    // };
    // const createdArtist = await Artists.create(newArtist);
    // console.log("createdArtist :>> ", createdArtist);

    //  SELECT - find/findOne/findById

    // Get all
    // const foundArtists = await Artists.find();
    // console.log(foundArtists)

    // search by name
    // const foundArtistByName = await Artists.find({name: /yuliia/i})
    // console.log(foundArtistByName)

    // projection
    // const foundArtists = await Artists.find({}, {name: 1, country: 1})
    // console.log(foundArtists)

    // pagination
    // const foundArtists = await Artists.find({}, null, {
    //   sort: {
    //     name: 1
    //   },
    //   limit: 1,
    //   skip: 1
    // })
    // console.log(foundArtists)

    // find by id
    // const foundArtist = await Artists.findById('64de07df7f0ca932609d5c8e')
    // console.log(foundArtist)

    // UPDATE - updateOne/updateMane - findOneAndUpdate/findByIdAndUpdate
    // const updatedArtist = await Artists.findByIdAndUpdate('64de07df7f0ca932609d5c8e', {
    //   name: 'Yuliia 3',
    // }, {
    //   new: true, // чтобы из метода возвращалось изменное значение
    //   runValidators: true // запуск валидации, по умолчанию false
    // })
    // console.log("updatedArtist", updatedArtist);

    // DELETE - deleteOne/deleteMany - findOneAndDelete/findByIdAndDelete
    const deletedArtist = await Artists.findByIdAndDelete('64de07df7f0ca932609d5c8e')
    console.log(deletedArtist)
  } catch(error) {
    console.log('error', error)
  }
})();
