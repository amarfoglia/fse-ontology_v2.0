const formatDocumentType = (documentType: string) => {
  const formatted = documentType.split("/").slice(-1)[0].replace(/([A-Z])/g, " $1")
  const type = formatted.charAt(0).toUpperCase() + formatted.slice(1)
  switch(type) {
    case "Radiology Report": return "Referto di Radiologia"
    case "Immunization": return "Vaccinazioni"
    case "First Aid Report": return "Verbale di Pronto Soccorso"
    case "Outpatient Specialist Report": return "Referto di Specialistica Ambulatoriale"
    case "Exemption Report": return "Documento di Esenzione"
    case "Hospital Discharge Letter": return "Lettera di Dimissione Ospedaliera"
    case "Prescription": return "Prescrizione"
    case "Laboratory Medicine Report": return "Referto di Medicina di Laboratorio" 
    case "Summary Health Profile": return "Profilo Sanitario Sintetico"
    case "Pharma": return "Prescrizione Farmaceutica"
    case "Specialist": return "Prescrizione Specialistica"
    case "Admission": return "Prescrizione di Ricovero"
    case "Transport Request": return "Prescrizione di Trasporto"
  }
}

export default formatDocumentType