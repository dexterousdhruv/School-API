// Calculate distance between two coordinates
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  
  const R = 6371.0 // Radius of Earth (km) 
  const toRadians = (degrees) => (Number((degrees * (Math.PI / 180)).toFixed(4)))

  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)

  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return Number((R * c).toFixed(2)) // Distance (km)
}


// Sort schools in ascending order of distances 
function sortSchoolsByProximity(user, schools) {
  const schoolsWithDistance = schools.map(school => {
    const distance = getDistanceFromLatLonInKm(user.lat, user.lon, school.latitude, school.longitude)
    return { ...school, distance }
  })

  const sortedSchools = schoolsWithDistance.sort((a, b) => a.distance - b.distance).map(school => {
    const { distance, ...schoolData } = school
    return  schoolData
  })

  return sortedSchools

}

export { getDistanceFromLatLonInKm, sortSchoolsByProximity }
