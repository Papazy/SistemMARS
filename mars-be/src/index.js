const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { db } = require('./model/dbConection')
const multer = require('multer')
const path = require('path');
const jwt = require('jsonwebtoken')
const { DefaultDeserializer } = require('v8')
const util = require('util')
const { off } = require('process')
const cookieParser = require('cookie-parser')
const { create } = require('domain')




const app = express()
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Enable the setting of credentials (cookies, authorization headers, etc.)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cookieParser())
app.use(cors(corsOptions))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static(path.join(__dirname, "..", 'public')))

app.get("/", (req, res) => {
    const result = path.join(__dirname, "..", 'public')
    res.send(result)
})

const port = 3001;

// setup multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const readNotifications = async (type) => {
    const sqlQuery = "UPDATE notifications SET count = 0, is_read = 1  WHERE id = ?"
    await db.query(sqlQuery, [type], (err, res) => {
        // console.log("Berhasil UPDATE")
    })
}


const verifyToken = (req, res, next) => {
    // // console.log(req.get('Authorization'))
    const bearerHeader = req.get('Authorization');
    if (typeof bearerHeader !== "undefined") {
        try {

            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
            if (!token) {
                tart
                res.status(406).send("Error! token wat not provided")
            }
            const decodedToken = jwt.verify(token, 'marsSuperDuperSecretKey')
            if (!decodedToken) {
                res.status(406).send("Error! token wat not provided")
            }

            req.user = decodedToken.username
            next()
        } catch (err) {
            console.log(err)

            res.status(406).send("Error! your token is invalid")
        }
    } else {
        res.status(406).send("Error! your token is invalid")
    }
}

const createNotification = async (type) => {
    const sqlQuery = "SELECT * FROM notifications where id = ?"

    await db.query(sqlQuery, [type], async (err, result) => {
        if (err) {
            // console.log(err)
            res.send(err)
        }
        // console.log("result");
        // console.log(result);
        const count = result[0].count + 1;
        //update
        const sqlQuery2 = "UPDATE notifications SET count = ?, is_read = 0 WHERE id = ?"
        await db.query(sqlQuery2, [count, type], (err, result2) => {
            if (err) {
                // console.log(err)
                res.send(err)
            } else {
                // console.log("Berhasil Create Notif")
            }

        })

    })
}


const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
})

app.put("/api/notifications", async (req, res) => {
    const { id } = req.body
    readNotifications(id)
    // console.log(id)
    res.send("Marked as Read")
})

app.post("/api/notifications", async (req, res) => {
    const { id } = req.body
    createNotification(id)
    // console.log(id)
    res.send("Notification Created")
})

app.get("/api/notifications", async (req, res) => {
    const type = 2;
    const sqlQuery = "SELECT * FROM notifications where is_read = 0"
    db.query(sqlQuery, [type], async (err, result) => {
        result.forEach((data) => {
            data.message = data.message.replace("%count%", data.count)
        })
        res.send(result)
        
    })
})

//Create Data Kapal Datang
app.post('/api/createDatangKapal', verifyToken, upload.single("dokument"), (req, res) => {

    // // console.log('File uploaded:', req.file);

    // console.log("File path :", req.file.filename)

    const namaAgenKapal = req.body.nama_agen_kapal;
    const perusahaanAgenKapal = req.body.perusahaan_agen_kapal;
    const IMONumber = req.body.imo_number;
    const namaKapal = req.body.nama_kapal;
    const kebangsaanKapal = req.body.kebangsaan_kapal;
    const dataCRUIndonesia = req.body.data_cru_indonesia;
    const dataCRUAsing = req.body.data_cru_asing;
    const pelabuhanAsal = req.body.pelabuhan_asal;
    const pelabuhanTujuan = req.body.pelabuhan_tujuan;
    const serviceLocation = req.body.service_location;
    const jadwalKedatangan = req.body.jadwal_kedatangan;
    const tujuanKedatangan = req.body.tujuan_kedatangan;
    const dokument = req.file.filename;

    const sqlQuery = "INSERT INTO kedatangan (nama_agen_kapal, perusahaan_agen_kapal, imo_number, nama_kapal , kebangsaan_kapal, data_cru_indonesia, data_cru_asing,pelabuhan_asal, pelabuhan_tujuan, service_location, jadwal_kedatangan, tujuan_kedatangan, dokument) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sqlQuery, [namaAgenKapal, perusahaanAgenKapal, IMONumber, namaKapal, kebangsaanKapal, dataCRUIndonesia, dataCRUAsing, pelabuhanAsal, pelabuhanTujuan, serviceLocation, jadwalKedatangan, tujuanKedatangan, dokument], (err, result) => {
        if (err) {
            // console.log("error")
            // console.log(err)
        } else {
            createNotification(1)
            res.send(result);
            // console.log("result")

        }
    })
});


//REad data kapaDatang
app.get('/api/DatangKapal', (req, res) => {
    const sqlQuery = "SELECT * FROM kedatangan";

    db.query(sqlQuery, (err, result) => {
        if (err) {
            // console.log("error")
        } else {
            res.send(result);
            // console.log("result")
        }

    })
});


//REad data kapaDatang
app.get("/api/kapal/:type", async (req, res) => {
    try {
        console.log("masuk sini");
        let offset = 0;
        let limitData = 10;
        const { page, limit } = req.query;

        if (limit > 0) {
            limitData = limit
        }
        if (page > 0) {
            offset = (page) * limitData
        }

        const type = req.params.type;
        let data, length;
        if (type === "berangkat") {
            length = await query("SELECT COUNT(*) as jumlah FROM keberangkatan")
            data = await getDataKapalBerangkatByUser("",offset, limitData);
        } else if (type === "datang") {
            length = await query("SELECT COUNT(*) as jumlah FROM kedatangan")
            data = await getDataKapalDatangByUser("",offset, limitData);
        } else {
            throw new Error("Invalid type")
        }

        const pages = Math.ceil(length[0].jumlah / limitData)
        // console.log("data");
        // console.log(data);
        res.send({ code: 200, status: 'ok', data, pages, current: offset, length: length[0].jumlah, limit: limitData, currentPage: page })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message })
    }
})
/
//Create data kapal Berangkat
//Create Data Kapal Datang
app.post('/api/createBerangkatKapal', verifyToken, upload.single("dokument"), (req, res) => {
    // // console.log('File uploaded:', req.file);

    // console.log("File path :", req.file.filename)
    const namaAgenKapal = req.body.nama_agen_kapal;
    const perusahaanAgenKapal = req.body.perusahaan_agen_kapal;
    const IMONumber = req.body.imo_number;
    const namaKapal = req.body.nama_kapal;
    const kebangsaanKapal = req.body.kebangsaan_kapal;
    const dataCRUIndonesia = req.body.data_cru_indonesia;
    const dataCRUAsing = req.body.data_cru_asing;
    const pelabuhanAsal = req.body.pelabuhan_asal;
    const pelabuhanTujuan = req.body.pelabuhan_tujuan;
    const serviceLocation = req.body.service_location;
    const jadwalKeberangkatan = req.body.jadwal_keberangkatan;
    const tujuanKeberangkatan = req.body.tujuan_keberangkatan;
    const dokument = req.file.filename;



    const sqlQuery = "INSERT INTO keberangkatan (nama_agen_kapal, perusahaan_agen_kapal, imo_number, nama_kapal , kebangsaan_kapal, data_cru_indonesia, data_cru_asing,pelabuhan_asal, pelabuhan_tujuan, service_location, jadwal_keberangkatan, tujuan_keberangkatan, dokument) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sqlQuery, [namaAgenKapal, perusahaanAgenKapal, IMONumber, namaKapal, kebangsaanKapal, dataCRUIndonesia, dataCRUAsing, pelabuhanAsal, pelabuhanTujuan, serviceLocation, jadwalKeberangkatan, tujuanKeberangkatan, dokument], (err, result) => {
        if (err) {
            // console.log("error")
            // console.log(err)
        } else {
            createNotification(2)
            res.send(result);
            // console.log("result")

        }
    })
});

//get data keberangkatan
app.get('/api/BerangkatKapal', (req, res) => {
    const sqlQuery = "SELECT * FROM keberangkatan";

    db.query(sqlQuery, (err, result) => {
        if (err) {
            // console.log("error")
        } else {
            res.send(result);
            // console.log("result")
        }
    })
});

// screate Sign In Crew
app.post('/api/user', upload.single("dokument"), (req, res) => {
    const namaCru = req.body.nama_cru;
    const noPaspor = req.body.no_paspor;
    const kebangsaanCru = req.body.kebangsaan_cru;
    const tglRencanaSignOn = req.body.tg_rencana_sign_on;
    const namaKapal = req.body.nama_kapal;
    const kebangsananKapal = req.body.kebangsaan_kapal;
    const surat = req.body.surat;
    const waktuLapor = req.body.waktu_lapor;
    const namaAgen = req.body.nama_agen;

    const sqlQuery = "INSERT INTO sign_on( nama_cru, no_paspor, kebangsaan_cru, tg_rencana_sign_on, nama_kapal, kebangsaan_kapal, surat, waktu_lapor, nama_agen ) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sqlQuery, [namaCru, noPaspor, kebangsaanCru, tglRencanaSignOn, namaKapal, kebangsananKapal, surat, waktuLapor, namaAgen], (err, result) => {
        if (err) {
            console.log("error")
            console.log(err)
            res.status(500).send("Internal Server Error");
        } else {
            createNotification(3)
            res.send(result);
            // console.log("result")

        }
    })


});

//  get sign in crew
app.get('/api/SignOnCru', (req, res) => {
    const sqlQuery = "SELECT * FROM sign_on";

    db.query(sqlQuery, (err, result) => {
        if (err) {
            // console.log("error")
        } else {
            res.send(result);
            // console.log("result")
        }
    })
});





// create Sign Off Crew
app.post('/api/createSignOffCru', verifyToken, upload.single("dokument"), (req, res) => {
    const namaCru = req.body.nama_cru;
    const noPaspor = req.body.no_paspor;
    const kebangsaanCru = req.body.kebangsaan_cru;
    const tglRencanaSignOff = req.body.tg_rencana_sign_off;
    const namaKapal = req.body.nama_kapal;
    const kebangsananKapal = req.body.kebangsaan_kapal;
    const surat = req.body.surat;
    const waktuLapor = req.body.waktu_lapor;
    const namaAgen = req.body.nama_agen;

    const sqlQuery = "INSERT INTO sign_off (nama_cru, no_paspor, kebangsaan_cru, tg_rencana_sign_off, nama_kapal, kebangsaan_kapal, surat, waktu_lapor, nama_agen ) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    db.query(sqlQuery, [namaCru, noPaspor, kebangsaanCru, tglRencanaSignOff, namaKapal, kebangsananKapal, surat, waktuLapor, namaAgen], (err, result) => {
        if (err) {
            // console.log("error")
            // console.log(err)
        } else {
            createNotification(4)
            res.send(result);
            // console.log("result")

        }
    })
});

//  get sign off crew
app.get('/api/SignOffCru', verifyToken, (req, res) => {
    const sqlQuery = "SELECT * FROM sign_off";

    db.query(sqlQuery, (err, result) => {
        if (err) {
            // console.log("error")
        } else {
            res.send(result);
            // console.log("result")
        }
    })
});

// request register
app.post('/api/createRegister', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const idAgenKapal = req.body.id_agen_kapal;
    const namaPerusahaan = req.body.nama_perusahaan;
    const email = req.body.email;
    const noHpAgen = req.body.no_hp_agen;
    const alamatPerusahaan = req.body.alamat_perusahaan;

    const sqlQuery = "INSERT INTO request_register (username, password, id_agen_kapal, nama_perusahaan, email, no_hp_agen, alamat_perusahaan) VALUE (?, ?, ?, ?, ?, ?, ?)";

    db.query(sqlQuery, [username, password, idAgenKapal, namaPerusahaan, email, noHpAgen, alamatPerusahaan], (err, result) => {
        if (err) {
            res.status(401).send("Internal Server Error");
            // console.log("error")
            // console.log(err)
        } else {
            res.send(result);
            // console.log("result")

        }
    })
});
// get register
app.get('/api/Register', (req, res) => {
    const sqlQuery = "SELECT * FROM request_register";

    db.query(sqlQuery, (err, result) => {
        if (err) {
            res.status(401).send("Internal Server Error");
            // console.log("error")
        } else {

            res.send(result);
            // console.log("result")
        }
    })
});

// login

// login endpoint
app.post('/api/loginMars', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const sqlQuery = "SELECT * FROM request_register WHERE username = ? AND password = ?";

    db.query(sqlQuery, [username, password], (err, result) => {
        if (err) {
            // console.log("error")
            // console.log(err);
            res.status(500).send("Internal Server Error");
        } else {
            if (result.length > 0) {
                let token
                try {
                    token = jwt.sign({
                        username: result[0].username,
                        email: result[0].email,
                    }, 'marsSuperDuperSecretKey', { expiresIn: '10h' })

                    const refreshToken = jwt.sign({
                        username: result[0].username,
                        email: result[0].email,
                    }, 'marsSuperDuperSecretKey', { expiresIn: '1d' })

                    res.cookie('jwt', refreshToken, {
                        httpOnly: true,
                        sameSite: 'none', secure: true,
                        maxAge: 24 * 60 * 60 * 1000
                    })
                    // console.log("res.cookie : ", res)

                } catch (err) {
                    console.log(err)
                    res.status(401).send("Error while creating token");
                }

                // Jika ditemukan, kirim status sukses dan data user
                res.status(200).send({ message: "Login berhasil", user: result[0], token: token });
            } else {
                // Jika tidak ditemukan, kirim pesan bahwa login gagal
                res.status(404).send({ message: "Username atau password salah" });
            }
        }
    });
});
// login endpoint
app.post('/api/loginAdminMars', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === "admin" && password === "admin") {
        let token
        try {
            token = jwt.sign({
                userId: "admin",
                email: "admin@gmail.com",
            }, 'marsSuperDuperSecretKey', { expiresIn: '10h' })

            const refreshToken = jwt.sign({
                username: "admin",
                email: "admin@gmail.com",
            }, 'marsSuperDuperSecretKey', { expiresIn: '1d' })

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                sameSite: 'none', secure: true,
                maxAge: 24 * 60 * 60 * 1000
            })
        } catch (err) {
            console.log(err)
            res.status(401).send("Error while creating token");
        }
        // console.log("berhasil")
        // Jika ditemukan, kirim status sukses dan data user
        res.status(200).send({ message: "Login berhasil", user: "admin", token: token });
    } else {
        // console.log("tidak")
        // Jika tidak ditemukan, kirim pesan bahwa login gagal
        res.status(404).send({ message: "Username atau password salah" });
    }
});


app.get("/api/download/:filename", (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, "..", 'public', 'uploads', filename);

    res.download(filepath, (err) => {
        if (err) {
            // console.log("error download dokument", err)
            res.status(500).send("Error download dokument")
        }
    })
})

const query = util.promisify(db.query).bind(db)

const getDataKapalBerangkatByUser = async (user = "", offset, limit) => {
    let username = "";
    let sqlQuery = "SELECT * FROM keberangkatan WHERE nama_agen_kapal = ? LIMIT ? OFFSET ?"
    if(user !== "" ){
        username = user
    }else{
        sqlQuery = "SELECT * FROM keberangkatan LIMIT ? OFFSET ?"
    }
    try {
        let data;
        if(user !== "" ){
            username = user
            data = await query(sqlQuery, [username, parseInt(limit), parseInt(offset)])
        }else{
            data = await query(sqlQuery, [parseInt(limit), parseInt(offset)])
        }
        return data;
    } catch (err) {
        console.log(err)
        // console.log(err)
        throw new Error("Error dapat data kapal Berangkat: ", err.message)
    }
}
const getDataKapalDatangByUser = async (user, offset, limit) => {
    let username = "";
    console.log("user");
    console.log(user);
    username = "Fajry Ariansyah";
    let sqlQuery = "SELECT * FROM kedatangan WHERE nama_agen_kapal = ? LIMIT ? OFFSET ?"
    if(user !== "" ){
        username = user
    }else{
        sqlQuery = "SELECT * FROM kedatangan LIMIT ? OFFSET ?"
    }
    try {
        let data;
        if(user !== "" ){
            // console.log(data);
            data = await query(sqlQuery, [username, parseInt(limit), parseInt(offset)])
        }else{
            data = await query(sqlQuery, [parseInt(limit), parseInt(offset)])
        }
        return data;
    } catch (err) {
        console.log(err)

        throw new Error("Error dapat data kapal datang : ", err.message)
    }
}

app.put("/api/kapal/:tipe/:id", upload.single("dokument"), (req, res) => {
    console.log("Masuk update kapal")
    const id = req.params.id;
    const tipe = req.params.tipe;
  

    if(req.body.nama_agen_kapal === undefined){
        console.log("tidak ada data");
        return res.status(500).send({ message: "Error update data" })
    }
  
    let sqlQuery = "SELECT * FROM keberangkatan WHERE id = ?";
    if (tipe === "datang") {    
      sqlQuery = "SELECT * FROM kedatangan WHERE id = ?";
    }
  
    db.query(sqlQuery, [id], (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Error get data" });
      }
      let jadwalKedatangan, tujuanKedatangan, jadwalKeberangkatan, tujuanKeberangkatan;
      if (result.length > 0) {
        const namaAgenKapal = req.body.nama_agen_kapal || result[0].nama_agen_kapal;
        const perusahaanAgenKapal = req.body.perusahaan_agen_kapal || result[0].perusahaan_agen_kapal;
        const IMONumber = req.body.imo_number || result[0].imo_number;
        const namaKapal = req.body.nama_kapal || result[0].nama_kapal;
        const kebangsaanKapal = req.body.kebangsaan_kapal || result[0].kebangsaan_kapal;
        const dataCRUIndonesia = req.body.data_cru_indonesia || result[0].data_cru_indonesia;
        const dataCRUAsing = req.body.data_cru_asing || result[0].data_cru_asing;
        const pelabuhanAsal = req.body.pelabuhan_asal || result[0].pelabuhan_asal;
        const pelabuhanTujuan = req.body.pelabuhan_tujuan || result[0].pelabuhan_tujuan ;
        const serviceLocation = req.body.service_location || result[0].service_location;
        const dokument = result[0].dokument;
  
        if (tipe === "datang") {
          jadwalKedatangan = req.body.jadwal_kedatangan || result[0].jadwal_kedatangan;
          tujuanKedatangan = req.body.tujuan_kedatangan || result[0].tujuan_kedatangan;
        }else{
            jadwalKeberangkatan = req.body.jadwal_keberangkatan || result[0].jadwal_keberangkatan;
            tujuanKeberangkatan = req.body.tujuan_keberangkatan || result[0].tujuan_keberangkatan;
        }
  
        const updateQuery = `
          UPDATE ${tipe === "datang" ? "kedatangan" : "keberangkatan"}
          SET nama_agen_kapal = ?, perusahaan_agen_kapal = ?, imo_number = ?, nama_kapal = ?, kebangsaan_kapal = ?, data_cru_indonesia = ?, data_cru_asing = ?, pelabuhan_asal = ?, pelabuhan_tujuan = ?, service_location = ?, jadwal_${tipe === "datang" ? "kedatangan" : "keberangkatan"} = ?, tujuan_${tipe === "datang" ? "kedatangan" : "keberangkatan"} = ?, dokument = ?
          WHERE id = ?`;
  
        const updateData = [namaAgenKapal, perusahaanAgenKapal, IMONumber, namaKapal, kebangsaanKapal, dataCRUIndonesia, dataCRUAsing, pelabuhanAsal, pelabuhanTujuan, serviceLocation, jadwalKedatangan || jadwalKeberangkatan, tujuanKedatangan || tujuanKeberangkatan, dokument, id];
  
        db.query(updateQuery, updateData, (err, result) => {
            console.log("Masuk sini 4");
            if (err) {
                // console.log(err)
                res.status(500).send({ message: "Error update data" })
            } else {
                createNotification(tipe === "datang" ? 7 : 5)

                res.send({ message: "Berhasil update data" })
            }
        })
      }
    })
})


app.get("/api/histories", verifyToken, async (req, res) => {
    try {
        let offset = 0;
        let limitData = 10;
        const { page, limit } = req.query;

        if (limit > 0) {
            limitData = limit
        }
        if (page > 0) {
            offset = (page) * limitData
        }


        const user = req.user
        const DATA_KAPAL_BERANGKAT = await getDataKapalBerangkatByUser(user, offset, limitData);
        const DATA_KAPAL_DATANG = await getDataKapalDatangByUser(user, offset, limitData);

        const DATA_KAPAL_BERANGKAT_LENGTH = DATA_KAPAL_BERANGKAT.length
        const DATA_KAPAL_DATANG_LENGTH = DATA_KAPAL_DATANG.length

        // console.log(DATA_KAPAL_BERANGKAT, DATA_KAPAL_DATANG)
        res.send({ DATA_KAPAL_BERANGKAT, DATA_KAPAL_DATANG })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message })
    }
})

app.get("/api/histories/:type", verifyToken, async (req, res) => {
    try {
        let offset = 0;
        let limitData = 10;
        const { page, limit } = req.query;

        if (limit > 0) {
            limitData = limit
        }
        if (page > 0) {
            offset = (page) * limitData
        }

        const user = req.user
        console.log(user);
        const type = req.params.type;
        let data, length;
        if (type === "berangkat") {
            length = await query("SELECT COUNT(*) as jumlah FROM keberangkatan WHERE nama_agen_kapal = ?", [user])
            data = await getDataKapalBerangkatByUser(user, offset, limitData);
        } else if (type === "datang") {
            length = await query("SELECT COUNT(*) as jumlah FROM kedatangan WHERE nama_agen_kapal = ?", [user])
            data = await getDataKapalDatangByUser(user, offset, limitData);
        } else {
            throw new Error("Invalid type")
        }

        const pages = Math.ceil(length[0].jumlah / limitData)
        console.log("data");
        console.log(data);
        res.send({ code: 200, status: 'ok', data, pages, current: offset, length: length[0].jumlah, limit: limitData, currentPage: page })
    } catch (err) {
        console.log(err)
        res.status(500).send({ message: err.message })
    }
})

app.post("/api/refreshToken", (req, res) => {
    if (req.cookies?.jwt) {
        const refreshToken = req.cookies.jwt;
        jwt.verify(refreshToken, 'marsSuperDuperSecretKey', (err, decoded) => {
            if (err) {
                // console.log("Error")
                // console.log(err.message)
                res.status(406).json({ message: "Invalid Token" });
            } else {
                // console.log("decoded")
                // console.log(decoded)
                const username = decoded.username;
                const email = decoded.email;
                const accessToken = jwt.sign({
                    username: username,
                    email: email,
                }, 'marsSuperDuperSecretKey', { expiresIn: '10h' })
                return res.json({ accessToken })
            }
        })

    } else {
        // console.log("Token not provided")
        return res.status(406).json({ message: 'Token not provided' })
    }
})

app.put("/api/berangkatKapal/:id", verifyToken,(req, res) => {
    const id = req.params.id;
    let sqlQuery = "SELECT * FROM keberangkatan WHERE id = ?"
    db.query(sqlQuery, [id], (err, result) => {
        if (err) {
            // console.log(err)
            res.status(500).send({ message: "Error get data" })
        } else {
            if (result.length > 0) {
                // sqlQuery = "UPDATE keberangkatan SET status = 1 WHERE id = ?"
                db.query(sqlQuery, [id], (err, result) => {
                    if (err) {
                        // console.log(err)
                        res.status(500).send({ message: "Error update data" })
                    } else {
                        res.send({ message: "Berhasil update data" })
                    }
                })
            } else {
                res.status(500).send({ message: "Data tidak ditemukan" })
            }
        }
    })
})

app.delete("/api/berangkatKapal/:id", verifyToken, (req, res) => {
    const id = req.params.id;
    let sqlQuery = "SELECT * FROM keberangkatan WHERE id = ?"
    db.query(sqlQuery, [id], (err, result) => {
        if (err) {
            // console.log(err)
            res.status(500).send({ message: "Error get data" })
        } else {
            if (result.length > 0) {
                sqlQuery = "DELETE FROM keberangkatan WHERE id = ?"
                db.query(sqlQuery, [id], (err, result) => {
                    if (err) {
                        // console.log(err)
                        res.status(500).send({ message: "Error delete data" })
                    } else {
                        
                        res.send({ message: "Berhasil delete data" })
                    }
                })
            } else {
                res.status(500).send({ message: "Data tidak ditemukan" })
            }
        }
    })
})

app.delete("/api/kapal/:tipe/:id", (req, res) => {
    let tipe = req.params.tipe;
    if(tipe === "berangkat"){
        tipe = "keberangkatan"
    }else{
        tipe = "kedatangan"
    }
    // console.log("Menghapus...");
    const id = req.params.id;
    // console.log("menghapus ", id);
    let sqlQuery = `SELECT * FROM ${tipe} WHERE id = ?`
    // console.log("menghapus ", id);
    db.query(sqlQuery, [id], (err, result) => {
        if (err) {
            // console.log(err)
            res.status(500).send({ message: "Error get data" })
        } else {
            if (result.length > 0) {
                sqlQuery = `DELETE FROM ${tipe} WHERE id = ?`
                db.query(sqlQuery, [id], (err, result) => {
                    if (err) {
                        // console.log(err)
                        res.status(500).send({ message: "Error delete data" }   )
                    } else {
                        createNotification(tipe === "datang" ? 6 : 8)
                        res.send({ message: "Berhasil delete data" })
                    }
                })
            } else {
                res.status(500).send({ message: "Data tidak ditemukan" })
            }
        }
    })
})

app.get('/api/kru/:tipe/:id', (req, res) => {
    const id = req.params.id;
    const tipe = req.params.tipe;
    let sqlQuery = "SELECT * FROM sign_on WHERE id = ?"
    if (tipe === "sign_off") {
        sqlQuery = "SELECT * FROM sign_off WHERE id = ?"
    }

    db.query(sqlQuery, [id], (err, result) => {
        if (err) {
            // console.log(err)
            res.status(500).send({ message: "Error get data" })
        } else {
            if (result.length > 0) {
                res.send(result[0])
            } else {
                res.status(500).send({ message: "Data tidak ditemukan" })
            }
        }
    })
})

app.put('/api/kru/:tipe/:id', upload.single('dokument'), (req, res) => {
    const id = req.params.id;
    const tipe = req.params.tipe;
    let table = "sign_on"
    if(tipe === "sign_off"){
        table = "sign_off"
    }
    const namaCru = req.body.nama_cru;
    const noPaspor = req.body.no_paspor;
    const kebangsaanCru = req.body.kebangsaan_cru;
    const tglRencanaSignOn = req.body.tg_rencana_sign_on;
    const tglRencanaSignOff = req.body.tg_rencana_sign_off;
    const namaKapal = req.body.nama_kapal;
    const kebangsananKapal = req.body.kebangsaan_kapal;
    const surat = req.body.surat;
    const waktuLapor = req.body.waktu_lapor;
    const namaAgen = req.body.nama_agen;

    const sqlQuery = `UPDATE ${table} SET nama_cru = ?, no_paspor = ?, kebangsaan_cru = ?, tg_rencana_sign_${tipe === "sign_on" ? "on" : "off"} = ?, nama_kapal = ?, kebangsaan_kapal = ?, surat = ?, waktu_lapor = ?, nama_agen = ? WHERE id = ?`;

    db.query(sqlQuery, [namaCru, noPaspor, kebangsaanCru, (tipe === "sign_on" ? tglRencanaSignOn : tglRencanaSignOff), namaKapal, kebangsananKapal, surat, waktuLapor, namaAgen, id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500).send({ message: "Error update data" })
        } else {
            res.send({ message: "Berhasil update data" })
        }
    })
})

app.delete('/api/kru/:tipe/:id', (req, res) => {
    const id = req.params.id;
    const tipe = req.params.tipe;
    let table = "sign_on"
    if(tipe === "sign_off"){
        table = "sign_off"
    }
    let sqlQuery = `DELETE FROM ${table} WHERE id = ?`
    db.query(sqlQuery, [id], (err, result) => {
        if(err){
            res.status(500).send({ error: err.message });
        }else{
            res.send(result);
        }
    })
})

app.get("/api/kapal/:tipe/:id", (req, res) => {
    const id = req.params.id;
    const tipe = req.params.tipe;
    let sqlQuery = "SELECT * FROM keberangkatan WHERE id = ?"
    if (tipe === "datang") {
        sqlQuery = "SELECT * FROM kedatangan WHERE id = ?"
    }

    db.query(sqlQuery, [id], (err, result) => {
        if (err) {
            // console.log(err)
            res.status(500).send({ message: "Error get data" })
        } else {
            if (result.length > 0) {
                res.send(result[0])
            } else {
                res.status(500).send({ message: "Data tidak ditemukan" })
            }
        }
    })
})
app.get('/api/kru/:tipe',(req,res) =>{
    const {tipe} = req.params
    
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const offset = page*limit;
    let table = "sign_on"
    if(tipe === "sign_off"){
        table = "sign_off"
    }
    
    let sqlQuery = `SELECT COUNT(*) FROM ${table}`;
    let totalPage = 0;
    let length
    try{
    db.query(sqlQuery, (err, result) => {
        if(err){
            res.status(500).send({ error: err.message });
        }else{
            totalPage = Math.ceil(result[0]['COUNT(*)']/limit);
            length = result[0]['COUNT(*)']
        }
    })

    sqlQuery = "SELECT * FROM "+table+" LIMIT ? OFFSET ?";
    db.query(sqlQuery, [limit, offset], (err, result) => {
        if(err){
            res.status(500).send({ error: err.message });
        }else{
            console.log(result)

            const pages = Math.ceil(length / limit)
            res.send({ code: 200, status: 'ok', data : result, pages, current: offset, length, limit, currentPage: page })
        }
    })

    }catch(err){
        res.status(500).send({ error: err.message });
    }
})

app.get("/api/users", (req, res) => {
    const page = parseInt(req.query.page) || 0
    const limit = parseInt(req.query.limit) || 10

    const offset = page * limit
    let sqlQuery = "SELECT COUNT(*) FROM request_register"
    let totalPage = 0;
    let length
    try {
        db.query(sqlQuery, (err, result) => {
            if (err) {
                res.status(500).send({ error: err.message });
            } else {
                totalPage = Math.ceil(result[0]['COUNT(*)'] / limit);
                length = result[0]['COUNT(*)']
            }
        })

    sqlQuery = "SELECT * FROM request_register LIMIT ? OFFSET ?"
    db.query(sqlQuery, [limit, offset], (err, result) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.send({ code: 200, status: 'ok', data : result, pages:totalPage, current: offset, length, limit, currentPage: page })
        }
    })  
    }catch(err){
        res.status(500).send({ error: err.message });
    }

})

app.get('/api/user/:id', (req, res) => {
    const id = req.params.id;
    let sqlQuery = "SELECT * FROM request_register WHERE id = ?"
    db.query(sqlQuery, [id], (err, result) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            console.log(result)
            res.send(result[0])
        }
    })
})

app.put('/api/user/:id', (req, res) => { 
    const id = req.params.id;
    const username = req.body.username;
    const password = req.body.password;
    const idAgenKapal = req.body.id_agen_kapal;
    const namaPerusahaan = req.body.nama_perusahaan;
    const email = req.body.email;
    const noHpAgen = req.body.no_hp_agen;
    const alamatPerusahaan = req.body.alamat_perusahaan;

    const sqlQuery = "UPDATE request_register SET username = ?, password = ?, id_agen_kapal = ?, nama_perusahaan = ?, email = ?, no_hp_agen = ?, alamat_perusahaan = ? WHERE id = ?";

    db.query(sqlQuery, [username, password, idAgenKapal, namaPerusahaan, email, noHpAgen, alamatPerusahaan, id], (err, result) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.send(result);
        }
    })
})

app.delete('/api/user/:id', (req, res) => {
    const id = req.params.id;
    let sqlQuery = "DELETE FROM request_register WHERE id = ?"
    db.query(sqlQuery, [id], (err, result) => {
        if (err) {
            res.status(500).send({ error: err.message });
        } else {
            res.send(result);
        }
    })
})



app.put("/api/kapal/:tipe/:id/status", (req, res)=>{
    console.log("mengupdate status")
    const {status} = req.body;
    console.log("status");
    console.log(status);
    const tipe = req.params.tipe;
    const id = req.params.id;
    let table = "keberangkatan"
    if(tipe === "datang"){
        table = "kedatangan"
    }
    let sqlQuery = `UPDATE ${table} SET status = ? WHERE id = ?`
    db.query(sqlQuery, [status, id], (err, result) => {
        if (err) {
            console.log("err", err.message)
            res.status(500).send({ error: err.message });
        } else {
            console.log("Berhasil update status")
            res.send({message: "Berhasil update status"})
        }
    })
})

app.listen(port, () => {
    console.log("Server berjalan di port " + port)
})

