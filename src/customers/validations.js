actionsRules = {
    CREATE: {
        MUST_HAVE_FIELDS: ["companyName", "commercialName", "cpf", "cnpj", "address", "number", "city", "phoneNumber", "mobilePhoneNumber", "email", "active"],
        FIELDS_WITH_PRE_DEFINED_VALUES: {
            active: {
                "values": ["Y", "N"]
            }
        }
    }
}

const validateCreate = async (body) => {
    let missingFields = []
    let fieldsWithWrongValue = []
    actionsRules.CREATE.MUST_HAVE_FIELDS.map(async mandatoryField => {
        
        if (body[mandatoryField] == null) {
            missingFields.push(mandatoryField)
        };
    });

    objectKeys = Object.keys(body);

    objectKeys.map(async existingKey => {
        possibleValues = await actionsRules.CREATE.FIELDS_WITH_PRE_DEFINED_VALUES[existingKey];
        if (possibleValues != null) {
            if (!(body[existingKey] in possibleValues)) {
                fieldsWithWrongValue.push({
                    parameter: existingKey,
                    shouldBe: possibleValues
                });
            }
        }
    });

    return {
        missingFields,
        fieldsWithWrongValue
    }
}

module.exports = {
    validateCreate
}