import multer from "multer"
import path from "path"
import fs from "fs"

const tempPath = path.join(process.cwd(), "public", "temp");

// Ensure the folder exists
if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath, { recursive: true });
}

const storage = multer.diskStorage({
    destinationc: function(req , file , cb){
        cb(null, tempPath);
    },
    filename :function(req , file , cb){
        cb(null  ,`${Math.random()}-${file.originalname}`)
    }
})

const upload = multer({storage})