const express = require('express')
const userRouter = express.Router()
const db = require('../../dbconnection/SqlConnector')


// async function getAllVenues(req,res){
//     const result = await db.query('select * from venues')
//     if(result){
//         if(result[0]){
//             res.send(result[0])
//         }else{
//             res.send({message:'No Data found!'})
//         }
//     }else{
//         res.send({message:'Something went wrong!'})
//     }
// }


async function getAllVenues(req,res){
    const result = await db.query('select * from venues')
    var data
    if(result){
        if(result[0]){
            data = result[0]
            for(let i=0;i<data.length;i++){
                const images = await getImagesById(result[0][i]?.id)
                console.log(images[0]);
                console.log(data);
                if(images){
                    data[i].images = images[0]
                }
            }
            res.send(data)
        }else{
            res.send({message:'No Data found!'})
        }
    }else{
        res.send({message:'Something went wrong!'})
    }
}

async function createVenue(req,res){
    const {venue_name, address, hostname, host_desc, location_review, check_in_exp, about_us, amenities, price} = req.body
    const result = await db.query('INSERT INTO VENUES (venue_name, address, hostname, host_desc, location_review, check_in_exp, about_us, amenities, price) VALUES (?,?,?,?,?,?,?,?,?);',[venue_name, address, hostname, host_desc, location_review, check_in_exp, about_us, amenities, price])
    if(result){
        if(result[0].affectedRows > 0){
        res.send({message:'Venue created successfully!'})
        }else{
        res.send({message:'No Data found!'})
    }
    }else{
        res.send({message:'Something went wrong!'})
    }
}

async function addVenueImage(req,res){
    const {venue_id, url} = req.body
    const result = await db.query('INSERT INTO VENUEIMAGE (url, venue_id) VALUES (?,?);',[url,venue_id])
    if(result){
        if(result[0]){
            res.send({message:'Images added in venue successfully!'})
        }else{
            res.send({message:'Images not added successfully!'})
        }
    }else{
        res.send({message:'Images not added successfully!'})
    }
}

async function getImagesById(id){
    const result = await db.query('select * from VENUEIMAGE where venue_id=?',[id])
    return result
}

async function getVenueById(req,res){
    const result = await db.query('select * from venues where id=?',[req.body.id])
    if(result){
        if(result[0]){
            var data = result[0]
           const images = await getImagesById(req.body.id)
           if(images){
            if(images[0]){
                data[0].images = images[0]
                res.send(data)
            }else{
                res.send(data)
            }
           }
        }else{
            res.send({message:'No Data found!'})
        }
    }else{
        res.send({message:'Something went wrong!'})
    }
}


userRouter.get('/getAllVenues',getAllVenues)

userRouter.post('/createVenue',createVenue)

userRouter.post('/addVenueImage',addVenueImage)

userRouter.post('/getVenueById',getVenueById)


module.exports = userRouter