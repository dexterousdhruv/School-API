import { Router } from "express"
import { errorHandler } from "../utils/error.js"
import { sortSchoolsByProximity } from "../utils/helpers.js"
import School from "../models/school.model.js"
import { Op } from "sequelize"



const router = Router()
const roundToFourDecimals = (num) => Number(num.toFixed('4'))

// ADD A NEW SCHOOL
router.post('/addSchool', async (req, res, next) => {
  const schoolData = req.body
  const { name, address, latitude, longitude } = schoolData
  
  if (!name || !address || !latitude || !longitude ) {
    return next(errorHandler(400, 'All fields are required!'))
  }
 
  const tolerance = 0.0001;
  
  
  try {
    const existingSchool = await School.findOne({
      where: {
        name,
        address,
        latitude: {
          [Op.between]: [roundToFourDecimals(latitude - tolerance), roundToFourDecimals(latitude + tolerance)],
        },
        longitude: {
          [Op.between]: [roundToFourDecimals(longitude - tolerance), roundToFourDecimals(longitude + tolerance)],
        },
      
      },
      attributes: ['name', 'address', 'latitude', 'longitude'],
      raw: true 
    })
   
    if (existingSchool) {
      return next(errorHandler(400, 'School already exists!'));
    }
    

    const newSchool = await School.create( 
      schoolData,
      {
        fields: ['id', 'name', 'address', 'latitude', 'longitude'],        
        raw: true,
      }
    ) 

    const { id, ...restData } = newSchool.dataValues    
    res.status(201).send(restData)   

  } catch (e) {  
    next(e)
  }    
 
})    

// LIST SCHOOLS BY PROXIMITY TO GIVEN COORDINATES
router.get('/listSchools', async (req, res, next) => {
  let { lat, lon } = req.query
 
  if (!lat || !lon)
    return next(errorHandler(400, 'All fields are required!'))

  // String to Number
  lat = roundToFourDecimals(parseFloat(lat) )   
  lon = roundToFourDecimals(parseFloat(lon))

  const userCoordinates = { lat, lon } 

  try { 
    const allSchools = await School.findAll({
      attributes: ['name', 'address', 'latitude', 'longitude'],
      raw: true
    })
     
    const sortedSchoolData = sortSchoolsByProximity(userCoordinates, allSchools)
    res.status(200).send(sortedSchoolData)

     
  } catch (e) {
    next(e)
  } 
    
})
 
export default router