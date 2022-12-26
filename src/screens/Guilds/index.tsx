import React from "react";
import { View, FlatList } from 'react-native';
import { Guild, GuildProps } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";

import discord from "../../assets/discord.png";


import { styles } from './styles';

type Props = {
    handleGuildSelect: (guild: GuildProps) => void;
}

export function Guilds({handleGuildSelect}: Props) {
    const guilds = [
        {
            id: '1',
            name: 'Lendrios',
            icon: null,
            owner: true,
        },
        {
            id: '2',
            name: 'Lendários',
            icon: null,
            owner: true,
        },
        {
            id: '3',
            name: 'Lendários',
            icon: null,
            owner: true,
        },
        {
            id: '4',
            name: 'Lendários',
            icon: null,
            owner: true,
        },
        {
            id: '5',
            name: 'Lendários',
            icon: null,
            owner: true,
        },
        {
            id: '6',
            name: 'Lendários',
            icon: null,
            owner: true,
        }
    ]

    return (
        <View style={styles.container}>
            <FlatList
                data={guilds}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Guild
                        data={item}
                        onPress={() => handleGuildSelect(item )}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider isCentered />}
                contentContainerStyle={{ paddingBottom: 68, paddingTop: 50 }}
                ListHeaderComponent={() => <ListDivider isCentered/> }
                style={styles.guilds}
            />
        </View>
    )
}