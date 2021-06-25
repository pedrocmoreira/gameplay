import React, { useState } from "react";
import { View, Text, FlatList } from 'react-native';
import { Profile } from "../../components/Profile";
import { CategorySelect } from "../../components/CategorySelect";
import { ButtonAdd } from "../../components/ButtonAdd";
import { ListHeader } from "../../components/ListHeader";
import { Appointment } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { styles } from "./styles";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";


export function Home(){
    const [ category, setCategory ] = useState('');

    const navigation = useNavigation();

    const appointments = [
        {
            id: '1',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true
            },
            category: '1',
            date: '22/06 ás 20:40',
            description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
        },
        {
            id: '2',
            guild: {
                id: '1',
                name: 'Lendários',
                icon: null,
                owner: true
            },
            category: '1',
            date: '22/06 ás 20:40',
            description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
        }
    ]

    function handleAppointmentDetails(){
        navigation.navigate("AppointmentDetails");
    }

    function handleAppointmentCreate(){
        navigation.navigate("AppointmentCreate");
    }

    function handleCategorySelect(categoryId: string){
        //categoryId === category ? setCategory('') : setCategory(categoryId);
        if(categoryId === category){
            setCategory('')
        }else{
            setCategory(categoryId)
        }
    }

    return( 
        <Background>
        <View>
            <View style={styles.header}>
                <Profile/>
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>
            <View>
                <CategorySelect 
                    categorySelected={category}
                    setCategory={handleCategorySelect}
                />
                <View style={styles.content}>
                    <ListHeader
                        title="Partidas agendadas"
                        subtitle="Total 6"
                    />
                    <FlatList 
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => (
                            <Appointment 
                                data={item} 
                                onPress={handleAppointmentDetails}    
                            />
                        )}
                        ItemSeparatorComponent={() => <ListDivider/>}
                        style={styles.matches}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
        </Background>
    );
}