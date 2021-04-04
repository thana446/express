var express = require('express')
var router = express.Router()
const User = require('../models/userModel')
const _ = require('lodash')

/* GET users listing. */
router.route('/')
.get(async (req, res, next) => {
  try {
    const users = await User.find({}).sort({create_date: 1})
    res.json(users)
  }catch(err) {
    res.status(500).json({resultDesc: err.message ,resultCode: err.code})
  }
})
.post(async(req ,res ,next) => {
  const {name ,age ,status} = req.body;
  try {
    const user = new User({name ,age ,status})
    await user.save();
    res.json({"resultDesc": "Insert successfully"})
  } catch (err) {
    res.status(500).json({resultDesc: err.message ,resultCode: err.code})
  }
})

router.route('/:id')
.get(async (req, res, next) => {
  const {id: _id} = req.params
  try {
    const user = await User.findOne({_id} ,'-create_date')
    res.json(user)
  }catch(err) {
    res.status(500).json({resultDesc: err.message ,resultCode: err.code})
  }
})
.put(async (req ,res ,next) => {
  const {name ,age ,status} = req.body
  const {id: _id} = req.params
  try {
    await User.findByIdAndUpdate(_id ,{name ,age ,status})
    res.json({"resultDesc": "Update successfully"})
  } catch (err) {
    res.status(500).json({resultDesc: err.message ,resultCode: err.code})
  }
})
.delete(async (req ,res ,next) => {
  const {id: _id} = req.params;
  try {
    await User.findByIdAndRemove(_id)
    res.json({"resultDesc": "Remove successfully"})
  } catch (err) {
    res.status(500).json({resultDesc: err.message ,resultCode: err.code})
  }
})

router.post('/search' ,async (req ,res ,next) => {
  const searchObj = _.omitBy(req.body ,_.isEmpty)
  try {
    const users = await User.find(searchObj ,'-create_date')
    res.json(users)
  }catch(err) {
    res.status(500).json({resultDesc: err.message ,resultCode: err.code})
  }
})

module.exports = router;
