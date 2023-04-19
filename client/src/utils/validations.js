const isFilled = ({ name, value }) => {

    if (value.trim().length !== 0) {

        return {};

    }




    return { [name]: 'is required' };

};




const isLengthInRange = ({ name, value, min = 2, max = 20 }) => {

    if (value !== undefined && value.length >= min && value.length <= max) {

        return {};

    }




    return { [name]: `must be between ${min} and ${max} characters` };

};




const isAlphabet = ({ name, value, whitelistedSpecialCharacters = [] }) => {

    let whitelistedSpecialCharactersStr;

    let whitelistedSpecialCharactersListStr;

    let whitelistedSpecialCharactersLookAheadStr;




    if (whitelistedSpecialCharacters.length !== 0) {

        whitelistedSpecialCharactersStr = whitelistedSpecialCharacters.join('');

        whitelistedSpecialCharactersListStr = whitelistedSpecialCharacters.join(', ');

        whitelistedSpecialCharactersLookAheadStr = '';




        whitelistedSpecialCharacters.forEach(char => {

            whitelistedSpecialCharactersLookAheadStr += `(?!.*${char}${char})`;

        });

    }




    let conditions = [

        {

            regex: new RegExp(`^[a-z\\s${whitelistedSpecialCharactersStr}]+$`, 'i'),

            error: { [name]: 'must contain alphabets and spaces only' }

        },

        {

            regex: new RegExp(`^${whitelistedSpecialCharactersLookAheadStr}.*$`, 'i'),

            error: { [name]: `must not have two consecutive special characters` }

        },

        {

            regex: new RegExp(`^[^${whitelistedSpecialCharactersStr}].*[^${whitelistedSpecialCharactersStr}]$`, 'i'),

            error: { [name]: `must not start or end with special characters` }

        }

    ];




    if (conditions[0].regex.test(value)) {

        if (whitelistedSpecialCharacters.length !== 0) {

            if (conditions[1].regex.test(value)) {

                if (conditions[2].regex.test(value)) {

                    return {};

                } else {

                    return conditions[2].error;

                }

            } else {

                return conditions[1].error;

            }

        } else {

            return {};

        }

    }




    if (whitelistedSpecialCharacters.length !== 0) return { [name]: `must contain alphabets, spaces, ${whitelistedSpecialCharactersListStr} only` };

    return conditions[0].error;

};




const isEmail = ({ name, value }) => {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;




    if (regex.test(value)) {

        return {};

    }




    return { [name]: 'must be in valid e-mail format' };

};




const isPasswordMatch = ({ name, value, name_confirm, value_confirm }) => {

    if (value === value_confirm) {

        return {};

    }




    return { [name]: `must match with ${name_confirm}` };

};




export { isFilled, isLengthInRange, isAlphabet, isEmail, isPasswordMatch };