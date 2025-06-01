import * as yup from 'yup'

export const schema = yup.object().shape({
    full_name: yup
        .string()
        .required('Nome completo é obrigatório')
        .test('is-full-name', 'Digite nome e sobrenome', (value) => {
            if (!value) return false
            const names = value.trim().split(' ')
            return names.length >= 2 && names[1].length > 0
        }),
})
