import express from 'express'
import fs from 'fs'
import multer from 'multer'
import * as url from 'url'
import nodemailer from "nodemailer"

const router=express.Router()

let to,subject,body,path,cc,html;

//STORAGE ENGINE FILE UPLOAD.........
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({
  storage: storage
}).single('profile')


//ROUTE START IMAGE SELECT USE KEY=profile...........
router.use('/profile', express.static('upload/images'));

router.post('/send', (req, res) => {

  upload(req,res,function(err){
    if(err){
        console.log(err)
        return res.end("Something went wrong!");
    }else{
        to = req.body.to
        cc= req.body.cc
        html= req.body.html
        subject = req.body.subject
        body = req.body.subject
        path = req.file.path

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USERNAME,  
              pass: process.env.EMAIL_PASSWORD
            
            }
          });
          
          var mailOptions = {
            from: process.env.EMAIL_USERNAME, 
            to:to,cc:cc,subject:subject,text:body,
           
            attachments: [
              {
               path: path
              }
            ],
            html:"<h1>🙋‍♂️ Welcome to Mail Api</h1><p>Successfully Sent the Mail</p>",
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              fs.unlink(path,function(err){

                if(err){
                    return res.end(err)

                }else{
                     return res.status(200).send({message:"successful sent the mail"})
                }
              })
            }
          });
    }
})
})
export default router;

//................................................................................
//                        EXTRA MAIL API  TEMPORARY SENT IMAGE
// ...............................................................................
//   import express from 'express'
//   import * as path from 'path'
//   import * as url from 'url'
//   import nodemailer from "nodemailer"
 
 
//   const __dirname=url.fileURLToPath(new URL('.',import.meta.url))
//  //  app.use(express.static(path.join(__dirname,"routes")));
 
//   const router=express.Router()


// router.post('/send', (req, res) => {

//     const {to,subject,html,cc,text}= req.body
    
//     const transporter= nodemailer.createTransport({
  
//       service:'gmail',
//       auth: {
//         user: 'amandighe0@gmail.com',   
//         pass: 'ryedthquvuawjzxh'
//       }
//   })
  
//   var mailOptions={
  
//     from: 'amandighe0@gmail.com',
//     to:to,
//     cc:cc,
//     subject:subject,
//     text:text,
      
//       attachments: [{          // image send krne ke liye
//           filename: 'banner.jpg',
//          path: './public/banner.jpg',
//     },
 


// ],
//        html:"<h1>🙋‍♂️ Welcome to Mail Api</h1><p>Successfully Sent the Mail</p>",
//   }
  
//   transporter.sendMail(mailOptions,function(err,info){
  
//       if(err)
//       {
//           res.send(err)
//       } 
//       else
//       {
//         res.send(mailOptions)
//       }
//   })
//   })


//   export default router;









