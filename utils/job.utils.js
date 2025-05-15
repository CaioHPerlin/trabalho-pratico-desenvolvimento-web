
const requiredDtoFields = ['titulo', 'conhecimentos', 'remuneracao', 'beneficios', 'status'];

const jobUtils = {
  validateCreateJobDto (object) {
    const missingFields = [];
    
    for (let i = 0; i < requiredDtoFields.length; i++) {
      if (object[requiredDtoFields[i]] === undefined || object[requiredDtoFields[i]] === null) {
        missingFields.push(requiredDtoFields[i]);
      }
    }
    
    if (missingFields.length > 0) {
      const pluralMessage = `Os campos [${missingFields.join(', ')}] são obrigatórios.`;
      const singularMessage = `O campo "${missingFields[0]}" é obrigatório.`;
      const errorMessage = missingFields.length === 1 ? singularMessage : pluralMessage;
      
      return [null, errorMessage];
    }
    
    const { titulo, conhecimentos, remuneracao, beneficios, status } = object;
    
    if (typeof titulo !== 'string' || titulo.trim() === '') {
      return [null, 'Título inválido'];
    }
    
    if (!Array.isArray(conhecimentos) || conhecimentos.length === 0) {
      return [null, 'Conhecimentos devem ser um array com pelo menos um item'];
    }
    
    if (typeof remuneracao !== 'number' || remuneracao <= 0) {
      return [null, 'Remuneração deve ser um número positivo'];
    }
    
    if (!Array.isArray(beneficios)) {
      return [null, 'Benefícios devem ser um array'];
    }
    
    if (!['ativo', 'inativo'].includes(status)) {
      return [null, 'Status deve ser "ativo" ou "inativo"'];
    }
    
    return [object, null];
  },
  
  validateIdParams(params) {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return [null, 'ID inválido'];
    }
    
    return [id, null]
  }
}
  
module.exports = jobUtils;