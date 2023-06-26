const Router = require('koa-router')
const collegeCont = require('../../controllers/collegeCont')
const router = new Router()
router
.get('/campusAll',collegeCont.GetCampus)
.get('/collegeAll/:offset/:count',collegeCont.GetColleges)
.get('/collegeById/:offset/:count/:id',collegeCont.GetCollegeById)
module.exports = router