const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/pd2023-homework");

const phonesSchema = new Schema({
  brand: {
    type: String,
    required: true,
    minLength: [1, "Lenght brand name must be more that 1 character"],
    maxLength: [128, "Lenght brand name must be less that 128 character"],
  },
  model: {
    type: String,
    required: true,
    unique: true,
    minLength: [1, "Lenght model name must be more that 1 character"],
    maxLength: [128, "Lenght model name must be less that 128 character"],
  },
  productionYear: {
    type: Number,
    min: [1970, "Production year must be later than 1970"],
    max: [
      new Date().getFullYear(),
      "Production year must be earlier than current year",
    ],
  },
  sizeRAM: {
    type: Number,
    required: true,
    min: [0, "Size of RAM must be positive"],
    max: [1024, "Size of RAM must be less than 1024"],
  },
  CPU: {
    type: String,
    required: true,
    minLength: [1, "Lenght CPU name must be more that 1 character"],
    maxLength: [128, "Lenght CPU name must be less that 128 character"],
  },
  screenDiagonal: {
    type: Number,
    min: [0, "Size of screen diagonal must be positive"],
    max: [10, "Size of RAM must be less than 10"],
  },
  isNFC: {
    type: Boolean,
    default: false,
  },
},
{
  versionKey: false
});

const Phones = mongoose.model("phones", phonesSchema);

const newPhones = [
  {
    brand: "Samsung",
    model: "Galaxy S21",
    productionYear: 2021,
    sizeRAM: 8,
    CPU: "Snapdragon 888",
    screenDiagonal: 6.2,
    isNFC: true,
  },
  {
    brand: "Apple",
    model: "iPhone 12",
    productionYear: 2020,
    sizeRAM: 4,
    CPU: "A14 Bionic",
    screenDiagonal: 6.1,
    isNFC: true,
  },
  {
    brand: "Google",
    model: "Pixel 5",
    productionYear: 2020,
    sizeRAM: 8,
    CPU: "Snapdragon 765G",
    screenDiagonal: 6.0,
    isNFC: true,
  },
  {
    brand: "Xiaomi",
    model: "Mi 11",
    productionYear: 2021,
    sizeRAM: 8,
    CPU: "Snapdragon 888",
    screenDiagonal: 6.81,
    isNFC: true,
  },
  {
    brand: "OnePlus",
    model: "9 Pro",
    productionYear: 2021,
    sizeRAM: 12,
    CPU: "Snapdragon 888",
    screenDiagonal: 6.7,
    isNFC: true,
  },
  {
    brand: "Sony",
    model: "Xperia 1 III",
    productionYear: 2021,
    sizeRAM: 12,
    CPU: "Snapdragon 888",
    screenDiagonal: 6.5,
    isNFC: false,
  },
  {
    brand: "Huawei",
    model: "P40 Pro",
    productionYear: 2020,
    sizeRAM: 8,
    CPU: "Kirin 990",
    screenDiagonal: 6.58,
    isNFC: true,
  },
  {
    brand: "Oppo",
    model: "Find X3 Pro",
    productionYear: 2021,
    sizeRAM: 12,
    CPU: "Snapdragon 888",
    screenDiagonal: 6.7,
    isNFC: true,
  },
  {
    brand: "LG",
    model: "Wing",
    productionYear: 2020,
    sizeRAM: 8,
    CPU: "Snapdragon 765G",
    screenDiagonal: 6.8,
    isNFC: false,
  },
  {
    brand: "Motorola",
    model: "Edge+",
    productionYear: 2020,
    sizeRAM: 12,
    CPU: "Snapdragon 865",
    screenDiagonal: 6.7,
    isNFC: true,
  },
  {
    brand: "Realme",
    model: "GT 5G",
    productionYear: 2021,
    sizeRAM: 8,
    CPU: "Snapdragon 888",
    screenDiagonal: 6.43,
    isNFC: true,
  },
  {
    brand: "Vivo",
    model: "X60 Pro+",
    productionYear: 2021,
    sizeRAM: 12,
    CPU: "Snapdragon 888",
    screenDiagonal: 6.56,
    isNFC: false,
  },
];

(async () => {
  try {
    // Task 1 - INSERT
    // const createdPhones = await Phones.create(newPhones, {});
    // console.log(createdPhones);

    // Task 2-5 - SELECT

    // const listPhones = await Phones.find({}, null, {
    //   sort: {
    //     productionYear: 1
    //   },
    //   limit: 4,
    //   skip: 8
    // })
    // console.log(listPhones)

    // const foundPhonesByProductionYear = await Phones.find({ productionYear: 2021})
    // console.log(foundPhonesByProductionYear)

    // const findPhonesByYear = await Phones.find(
    //   { productionYear: { $gt: 2020 } },
    //   { model: 1, brand: 1, productionYear: 1 }
    // );
    // console.log(findPhonesByYear);

    // const findPhoneById = await Phones.findById('64de2eaa4a796ac3b92823fc')
    // console.log(findPhoneById)

    // Task 6 - UPDATE

    // const updatePhone = await Phones.findByIdAndUpdate(
    //   "64de2eaa4a796ac3b92823ff",
    //   {
    //     isNFC: true,
    //   },
    //   {
    //     new: true,
    //     runValidators: true,
    //   }
    // );
    // console.log(updatePhone)

    // Task 7 - DELETE

    // const deletePhone = await Phones.findByIdAndDelete('64de39bf9b356a64a24c1950')
    // console.log(deletePhone)
  } catch (error) {
    console.log(error);
  }
})();
