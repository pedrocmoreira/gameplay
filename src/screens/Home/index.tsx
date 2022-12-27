import React, { useCallback, useState } from "react";
import { View, Text, FlatList } from 'react-native';
import { Profile } from "../../components/Profile";
import { CategorySelect } from "../../components/CategorySelect";
import { ButtonAdd } from "../../components/ButtonAdd";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppoitmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { styles } from "./styles";
import { Background } from "../../components/Background";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { Load } from "../../components/Load";


export function Home() {
    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<AppoitmentProps[]>([]);

    const navigation = useNavigation();

    function handleAppointmentDetails(guildSelected: AppoitmentProps) {
        navigation.navigate("AppointmentDetails", {guildSelected});
    }

    function handleAppointmentCreate() {
        navigation.navigate("AppointmentCreate");
    }

    function handleCategorySelect(categoryId: string) {
        //categoryId === category ? setCategory('') : setCategory(categoryId);
        if (categoryId === category) {
            setCategory('')
        } else {
            setCategory(categoryId)
        }
    }

    async function loadAppointments(){
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const storage: AppoitmentProps[] = response ? JSON.parse(response) : [];

        if(category){
            setAppointments(storage.filter(item => item.category === category));
        }else{
            setAppointments(storage)
        }

        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments()
    }, [category]))

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>
            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
            />
            {
                loading ? <Load /> :
                <>
                <View style={styles.content}>
                    <ListHeader
                        title="Partidas agendadas"
                        subtitle={`${appointments.length}`}
                    />
                </View>
                <FlatList
                    data={appointments}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Appointment
                            data={item}
                            onPress={() => handleAppointmentDetails(item)}
                        />
                    )}
                    ItemSeparatorComponent={() => <ListDivider />}
                    contentContainerStyle={{ paddingBottom: 69}}
                    style={styles.matches}
                    showsVerticalScrollIndicator={false}
                />
                </>
            }
        </Background>
    );
}