module.exports = function(object, requiredFields) {
    const missingFields= []

    for(let i = 0; i < requiredFields.length; i++){
      if(!object[requiredFields[i]]){
        missingFields.push(requiredFields[i])
      }
    }

    if (missingFields.length > 0) {
      const pluralMessage = `Os campos [${missingFields.join(', ')}] são obrigatórios.`;
      const singularMessage = `O campo [${missingFields[0]}] é obrigatório`;
      const errorMessage = missingFields.length === 1 ? singularMessage : pluralMessage;

      return [errorMessage, null]
    }
    return [null, object];
}