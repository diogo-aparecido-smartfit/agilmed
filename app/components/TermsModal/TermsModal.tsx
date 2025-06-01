import React from 'react'
import { LegalModal } from '@/components/LegalModal/LegalModal'
import Text from '@/components/Text/Text'
import { View } from 'react-native'

interface TermsModalProps {
    isVisible: boolean
    onClose: () => void
}

export const TermsModal: React.FC<TermsModalProps> = ({
    isVisible,
    onClose,
}) => {
    const termsContent = (
        <View style={{ gap: 16 }}>
            <Text fontSize="base" fontWeight="700">
                1. Termos e Condições de Uso
            </Text>

            <Text color="description" fontSize="sm">
                Ao acessar e utilizar o aplicativo AgilMed, você concorda com os
                termos e condições descritos neste documento. Estes termos
                constituem um acordo legal entre você e a AgilMed, referente ao
                uso dos nossos serviços.
            </Text>

            <Text fontSize="base" fontWeight="700">
                2. Uso do Serviço
            </Text>

            <Text color="description" fontSize="sm">
                O AgilMed oferece uma plataforma para agendamento de consultas
                médicas, visualização de unidades de saúde e gerenciamento de
                informações de saúde pessoal. Você concorda em utilizar o
                serviço apenas para finalidades legais e de acordo com estes
                termos.
            </Text>

            <Text fontSize="base" fontWeight="700">
                3. Cadastro e Conta
            </Text>

            <Text color="description" fontSize="sm">
                Para utilizar todos os recursos do AgilMed, é necessário criar
                uma conta. Você é responsável por manter a confidencialidade de
                suas credenciais e por todas as atividades realizadas com sua
                conta.
            </Text>

            <Text fontSize="base" fontWeight="700">
                4. Privacidade
            </Text>

            <Text color="description" fontSize="sm">
                Nossas práticas de privacidade são regidas pela Política de
                Privacidade, que constitui parte integrante destes Termos de
                Uso.
            </Text>

            <Text fontSize="base" fontWeight="700">
                5. Limitação de Responsabilidade
            </Text>

            <Text color="description" fontSize="sm">
                O AgilMed não é um substituto para aconselhamento médico
                profissional. O aplicativo é uma ferramenta para facilitar o
                contato com profissionais de saúde, mas não oferece diagnósticos
                ou tratamentos médicos.
            </Text>

            <Text fontSize="base" fontWeight="700">
                6. Propriedade Intelectual
            </Text>

            <Text color="description" fontSize="sm">
                Todo o conteúdo disponibilizado no AgilMed, incluindo textos,
                gráficos, logos, ícones e imagens, é propriedade da AgilMed ou
                de seus licenciadores e está protegido por leis de propriedade
                intelectual.
            </Text>

            <Text fontSize="base" fontWeight="700">
                7. Modificações dos Termos
            </Text>

            <Text color="description" fontSize="sm">
                Reservamo-nos o direito de modificar estes termos a qualquer
                momento. Modificações entram em vigor imediatamente após a
                publicação no aplicativo. O uso continuado do serviço após tais
                alterações constitui sua aceitação dos novos termos.
            </Text>

            <Text fontSize="base" fontWeight="700">
                8. Disposições Gerais
            </Text>

            <Text color="description" fontSize="sm">
                Estes termos constituem o acordo integral entre você e o AgilMed
                e substituem quaisquer acordos anteriores. Se qualquer
                disposição destes termos for considerada inválida, as demais
                disposições permanecerão em vigor.
            </Text>

            <Text color="description" fontSize="sm" style={{ marginTop: 24 }}>
                Última atualização: 1 de junho de 2025
            </Text>
        </View>
    )

    return (
        <LegalModal
            isVisible={isVisible}
            onClose={onClose}
            title="Termos de Uso"
            content={termsContent}
        />
    )
}
