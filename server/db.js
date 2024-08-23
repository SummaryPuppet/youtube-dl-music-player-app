import sqlite3 from 'sqlite3'

const db = new sqlite3.Database("songs.db", (err) => {
    if (err) {
        return console.error(err.message)
    }

    console.log("Connected to SQLite")
})

export const createSongsTable = () => {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS songs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            thumbnail TEXT,
            author TEXT
            )
        `)
    })
}

export const insertSong = (title, thumbnail, author) => {
    return new Promise((resolve, reject) => {
        db.run(
            `INSERT INTO songs (title, thumbnail, author) VALUES (?,?,?)`,
            [title, thumbnail, author],
            (err) => {
                if (err) {
                    reject("Error to insert in table songs")
                }
            }
        )
        resolve()
    })
}

export const selectSongs = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`SELECT * FROM songs`, (err, row) => {
                if (err) {
                    reject(err)
                }

                resolve(row)
            })
        })
    })
}

export const getSong = (id) => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.get("SELECT * FROM songs WHERE id = ?", [id], (err, row) => {
                if (err) {
                    reject(err)
                }

                resolve(row)
            })
        })
    })
}

export const closeDB = () => {
    db.close((err) => {
        if (err) {
            console.error(err.message)
        }

        console.log("DB closed")
    })
}