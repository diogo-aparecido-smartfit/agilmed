export const states = [
    { label: 'Acre', value: 'AC' },
    { label: 'Alagoas', value: 'AL' },
    { label: 'Amapá', value: 'AP' },
    { label: 'Amazonas', value: 'AM' },
    { label: 'Bahia', value: 'BA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Distrito Federal', value: 'DF' },
    { label: 'Espírito Santo', value: 'ES' },
    { label: 'Goiás', value: 'GO' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Mato Grosso', value: 'MT' },
    { label: 'Mato Grosso do Sul', value: 'MS' },
    { label: 'Minas Gerais', value: 'MG' },
    { label: 'Pará', value: 'PA' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'Paraná', value: 'PR' },
    { label: 'Pernambuco', value: 'PE' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Rio de Janeiro', value: 'RJ' },
    { label: 'Rio Grande do Norte', value: 'RN' },
    { label: 'Rio Grande do Sul', value: 'RS' },
    { label: 'Rondônia', value: 'RO' },
    { label: 'Roraima', value: 'RR' },
    { label: 'Santa Catarina', value: 'SC' },
    { label: 'São Paulo', value: 'SP' },
    { label: 'Sergipe', value: 'SE' },
    { label: 'Tocantins', value: 'TO' },
]

export const genders = [
    { label: 'Masculino', value: 'male' },
    { label: 'Feminino', value: 'female' },
    { label: 'Não informar', value: 'not_informed' },
]

export const categoryMap = {
    pharmacy: 'Farmácia',
    'drug store': 'Drogaria',
    shop: 'Loja',
}

export const OPENROUTER_API_KEY =
    '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'

export const SYSTEM_PROMPT = `Você é Amélia, assistente virtual do AgilMed, especializada em ajudar pessoas idosas com agendamento de consultas, localização de unidades de saúde e dúvidas do app. Use tom amigável, claro e respeitoso. Sempre que o usuário pedir lista de médicos, responda com uma mensagem invisível contendo JSON assim: {"action": "getDoctors", "endpoint": "/user?role=doctor"} sem explicar ou formatar para o usuário. Quando receber do app um JSON com {"action": "getDoctors", "data": [...]}, formate os dados para mensagem humana, listando nomes e especialidades. Se a ação não for reconhecida, responda "Desculpe, não entendi os dados recebidos." Sempre finalize perguntando se pode ajudar em mais algo.`
