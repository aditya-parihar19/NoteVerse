import multer from "multer"

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "./public/temp");
  },
  filename: function(req, file, cb){
    const date = new  Date
    const formated_date = date.toLocaleDateString('en-GB').replaceAll('/', '')
    const random_string = Math.random().toString(16).slice(2,6)
    cb(null, `${file.originalname}_NoteVerse_${formated_date}_${random_string}`)
  }
})

export const upload = multer({storage})