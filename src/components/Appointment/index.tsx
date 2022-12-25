import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { View, Text } from "react-native";
import { styles } from './styles';
import PlayerSvg from '../../assets/player.svg'
import CalendarSvg from '../../assets/calendar.svg'
import { GuildIcon } from "../GuildIcon";
import { categories } from "../../utils/categories";
import { theme } from "../../global/styles/theme";
import { GuildProps } from "../Guild";

export type AppoitmentProps = {
    id: string;
    guild: GuildProps,
    category: string;
    date: string;
    description: string;
}

type Props = TouchableOpacityProps & {
    data: AppoitmentProps;
}

export function Appointment({ data, ...rest }: Props) {
    const [category] = categories.filter(item => item.id === data.category);
    const { owner } = data.guild;
    const { primary, on } = theme.colors;

    return (
        <TouchableOpacity {...rest} activeOpacity={.7}>
            <View style={styles.container}>
                <GuildIcon />

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {data.guild.name}
                        </Text>
                        <Text style={styles.category}>
                            {category.title}
                        </Text>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.dateInfo}>
                            <CalendarSvg />
                            <Text style={styles.date}>
                                {data.date}
                            </Text>
                        </View>
                        

                        <View style={styles.playersInfo}>
                            <PlayerSvg fill={owner ? primary : on} />

                            <Text style={[
                                styles.player,
                                { color: owner ? primary : on }
                            ]}>
                                {owner ? 'Anfitrião' : 'Visitante'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}