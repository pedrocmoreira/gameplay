import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, FlatList, Alert } from 'react-native';
import { Fontisto } from "@expo/vector-icons";
import { BorderlessButton } from "react-native-gesture-handler";
import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { theme } from "../../global/styles/theme";
import BannerIMG from '../../assets/banner.png';
import { styles } from "./styles";
import { ListHeader } from "../../components/ListHeader";
import { Member, MemberProps } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { useRoute } from "@react-navigation/native";
import { AppoitmentProps } from "../../components/Appointment";
import { api } from "../../services/api";
import { Load } from "../../components/Load";

type Params = {
    guildSelected: AppoitmentProps;
}

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string;
    members: MemberProps[];
    presence_count: number;
}

export function AppointmentDetails() {
    const route = useRoute();
    const {guildSelected} = route.params as Params;

    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    async function fetchGuildInfo() {     
        try {
            const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
            setWidget(response.data);
        } catch (error) {
            Alert.alert('Verifique as configurações do servidor.', 'Será que o widget está habilidato?')
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGuildInfo()
    }, [])

    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    <BorderlessButton>
                        <Fontisto
                            name="share"
                            size={24}
                            color={theme.colors.primary}
                        />
                    </BorderlessButton>
                }
            />
            <ImageBackground
                source={BannerIMG}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>{guildSelected.guild.name}</Text>
                    <Text style={styles.subtitle}>{guildSelected.description}</Text>
                </View>
            </ImageBackground>
            {
               loading ? <Load/> :
                <>
                <ListHeader
                    title="Jogadores"
                    subtitle={`Total ${widget.members ? widget.members.length : 0}`}
                />
                <FlatList
                    data={widget.members}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Member data={item} />
                    )}
                    style={styles.members}
                    ItemSeparatorComponent={() => <ListDivider isCentered/>}
                />
                </>
            }
            <View style={styles.footer}>
                <ButtonIcon title="Entrar na Partida"  onPress={() => {}}/>
            </View>
        </Background>
    );
}