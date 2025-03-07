const path = require("path");

exports.UploadFile = (req, fileKey, dest, max_mb=5, filesAllow=[".png", ".jpg", ".gif", ".jpeg", ".svg"]) =>{
    return new Promise((resolve,reject)=>{
        let myFile = req.files[fileKey];
        if (!myFile) {
            reject({msg:"you need to send file", code:"send file"})
        }
        if (myFile.size <= 1024*1024*max_mb) {
            let extFile = path.extname(myFile.name);
            if (filesAllow.includes(extFile)) {
                dest = dest != "" ? dest : myFile.name;
                myFile.mv("public/"+dest,(err)=>{
                    if (err) {return res.status(401).json({msg:"error",err})}
                    resolve({msg:"file upload"});
                })
            }
            else{
                reject({msg:"file not allowd",code:"ext"})
            }
        }
        else{
            reject({msg:"file too big, max "+max_mb+" mb!",code:"max"})
        }
    })
}