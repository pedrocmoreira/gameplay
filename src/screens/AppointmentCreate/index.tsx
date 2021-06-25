import React from "react";
import {View, Text} from 'react-native';
import { styles } from "./styles";
import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { CategorySelect } from "../../components/CategorySelect";

export function AppointmentCreate() {

    return (
        <Background>
            <Header
                title="Agendar Partida"
            />
            <Text style={styles.label}>
                Categoria
            </Text>
            <CategorySelect />
        </Background>
    );
}