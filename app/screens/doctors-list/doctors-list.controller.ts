import { useState, useMemo } from 'react'
import { useDoctors } from '@/hooks/useDoctors'
import { router } from 'expo-router'
import { IDoctor } from '@/types/types'

export function useDoctorsListController() {
    const { doctors, isLoading, refetch } = useDoctors()
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
        null
    )

    const specialties = useMemo(() => {
        const uniqueSpecialties = new Set(
            doctors.map((doctor) => doctor.specialty)
        )
        return Array.from(uniqueSpecialties).sort()
    }, [doctors])

    const filteredDoctors = useMemo(() => {
        return doctors.filter((doctor) => {
            const matchesSearch = searchQuery
                ? doctor.user.full_name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                : true
            const matchesSpecialty = selectedSpecialty
                ? doctor.specialty === selectedSpecialty
                : true
            return matchesSearch && matchesSpecialty
        })
    }, [doctors, searchQuery, selectedSpecialty])

    const handleRefresh = () => {
        refetch()
    }

    const handleBackPress = () => {
        router.back()
    }

    return {
        doctors,
        filteredDoctors,
        specialties,
        isLoading,
        searchQuery,
        selectedSpecialty,
        setSearchQuery,
        setSelectedSpecialty,
        handleRefresh,
        handleBackPress,
    }
}
