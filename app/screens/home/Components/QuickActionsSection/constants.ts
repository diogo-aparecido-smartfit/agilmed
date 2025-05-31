import {
    Alarm,
    Calendar1,
    Hospital,
    Link2,
    Profile2User,
    Sun,
} from 'iconsax-react-native'

export const QUICK_ACTIONS = [
    {
        id: 'sos',
        text: 'SOS',
        icon: Alarm,
    },
    {
        id: 'appointments',
        text: 'Consultas',
        icon: Calendar1,
    },
    {
        id: 'doctors',
        text: 'Médicos',
        icon: Profile2User,
    },
    {
        id: 'places',
        text: 'Unidades',
        icon: Hospital,
    },
]
