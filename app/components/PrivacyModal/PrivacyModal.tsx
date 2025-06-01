import React from 'react'
import { LegalModal } from '@/components/LegalModal/LegalModal'
import Text from '@/components/Text/Text'
import { View } from 'react-native'

interface PrivacyModalProps {
    isVisible: boolean
    onClose: () => void
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({
    isVisible,
    onClose,
}) => {
    const privacyContent = (
        <View style={{ gap: 16 }}>
            <Text fontSize="base" fontWeight="700">
                1. Introdução
            </Text>

            <Text color="description" fontSize="sm">
                Esta Política de Privacidade descreve como o AgilMed coleta,
                usa, processa e compartilha seus dados pessoais quando você
                utiliza nosso aplicativo e serviços.
            </Text>

            <Text fontSize="base" fontWeight="700">
                2. Informações Coletadas
            </Text>

            <Text color="description" fontSize="sm">
                Coletamos informações que você nos fornece diretamente, como
                dados de cadastro (nome, e-mail, CPF, data de nascimento),
                histórico médico, agendamentos e outras informações que você
                opte por compartilhar.
            </Text>

            <Text fontSize="base" fontWeight="700">
                3. Uso das Informações
            </Text>

            <Text color="description" fontSize="sm">
                Utilizamos suas informações para: fornecer e melhorar nossos
                serviços, processar agendamentos, enviar notificações
                importantes, personalizar sua experiência e cumprir obrigações
                legais.
            </Text>

            <Text fontSize="base" fontWeight="700">
                4. Compartilhamento de Dados
            </Text>

            <Text color="description" fontSize="sm">
                Podemos compartilhar suas informações com profissionais de saúde
                para viabilizar seus atendimentos, parceiros de serviço que nos
                auxiliam a operar o aplicativo, e quando exigido por lei ou
                processo legal.
            </Text>

            <Text fontSize="base" fontWeight="700">
                5. Segurança de Dados
            </Text>

            <Text color="description" fontSize="sm">
                Implementamos medidas técnicas e organizacionais para proteger
                suas informações contra acesso não autorizado, alteração,
                divulgação ou destruição. Todas as informações de saúde são
                criptografadas e armazenadas com segurança.
            </Text>

            <Text fontSize="base" fontWeight="700">
                6. Seus Direitos
            </Text>

            <Text color="description" fontSize="sm">
                Você tem direito a acessar, corrigir, atualizar e solicitar a
                exclusão de seus dados pessoais. Você também pode optar por não
                receber comunicações promocionais.
            </Text>

            <Text fontSize="base" fontWeight="700">
                7. Retenção de Dados
            </Text>

            <Text color="description" fontSize="sm">
                Mantemos suas informações pelo tempo necessário para fornecer os
                serviços solicitados, cumprir nossas obrigações legais e
                resolver disputas.
            </Text>

            <Text fontSize="base" fontWeight="700">
                8. Alterações na Política de Privacidade
            </Text>

            <Text color="description" fontSize="sm">
                Podemos atualizar esta Política de Privacidade periodicamente.
                Notificaremos você sobre alterações significativas através do
                aplicativo ou por e-mail.
            </Text>

            <Text fontSize="base" fontWeight="700">
                9. Contato
            </Text>

            <Text color="description" fontSize="sm">
                Se você tiver dúvidas ou preocupações sobre esta Política de
                Privacidade ou sobre o tratamento de seus dados, entre em
                contato com nosso Encarregado de Proteção de Dados através do
                e-mail privacidade@agilmed.com.br.
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
            title="Política de Privacidade"
            content={privacyContent}
        />
    )
}
