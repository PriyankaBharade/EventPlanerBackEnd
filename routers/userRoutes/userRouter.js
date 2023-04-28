const express = require('express')
const userRouter = express.Router()
const db = require('../../dbconnection/SqlConnector')


async function createUsers(fullname, email, password){
    const result = await db.query('INSERT INTO users (fullname, email, password) VALUES (?,?,?);',[fullname, email, password])
    return result
}

async function isUserExist(email){
    const result = await db.query('SELECT * from users where email=?',[email])
    return result
}

async function login(email,password){
    const result = await db.query('SELECT * from users where email=? and password=?',[email,password])
    return result
}

async function getAllUser(req,res){
    const result = await db.query('select * from users')
    if(result && result[0]){
        res.send(result[0])
    }else{
        res.send({message:'Something went wrong!'})
    }
}

async function createLogin(req,res){
        const { email, password } = req.body
        console.log(req.body)
        const result = await login(email, password)
        if(result){
            if(result[0].length>0){
                res.send({data:result[0]})
            }else{
                res.send({message:'Invalid credentails, please check'})
            }
        }else{
            res.send({message:'Something went wrong!'})
        }
    }

    async function createUser(req,res){
        console.log(req.body);
       // const {fullname, email, password} = req.body;
       const result = await isUserExist(req.body.email)
       if(result){
        if(result[0].length > 0){
            res.send({status:false, message:'User Already Exist!'})
        }else{
            const userCreated = await createUsers(req.body.fullname, req.body.email, req.body.password)
            if(userCreated && userCreated[0]){
                res.send({message:'User created Successfully!', user_id:userCreated[0].insertId})
            }else{
                res.send({message:userCreated})
            }
        }
       }else{
        res.send({status:false, message:'Something went wrong!'})
       }
    
    }


userRouter.post('/createUser', createUser)

userRouter.post('/login',createLogin)

userRouter.get('/getAlluser',getAllUser)


module.exports = userRouter