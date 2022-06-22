const timestampToDate = (timestamp: number) => {
  const d = new Date(timestamp);
  return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
}

function type(obj) {
  return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/,"$1").toLowerCase()
}

const formatDate = (date: string) => {
  const d = date == null ? new Date() : new Date(date)
  return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
}

const formatDateAndTime = (date: string) => {
  const d = date == null ? new Date() : new Date(date)
  return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear() + ' - ' + d.getHours() + ':' +d.getMinutes() 
}

const formatIndividual = (individualName: string) => (
  individualName.replace('tag:stardog:api:', '')
)

export { timestampToDate, formatDate, formatIndividual, formatDateAndTime }