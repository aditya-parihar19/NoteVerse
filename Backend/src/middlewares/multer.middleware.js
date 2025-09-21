import multer from "multer"

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "./public/temp");
  },
  filename: function(req, file, cb){
    const date = new  Date
    const formatted_date = date.toLocaleDateString('en-GB').replaceAll('/', '')
    const random_string = Math.random().toString(16).slice(2,6)
    const ext = file.originalname.split('.').pop();

    cb(null, `NoteVerse_${formatted_date}_${random_string}.${ext}`);
  }
})

export const upload = multer({storage})