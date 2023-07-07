import express from "express";
// import users from "./users.json" assert { type: 'json'}
const app = express();
app.use(express.json());
app.use("/", express.static("public"));
const usersDB = [
    {
        id: 1,
        gender: "female",
        name: {
            title: "Ms",
            first: "Madhura",
            last: "Mugeraya",
        },
        location: {
            street: {
                number: 831,
                name: "Rasta Peth",
            },
            city: "Barasat",
            state: "Mizoram",
            country: "India",
            postcode: 62829,
            coordinates: {
                latitude: "9.9333",
                longitude: "174.2185",
            },
            timezone: {
                offset: "+3:30",
                description: "Tehran",
            },
        },
        email: "madhura.mugeraya@example.com",
        login: {
            uuid: "58e91b1a-9c97-488f-ad01-59622707bc8d",
            username: "biggoose654",
            password: "1369",
            salt: "UKEIF0A1",
            md5: "3de61c21f04ad9e5c11418e133d38ede",
            sha1: "96a5bf940717d7d4877b4477761378ee2b027bd6",
            sha256: "5c3cdb92e0bb2e886b9501d7f9e1fb7460b510d04c390056ed1dc8d79fb23b46",
        },
        dob: {
            date: "1966-11-12T17:55:03.570Z",
            age: 56,
        },
        registered: {
            date: "2005-03-27T01:58:56.252Z",
            age: 18,
        },
        phone: "8046758455",
        cell: "9400114225",
        picture: {
            large: "https://randomuser.me/api/portraits/women/16.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/16.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/16.jpg",
        },
        nat: "IN",
    },
    {
        id: 2,
        gender: "female",
        name: {
            title: "Ms",
            first: "Maia",
            last: "Smith",
        },
        location: {
            street: {
                number: 2271,
                name: "Castle Street",
            },
            city: "Whanganui",
            state: "Tasman",
            country: "New Zealand",
            postcode: 23609,
            coordinates: {
                latitude: "-5.5876",
                longitude: "12.0813",
            },
            timezone: {
                offset: "+1:00",
                description: "Brussels, Copenhagen, Madrid, Paris",
            },
        },
        email: "maia.smith@example.com",
        login: {
            uuid: "9f600226-339a-41bb-98ff-7422caaaf731",
            username: "purpleduck818",
            password: "capricor",
            salt: "nDfoLofA",
            md5: "a859fa5abc9aec8f09a4cf05eb779f95",
            sha1: "74665f68df3522e774f17950ad06b0478da96208",
            sha256: "94a9fc2aad28d3d1b664df402ecac589a0f44f08243a5fc945af8fc265f943f7",
        },
        dob: {
            date: "1962-06-26T18:06:00.678Z",
            age: 61,
        },
        registered: {
            date: "2008-12-28T06:42:14.549Z",
            age: 14,
        },
        phone: "(891)-220-6068",
        cell: "(454)-149-2125",
        picture: {
            large: "https://randomuser.me/api/portraits/women/51.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/51.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/51.jpg",
        },
        nat: "NZ",
    },
    {
        id: 3,
        gender: "female",
        name: {
            title: "Mrs",
            first: "Emma",
            last: "Ranta",
        },
        location: {
            street: {
                number: 675,
                name: "Itsenäisyydenkatu",
            },
            city: "Ilmajoki",
            state: "Päijät-Häme",
            country: "Finland",
            postcode: 90828,
            coordinates: {
                latitude: "79.1437",
                longitude: "100.2971",
            },
            timezone: {
                offset: "+5:45",
                description: "Kathmandu",
            },
        },
        email: "emma.ranta@example.com",
        login: {
            uuid: "23713931-63a3-4c55-8de2-440a1ae78727",
            username: "smallzebra644",
            password: "teddy1",
            salt: "73vWdci2",
            md5: "e9a8b3e5ff96bc97972a3b6da4021a4a",
            sha1: "4a7160dad1767a209f4269517154b784bb7a93d7",
            sha256: "a7de18fa88c137a6ee75b1ee4fd12de91988a844a68fb4d54655c34ed46a9f93",
        },
        dob: {
            date: "1966-05-14T22:01:09.623Z",
            age: 57,
        },
        registered: {
            date: "2008-06-05T16:27:20.663Z",
            age: 15,
        },
        phone: "08-864-665",
        cell: "046-702-28-98",
        picture: {
            large: "https://randomuser.me/api/portraits/women/75.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/75.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/75.jpg",
        },
        nat: "FI",
    },
    {
        id: 4,
        gender: "female",
        name: {
            title: "Madame",
            first: "Gabriele",
            last: "Leclerc",
        },
        location: {
            street: {
                number: 5333,
                name: "Avenue des Ternes",
            },
            city: "Steinmaur",
            state: "Jura",
            country: "Switzerland",
            postcode: 2796,
            coordinates: {
                latitude: "82.2246",
                longitude: "-95.8940",
            },
            timezone: {
                offset: "-8:00",
                description: "Pacific Time (US & Canada)",
            },
        },
        email: "gabriele.leclerc@example.com",
        login: {
            uuid: "239583ca-c142-49ef-95c0-02decf964cdd",
            username: "silverladybug998",
            password: "gotmilk",
            salt: "3KVqgKBk",
            md5: "d4bd0e339f746b2a61e7635195aeff6a",
            sha1: "ee08bb52c0671f602bfc9f8ce6d56e3546faa0b6",
            sha256: "b0244aa9a1a05e503526d50f0af70884d3faf7d76bde38c7c3c7e1eec067cc7f",
        },
        dob: {
            date: "1950-09-15T01:58:11.587Z",
            age: 72,
        },
        registered: {
            date: "2018-07-02T02:09:50.434Z",
            age: 5,
        },
        phone: "075 805 20 48",
        cell: "079 582 07 59",
        picture: {
            large: "https://randomuser.me/api/portraits/women/73.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/73.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/73.jpg",
        },
        nat: "CH",
    },
    {
        id: 5,
        gender: "female",
        name: {
            title: "Ms",
            first: "Sinezora",
            last: "Malkovich",
        },
        location: {
            street: {
                number: 6783,
                name: "Okruzhniy provulok",
            },
            city: "Kam'yanka-Buzka",
            state: "Kirovogradska",
            country: "Ukraine",
            postcode: 37607,
            coordinates: {
                latitude: "21.6714",
                longitude: "-8.1976",
            },
            timezone: {
                offset: "+4:00",
                description: "Abu Dhabi, Muscat, Baku, Tbilisi",
            },
        },
        email: "sinezora.malkovich@example.com",
        login: {
            uuid: "aa89b034-dfd9-4b42-958a-280d6ed9c419",
            username: "purplegoose979",
            password: "element",
            salt: "y71ZTVUP",
            md5: "adc2cb34f9f48182b285ee517d179bf3",
            sha1: "8c39f4b181468190ea908be2a54c5fc40b3b8328",
            sha256: "ea7135e560821311f1675b9c52db1bf94473a1e324631a8b5b5565d25b013992",
        },
        dob: {
            date: "1990-07-10T14:23:54.875Z",
            age: 32,
        },
        registered: {
            date: "2003-02-01T09:56:45.052Z",
            age: 20,
        },
        phone: "(068) K89-3276",
        cell: "(099) B60-5868",
        picture: {
            large: "https://randomuser.me/api/portraits/women/33.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/33.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/33.jpg",
        },
        nat: "UA",
    },
    {
        id: 6,
        gender: "female",
        name: {
            title: "Mrs",
            first: "Keerthi",
            last: "Almeida",
        },
        location: {
            street: {
                number: 9173,
                name: "Rasta Peth",
            },
            city: "Erode",
            state: "Haryana",
            country: "India",
            postcode: 66809,
            coordinates: {
                latitude: "-11.5170",
                longitude: "-119.4380",
            },
            timezone: {
                offset: "-1:00",
                description: "Azores, Cape Verde Islands",
            },
        },
        email: "keerthi.almeida@example.com",
        login: {
            uuid: "6c7f1ccf-30d1-4841-adf8-d40c8f8d7c58",
            username: "sadfrog259",
            password: "homepage-",
            salt: "DrWIg6E1",
            md5: "44c1efc0b5a14b0763c31ffa55a9bc71",
            sha1: "cb12373b4e10ab8a118958e5817938215f9d4566",
            sha256: "e20f5bdfed07d02757783715eb4732df9e07904a436f41f61a682101d2e155a9",
        },
        dob: {
            date: "1977-12-02T23:54:08.328Z",
            age: 45,
        },
        registered: {
            date: "2019-02-13T15:49:55.052Z",
            age: 4,
        },
        phone: "9348875059",
        cell: "7145929636",
        picture: {
            large: "https://randomuser.me/api/portraits/women/34.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/34.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/34.jpg",
        },
        nat: "IN",
    },
    {
        id: 7,
        gender: "female",
        name: {
            title: "Miss",
            first: "Anne-Rose",
            last: "Kraft",
        },
        location: {
            street: {
                number: 977,
                name: "Schulstraße",
            },
            city: "Grebenau",
            state: "Saarland",
            country: "Germany",
            postcode: 50786,
            coordinates: {
                latitude: "-64.4250",
                longitude: "-103.9003",
            },
            timezone: {
                offset: "+8:00",
                description: "Beijing, Perth, Singapore, Hong Kong",
            },
        },
        email: "anne-rose.kraft@example.com",
        login: {
            uuid: "18ead8ba-aa67-446f-9dbc-ca596fc0566e",
            username: "bluesnake490",
            password: "zildjian",
            salt: "XjJuP895",
            md5: "93ea95df6ce69b9b6b7305ac18fd304e",
            sha1: "4d544ee971f0c4bafcd7cd9e8b228a470e598cd5",
            sha256: "041a1bf66c585ba38f54f8469050a22fef31b5f8dacaf914b32d8281ae00264d",
        },
        dob: {
            date: "1971-12-08T10:53:07.009Z",
            age: 51,
        },
        registered: {
            date: "2019-11-19T20:20:16.444Z",
            age: 3,
        },
        phone: "0158-6664039",
        cell: "0178-9882935",
        picture: {
            large: "https://randomuser.me/api/portraits/women/1.jpg",
            medium: "https://randomuser.me/api/portraits/med/women/1.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/women/1.jpg",
        },
        nat: "DE",
    },
    {
        id: 8,
        gender: "male",
        name: {
            title: "Mr",
            first: "Vinzenz",
            last: "Dirks",
        },
        location: {
            street: {
                number: 6407,
                name: "Grüner Weg",
            },
            city: "Marktoberdorf",
            state: "Saarland",
            country: "Germany",
            postcode: 51322,
            coordinates: {
                latitude: "74.0553",
                longitude: "-36.7947",
            },
            timezone: {
                offset: "-3:30",
                description: "Newfoundland",
            },
        },
        email: "vinzenz.dirks@example.com",
        login: {
            uuid: "4bae0a19-dad8-4d50-b6eb-45a74c91e7d7",
            username: "bigfish911",
            password: "ooooooo",
            salt: "LNKTU2U2",
            md5: "83ee902476a6db8122b45aec85f2289a",
            sha1: "49f41b21c1324c8db07a5e3ae3461ff7880cd65c",
            sha256: "eaf451fe6c95d77e9afc0ac0f800deffdb56cf638190387c08f6823b94b25299",
        },
        dob: {
            date: "1995-11-03T14:04:01.665Z",
            age: 27,
        },
        registered: {
            date: "2007-05-03T04:09:45.763Z",
            age: 16,
        },
        phone: "0384-7207598",
        cell: "0173-8037106",
        picture: {
            large: "https://randomuser.me/api/portraits/men/42.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/42.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/42.jpg",
        },
        nat: "DE",
    },
    {
        id: 9,
        gender: "male",
        name: {
            title: "Mr",
            first: "Sjon",
            last: "Stubbe",
        },
        location: {
            street: {
                number: 764,
                name: "Hofpad",
            },
            city: "Arrien",
            state: "Utrecht",
            country: "Netherlands",
            postcode: "8371 DK",
            coordinates: {
                latitude: "38.7500",
                longitude: "-63.6575",
            },
            timezone: {
                offset: "-8:00",
                description: "Pacific Time (US & Canada)",
            },
        },
        email: "sjon.stubbe@example.com",
        login: {
            uuid: "29d5c46e-db80-49f2-a79f-4f969bb485b1",
            username: "whiteladybug791",
            password: "ferret",
            salt: "eXQkolcY",
            md5: "2b711ebd74a99e7a606cf6eaa439c66f",
            sha1: "3cf31f8ff3747187e2fee69deb411f1d1b7b49b4",
            sha256: "d5ace966daa7bbd2453f30deb044b9dfae1c4bfe1c97d60e8599928e3c90e415",
        },
        dob: {
            date: "1959-08-12T16:31:42.244Z",
            age: 63,
        },
        registered: {
            date: "2010-07-03T21:33:48.617Z",
            age: 13,
        },
        phone: "(037) 3973867",
        cell: "(06) 75454730",
        picture: {
            large: "https://randomuser.me/api/portraits/men/90.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/90.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/90.jpg",
        },
        nat: "NL",
    },
    {
        id: 10,
        gender: "male",
        name: {
            title: "Mr",
            first: "Nakul",
            last: "Kini",
        },
        location: {
            street: {
                number: 98,
                name: "Naiduthota",
            },
            city: "Bikaner",
            state: "Rajasthan",
            country: "India",
            postcode: 27874,
            coordinates: {
                latitude: "-66.7614",
                longitude: "73.2892",
            },
            timezone: {
                offset: "+3:30",
                description: "Tehran",
            },
        },
        email: "nakul.kini@example.com",
        login: {
            uuid: "13c3c173-d1d5-4b7c-a95a-ffef3d67e019",
            username: "lazysnake784",
            password: "alucard",
            salt: "Hkymnlm8",
            md5: "0fab0eebb7e9946c65e20e87ef5c7834",
            sha1: "0b32ca37651c27ae3d55a305371da0d3b47d3769",
            sha256: "836e8d8ffe19d9e134906b82bc52279e0f3156d92bf500d1b97536577447b094",
        },
        dob: {
            date: "1999-06-14T21:54:31.684Z",
            age: 24,
        },
        registered: {
            date: "2002-03-22T09:38:05.106Z",
            age: 21,
        },
        phone: "7440419544",
        cell: "7988711359",
        picture: {
            large: "https://randomuser.me/api/portraits/men/9.jpg",
            medium: "https://randomuser.me/api/portraits/med/men/9.jpg",
            thumbnail: "https://randomuser.me/api/portraits/thumb/men/9.jpg",
        },
        nat: "IN",
    },
];
class Users {
    constructor(data) {
        this.users = [...data];
        this.count = this.users.length;
    }
    getUserById(id) {
        const findIndex = this.users.findIndex(u => u.id == id);
        return this.users[findIndex];
    }
    getAllUsers() {
        return [...this.users];
    }
    createUser(user) {
        this.count++;
        this.users.push(Object.assign(Object.assign({}, user), { id: this.count }));
        return this.users[this.count - 1];
    }
    updateUser(id, info) { }
    deleteUser(id) { }
    clg() { console.log(this.users); }
}
const usersInstance = new Users(usersDB);
//CRUD for user
// get all users
app.get("/users", (req, res) => {
    const data = usersInstance.getAllUsers();
    res.status(200).send(data);
});
// get user by id
app.get("/users/:id", (req, res) => {
    const { id } = req.params;
    console.log(typeof id);
    const findUser = usersInstance.getUserById(Number(id));
    console.log(findUser);
    res.status(200).send(findUser);
});
// create new user
app.post("/users", (req, res) => {
    const { body } = req;
    const newUser = usersInstance.createUser(body);
    res.status(201).send(newUser);
});
// update user by id
app.patch("/users/:id", (req, res) => { });
// delete user by id
app.delete("/users/:id", (req, res) => { });
export default app;
